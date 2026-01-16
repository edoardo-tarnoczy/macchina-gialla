from fastapi import WebSocket
from typing import Dict, List

class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, List[WebSocket]] = {}

    async def connect(self, websocket: WebSocket, room_id: str):
        await websocket.accept()
        if room_id not in self.active_connections:
            self.active_connections[room_id] = []
        self.active_connections[room_id].append(websocket)

    def disconnect(self, websocket: WebSocket, room_id: str):
        if room_id in self.active_connections:
            if websocket in self.active_connections[room_id]:
                self.active_connections[room_id].remove(websocket)

    async def broadcast_to_room(self, room_id: str, message: dict):
        if room_id not in self.active_connections:
            return

        # We create a list of dead connections to remove after the loop
        dead_connections = []

        for connection in self.active_connections[room_id]:
            try:
                await connection.send_json(message)
            except Exception:
                # If sending fails, the connection is dead
                dead_connections.append(connection)

        # Clean up dead ones so they don't cause the error next time
        for dead in dead_connections:
            self.disconnect(dead, room_id)

manager = ConnectionManager()