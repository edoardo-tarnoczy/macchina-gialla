import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export type RoomHistoryItem = {
  code: string;
  createdAt: string;
};
export function useGameHistory() {
  const [history, setHistory] = useState<RoomHistoryItem[]>([]);
  const saveRoomToHistory = async (roomCode: string) => {
    try {
      const existingHistory = await AsyncStorage.getItem("@room_history");
      let history: RoomHistoryItem[] = existingHistory
        ? JSON.parse(existingHistory)
        : [];

      // 1. Remove the room if it already exists (to move it to the top)
      history = history.filter((item) => item.code !== roomCode);

      // 2. Add the new room at the beginning
      history.unshift({ code: roomCode, createdAt: new Date().toISOString() });

      // 3. Limit to last 5 rooms
      const limitedHistory = history.slice(0, 5);

      await AsyncStorage.setItem(
        "@room_history",
        JSON.stringify(limitedHistory),
      );
    } catch (e) {
      console.error("Failed to save history", e);
    }
  };

  const loadHistory = async () => {
    try {
      const existingHistory = await AsyncStorage.getItem("@room_history");
      if (existingHistory) {
        setHistory(JSON.parse(existingHistory));
      }
    } catch (e) {
      console.error("Failed to load history", e);
    }
  };
  return { history, saveRoomToHistory, loadHistory };
}
