import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { useGameSocket } from "../hooks/useGameSocket";
import { Car } from "lucide-react-native";
import ConfettiCannon from "react-native-confetti-cannon";
import * as Haptics from "expo-haptics";

type Props = NativeStackScreenProps<RootStackParamList, "Game">;

export default function GameScreen({ route }: Props) {
  const { roomCode, username } = route.params;
  const { scores, bumpScore, isConnected, winner } = useGameSocket(
    roomCode,
    username,
  );
  // Animation value for the "press" effect
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
    // 1. Physical Feedback
    if (winner) return;
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

    // 2. Server Update
    bumpScore();
  };

  return (
    <View style={styles.container}>
      {/* Status Bar */}
      <View style={styles.header}>
        <Text style={styles.roomText}>ROOM: {roomCode}</Text>
        <View
          style={[
            styles.dot,
            { backgroundColor: isConnected ? "#4CAF50" : "#F44336" },
          ]}
        />
      </View>

      {winner && (
        <View style={styles.winnerOverlay}>
          <ConfettiCannon count={200} origin={{ x: -10, y: 0 }} />
          <Text style={styles.winnerTitle}>
            👑 {winner.toUpperCase()} VINCE!
          </Text>
        </View>
      )}

      <Text style={styles.title}>MACCHINA GIALLA!</Text>

      {/* THE BUTTON */}
      <Animated.View
        style={{ transform: [{ scale: scaleAnim }], opacity: winner ? 0.5 : 1 }}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={onBump}
          disabled={!!winner}
          style={styles.mainButton}
        >
          <Car size={100} color="black" fill="black" />
          <Text style={styles.buttonLabel}>
            {winner ? "GARA FINITA" : "BUMP"}
          </Text>
        </TouchableOpacity>
      </Animated.View>

      {/* LEADERBOARD */}
      <View style={styles.leaderboard}>
        <Text style={styles.leaderboardTitle}>Classifica Live</Text>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {Object.entries(scores)
            .sort(([, a], [, b]) => b - a)
            .map(([name, score]) => (
              <View key={name} style={styles.scoreRow}>
                <Text style={styles.nameText}>
                  {name === username ? "⭐️ Tu" : name}
                </Text>
                <Text style={styles.scoreText}>{score}</Text>
              </View>
            ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    alignItems: "center",
    paddingTop: 60,
  },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  roomText: {
    color: "#666",
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  dot: { width: 10, height: 10, borderRadius: 5 },
  title: {
    fontSize: 32,
    fontWeight: "900",
    color: "#FFD700",
    marginBottom: 50,
  },
  mainButton: {
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: "#FFD700",
    justifyContent: "center",
    alignItems: "center",
    elevation: 15,
    shadowColor: "#FFD700",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
  },
  buttonLabel: {
    color: "black",
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 10,
  },
  leaderboard: {
    flex: 1,
    width: "100%",
    marginTop: 50,
    backgroundColor: "#1e1e1e",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
  },
  leaderboardTitle: {
    color: "#888",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  scrollContent: { paddingBottom: 40 },
  scoreRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  nameText: { color: "white", fontSize: 18 },
  scoreText: { color: "#FFD700", fontSize: 22, fontWeight: "bold" },
  winnerOverlay: {
    position: "absolute",
    top: 150,
    zIndex: 10,
    alignItems: "center",
    width: "100%",
  },
  winnerTitle: {
    fontSize: 28,
    fontWeight: "900",
    color: "#FFD700",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});
