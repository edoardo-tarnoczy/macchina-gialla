from contextlib import asynccontextmanager
from typing import List

from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Depends, HTTPException
from sqlmodel import SQLModel, create_engine, Session, select
from .models import User, Room, Score, GameMessage
from .websocket_manager import manager

# 1. Setup the DB Engine
# The file will be created in the current directory
sqlite_url = "sqlite:///./macchina_gialla.db"
engine = create_engine(sqlite_url, connect_args={"check_same_thread": False})

# 2. Function to create the physical .db file
def create_db_and_tables():
    # This reads models.py and builds the tables in the file
    SQLModel.metadata.create_all(engine)

@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    print("✅ Database tables created successfully!")
    yield

app = FastAPI(lifespan=lifespan)

# 4. Session Dependency
def get_session():
    with Session(engine) as session:
        yield session


@app.get('/')
def root():
    return {"message": "WebSocket Bump Game Server is running."}

@app.get("/rooms", response_model=List[Room])
def list_rooms(session: Session = Depends(get_session)):
    rooms = session.exec(select(Room)).all()
    return rooms

@app.post("/rooms", response_model=Room)
def create_room(session: Session = Depends(get_session)):
    new_room = Room()
    session.add(new_room)
    session.commit()
    session.refresh(new_room)
    return new_room

# --- HTTP ROUTE: Check Scores ---
@app.get("/rooms/{room_code}")
def get_scores(room_code: str, session: Session = Depends(get_session)):
    room = session.exec(select(Room).where(Room.code == room_code)).first()
    if not room:
        raise HTTPException(status_code=404, detail="Room not found")
    scores_dict = {score.user.username: score.points for score in room.scores}
    return {"room_code": room.code, "scores": scores_dict}

@app.get("/_internal/types", response_model=GameMessage)
def export_types_dummy():
    """This route exists solely to put GameMessage into the OpenAPI schema."""
    return {
        "type": "WELCOME",
        "scores": {"Luca": 0},
        "winner": None
    }

@app.websocket("/ws/{room_code}/{username}")
async def websocket_endpoint(websocket: WebSocket, room_code: str, username: str, session: Session = Depends(get_session)):
    room = session.exec(select(Room).where(Room.code == room_code)).first()
    if not room:
        print(f"Denying connection: Room {room_code} does not exist.")
        await websocket.accept()
        await websocket.close(code=1008)
        return
    user = session.exec(select(User).where(User.username == username)).first()
    if not user:
        user = User(username=username)
        session.add(user)
        session.commit()
        session.refresh(user)

    score_entry = session.exec(select(Score).where(Score.user_id == user.id, Score.room_id == room.id)).first()
    if not score_entry:
        score_entry = Score(user_id=user.id, room_id=room.id, points=0)
        session.add(score_entry)
        session.commit()
        session.refresh(score_entry)
    await manager.connect(websocket, room_code)
    print(f"User {username} joined room {room_code}")


    try:
        all_room_scores = session.exec(select(Score).where(Score.room_id == room.id)).all()
        current_leaderboard = {s.user.username: s.points for s in all_room_scores}
        await websocket.send_json({"type": "WELCOME", "scores": current_leaderboard})
        while True:
            # Wait for "BUMP" message from mobile app
            data = await websocket.receive_json()

            if data.get("action") == "bump":
                # Increment score
                score_entry.points += 1
                session.add(score_entry)
                session.commit()
                # Non serve rinfrescare score_entry, SQLModel tiene traccia del cambiamento

                # Recupera la classifica aggiornata per la stanza
                all_room_scores = session.exec(select(Score).where(Score.room_id == room.id)).all()
                updated_leaderboard = {s.user.username: s.points for s in all_room_scores}

                # Broadcast a tutti
                await manager.broadcast_to_room(room_code, {
                    "type": "SCORE_UPDATE",
                    "scores": updated_leaderboard
                })
    except WebSocketDisconnect:
        manager.disconnect(websocket, room_code)
        print(f"User {username} left.")