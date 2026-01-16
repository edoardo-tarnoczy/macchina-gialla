import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/app.types";
import { useGameSocket } from "../hooks/useGameSocket";
import { Car, ChevronLeft, Crown } from "lucide-react-native";
import ConfettiCannon from "react-native-confetti-cannon";
import * as Haptics from "expo-haptics";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = NativeStackScreenProps<RootStackParamList, "Game">;
const COLORS = {
  bgDark: "#121212",
  cardGray: "#1E1E1E",
  accentYellow: "#FFD700",
  textWhite: "#FFFFFF",
};
const { width } = Dimensions.get("window");
export default function GameScreen({ route, navigation }: Props) {
  const { roomCode, username } = route.params;
  const { scores, bumpScore, isConnected, winner } = useGameSocket(
    roomCode,
    username,
  );
  const scaleAnim = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, { toValue: 0.9, useNativeDriver: true }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const onBump = async () => {
    if (winner) return;
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

    bumpScore();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerNav}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft color={COLORS.textWhite} size={32} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Macchina Gialla</Text>
      </View>

      <View style={styles.roomCodeBadge}>
        <Text style={styles.roomCodeText}>Room Code: {roomCode}</Text>
        <View
          style={[
            styles.dot,
            { backgroundColor: isConnected ? "#4CAF50" : "#F44336" },
          ]}
        />
      </View>

      {winner && (
        <View style={styles.winnerBannerContainer}>
          <View style={styles.winnerBanner}>
            <Crown
              color={COLORS.accentYellow}
              size={32}
              fill={COLORS.accentYellow}
              style={{ marginRight: 10 }}
            />
            <Text style={styles.winnerBannerText}>
              {winner.toUpperCase()} VINCE!
            </Text>
          </View>
        </View>
      )}
      <View style={styles.mainButtonContainer}>
        <Animated.View
          style={{
            transform: [{ scale: scaleAnim }],
            opacity: winner ? 0.5 : 1,
          }}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={onBump}
            disabled={!!winner}
            style={styles.mainButtonSquare}
          >
            <Car
              size={80}
              color="black"
              fill="black"
              style={{ marginBottom: 10 }}
            />
            <Text style={styles.buttonLabel}>BUMP</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>

      <View style={styles.leaderboardContainer}>
        <Text style={styles.leaderboardTitle}>Live Leaderboard</Text>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {Object.entries(scores)
            .sort(([, a], [, b]) => b - a)
            .map(([name, score], index) => (
              <View
                key={name}
                style={[styles.scoreRow, name === winner && styles.winnerRow]}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  {index === 0 && <Text style={{ marginRight: 5 }}>⭐</Text>}
                  <Text
                    style={[
                      styles.nameText,
                      name === winner && {
                        color: COLORS.accentYellow,
                        fontWeight: "bold",
                      },
                    ]}
                  >
                    {name === username ? "Tu" : name}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.scoreText,
                    name === winner && { color: COLORS.accentYellow },
                  ]}
                >
                  {score}
                </Text>
              </View>
            ))}
        </ScrollView>
      </View>
      {winner && (
        <ConfettiCannon
          count={200}
          origin={{ x: width / 2, y: -20 }}
          fadeOut={true}
          fallSpeed={3000}
          explosionSpeed={350}
          colors={["#FFD700", "#FFA500", "#FFFFFF", "#333333"]}
          autoStart={true}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgDark,
    alignItems: "center",
    justifyContent: "center",
  },
  dot: { width: 10, height: 10, borderRadius: 5 },
  headerNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerTitle: { color: COLORS.textWhite, fontSize: 20, fontWeight: "bold" },
  roomCodeBadge: {
    alignSelf: "center",
    marginLeft: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: COLORS.cardGray,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 40,
  },
  roomCodeText: { color: "#CCC", fontWeight: "600" },

  mainButtonContainer: { alignItems: "center", marginBottom: 50, zIndex: 1 },
  mainButtonSquare: {
    width: 200,
    height: 200,
    borderRadius: 35,
    backgroundColor: COLORS.accentYellow,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: COLORS.accentYellow,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 10,
  },
  buttonLabel: { color: "black", fontWeight: "900", fontSize: 24 },

  winnerBannerContainer: {
    position: "absolute",
    top: 180,
    width: "100%",
    alignItems: "center",
    zIndex: 10,
  },
  winnerBanner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    paddingVertical: 15,
    paddingHorizontal: 40,
    transform: [{ rotate: "-5deg" }],
    borderWidth: 3,
    borderColor: COLORS.accentYellow,
    shadowColor: COLORS.accentYellow,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 30,
    elevation: 20,
  },
  winnerBannerText: {
    color: COLORS.textWhite,
    fontSize: 32,
    fontWeight: "900",
    fontStyle: "italic",
  },

  leaderboardContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: COLORS.cardGray,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
  },
  leaderboardTitle: {
    color: COLORS.textWhite,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  scoreRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  winnerRow: { backgroundColor: "#332b00" },
  nameText: { color: COLORS.textWhite, fontSize: 18 },
  scoreText: { color: COLORS.textWhite, fontSize: 22, fontWeight: "bold" },
  scrollContent: {
    paddingBottom: 40,
  },
});
