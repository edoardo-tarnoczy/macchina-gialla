import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Room } from "../types/app.types";
import { CONFIG } from "../config";
import { Clock } from "lucide-react-native";

const { width } = Dimensions.get("window");
const COLORS = {
  bgDark: "#121212", // Sfondo principale
  cardGray: "#1E1E1E", // Colore dei box di input e della lista
  accentYellow: "#FFD700", // Giallo acceso
  textGray: "#888888", // Testo secondario
  textWhite: "#FFFFFF",
};

export default function HomeScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"create" | "join">("create");

  useEffect(() => {
    const loadData = async () => {
      const savedName = await AsyncStorage.getItem("@username");
      if (savedName) setUsername(savedName);
    };
    loadData();
  }, []);
  const saveName = async (name: string) => {
    setUsername(name);
    await AsyncStorage.setItem("@username", name);
  };
  const handleCreateRoom = async () => {
    if (!username) return alert("Inserisci un nome!");

    setLoading(true);
    try {
      const response = await fetch(`${CONFIG.API_URL}/rooms`, {
        method: "POST",
      });
      const data: Room = await response.json(); // Type safety here!

      // Save this room as the "last visited"
      await AsyncStorage.setItem("@last_room", data.code);

      navigation.navigate("Game", { roomCode: data.code, username });
    } catch (e) {
      alert("Errore connessione server");
    } finally {
      setLoading(false);
    }
  };
  const handleJoinRoom = () => {
    if (!username || !roomCode) return alert("Manca qualcosa!");
    navigation.navigate("Game", {
      roomCode: roomCode.toUpperCase(),
      username,
    });
  };

  function getButtonAction() {
    if (activeTab === "create") {
      return handleCreateRoom;
    } else {
      return handleJoinRoom;
    }
  }

  const historyDummyData = [
    { id: 1, name: "Stanza Famiglia", code: "A7B2X9", date: "23.03.2022" },
    { id: 2, name: "Ufficio Gara", code: "KJ99LP", date: "25.06.2022" },
    { id: 3, name: "Cena Amici", code: "WW12QQ", date: "24.05.2022" },
  ];

  const [tabAnim] = useState(new Animated.Value(0));

  const handleTabChange = (tab: "create" | "join") => {
    setActiveTab(tab);
    Animated.spring(tabAnim, {
      toValue: tab === "create" ? 0 : 1,
      useNativeDriver: false,
      friction: 8,
    }).start();
  };

  // Interpolazione per muovere il background giallo del selettore
  const sliderTranslate = tabAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [4, (width - 40) / 2], // 40 è il padding laterale
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* 1. SEZIONE FISSA: TITOLO E TABS */}
      <View style={styles.fixedHeader}>
        <Text style={styles.mainTitle}>MACCHINA{"\n"}GIALLA</Text>

        <View style={styles.tabContainer}>
          <Animated.View
            style={[styles.sliderBackground, { left: sliderTranslate }]}
          />
          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => handleTabChange("create")}
            activeOpacity={1}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "create" && styles.activeTabText,
              ]}
            >
              CREA
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => handleTabChange("join")}
            activeOpacity={1}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "join" && styles.activeTabText,
              ]}
            >
              ENTRA
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 2. FORM DINAMICO (Username + eventuale Code + Bottone) */}
      <View style={styles.formSection}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>IL TUO NOME</Text>
          <TextInput
            style={styles.inputField}
            value={username}
            onChangeText={setUsername}
            placeholderTextColor={COLORS.textGray}
          />
        </View>

        {activeTab === "join" && (
          <View style={styles.inputGroup}>
            <Text style={styles.label}>CODICE STANZA</Text>
            <TextInput
              style={styles.inputField}
              value={roomCode}
              onChangeText={setRoomCode}
              placeholder="Es: AB12XY"
              placeholderTextColor={COLORS.textGray}
              autoCapitalize="characters"
            />
          </View>
        )}

        <TouchableOpacity
          onPress={getButtonAction()}
          style={styles.mainActionBtn}
        >
          <Text style={styles.mainActionBtnText}>
            {activeTab === "create"
              ? "CREA NUOVA STANZA"
              : "ENTRA NELLA STANZA"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* 3. SEZIONE STORICO (ScrollView) */}
      <View style={styles.historySection}>
        <View style={styles.historyHeader}>
          <Clock color={COLORS.textGray} size={16} />
          <Text style={styles.historyTitle}>RECENTI</Text>
        </View>

        <ScrollView
          style={styles.historyList}
          contentContainerStyle={styles.historyContent}
          showsVerticalScrollIndicator={false}
        >
          {historyDummyData.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.historyItem}
              activeOpacity={0.7}
            >
              <View>
                <Text style={styles.historyName}>{item.name}</Text>
                <Text style={styles.historyCode}>Codice: {item.code}</Text>
              </View>
              <Text style={styles.historyDate}>{item.date}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bgDark },
  fixedHeader: { paddingHorizontal: 20, paddingTop: 20 },
  mainTitle: {
    fontSize: 42,
    fontWeight: "900",
    color: COLORS.accentYellow,
    textAlign: "center",
    lineHeight: 42,
    marginBottom: 30,
  },
  // Tab Slider
  tabContainer: {
    flexDirection: "row",
    backgroundColor: COLORS.cardGray,
    borderRadius: 15,
    height: 50,
    padding: 4,
    position: "relative",
  },
  sliderBackground: {
    position: "absolute",
    top: 4,
    bottom: 4,
    width: "50%",
    backgroundColor: COLORS.accentYellow,
    borderRadius: 12,
  },
  tabItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  tabText: { color: COLORS.textGray, fontWeight: "bold", fontSize: 14 },
  activeTabText: { color: "black" },

  // Sezione Form
  formSection: { paddingHorizontal: 20, marginTop: 30, marginBottom: 20 },
  inputGroup: { marginBottom: 15 },
  label: {
    color: COLORS.textGray,
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 8,
  },
  inputField: {
    backgroundColor: COLORS.cardGray,
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    color: COLORS.textWhite,
  },
  mainActionBtn: {
    backgroundColor: COLORS.accentYellow,
    borderRadius: 12,
    padding: 18,
    alignItems: "center",
    marginTop: 10,
  },
  mainActionBtnText: { color: "black", fontWeight: "900", fontSize: 16 },

  // Sezione Storico (Prende lo spazio rimanente)
  historySection: { flex: 1, paddingHorizontal: 20, marginTop: 10 },
  historyHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  historyTitle: {
    color: COLORS.textGray,
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 8,
  },
  historyList: { flex: 1 },
  historyContent: { paddingBottom: 20 },
  historyItem: {
    backgroundColor: COLORS.cardGray,
    borderRadius: 15,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  historyName: { color: COLORS.textWhite, fontSize: 16, fontWeight: "600" },
  historyCode: { color: COLORS.textGray, fontSize: 12, marginTop: 2 },
  historyDate: { color: COLORS.textGray, fontSize: 11 },
});
