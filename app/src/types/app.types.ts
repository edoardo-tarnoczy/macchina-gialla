import { components } from "./schema";
export type Leaderboard = {
  [username: string]: number;
};

export type GameMessage = components["schemas"]["GameMessage"];
export type Room = components["schemas"]["Room"];

export type RootStackParamList = {
  Home: undefined;
  Game: { roomCode: string; username: string };
};
