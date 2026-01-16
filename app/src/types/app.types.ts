import { components } from "./schema";
export type Leaderboard = {
  [username: string]: number;
};

// The messages we expect from the FastAPI backend
export type GameMessage = components["schemas"]["GameMessage"];
export type Room = components["schemas"]["Room"];
// Define the navigation routes
export type RootStackParamList = {
  Home: undefined;
  Game: { roomCode: string; username: string };
};
