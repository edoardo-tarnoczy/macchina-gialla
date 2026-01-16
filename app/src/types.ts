// The structure of our leaderboard
export type Leaderboard = {
  [username: string]: number;
};

// The messages we expect from the FastAPI backend
export type GameMessage =
  | { type: "WELCOME"; scores: Leaderboard }
  | { type: "SCORE_UPDATE"; scores: Leaderboard }
  | { type: "WINNER_DECLARED"; scores: Leaderboard; winner: string };

// Define the navigation routes
export type RootStackParamList = {
  Home: undefined;
  Game: { roomCode: string; username: string };
};
