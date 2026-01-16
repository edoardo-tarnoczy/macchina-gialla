import { useState, useEffect, useRef } from "react";
import { Leaderboard, GameMessage } from "../types";

const BASE_WS_URL = "ws://192.168.1.69:8000/ws";

export const useGameSocket = (roomCode: string, username: string) => {
  const [scores, setScores] = useState<Leaderboard>({});
  const [isConnected, setIsConnected] = useState(false);
  const [winner, setWinner] = useState<string | null>(null); // New state for victory
  const socket = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Reset winner if room/user changes
    setWinner(null);

    socket.current = new WebSocket(`${BASE_WS_URL}/${roomCode}/${username}`);

    socket.current.onopen = () => setIsConnected(true);
    socket.current.onclose = () => setIsConnected(false);

    socket.current.onmessage = (event) => {
      const data: GameMessage = JSON.parse(event.data);

      // Handle updates and winners
      if (data.type === "WELCOME" || data.type === "SCORE_UPDATE") {
        setScores(data.scores);
      } else if (data.type === "WINNER_DECLARED") {
        setScores(data.scores);
        setWinner(data.winner); // Trigger victory state
      }
    };

    return () => socket.current?.close();
  }, [roomCode, username]);

  const bumpScore = () => {
    if (socket.current?.readyState === WebSocket.OPEN && !winner) {
      socket.current.send(JSON.stringify({ action: "bump" }));
    }
  };

  return { scores, bumpScore, isConnected, winner }; // Added winner
};
