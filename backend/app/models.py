import uuid as uuid_pkg  # We alias it to avoid confusion with the field name
from sqlmodel import SQLModel, Field, Relationship
from typing import List
from datetime import datetime
import random
import string
from typing import Dict, Optional, Literal

def generate_room_code():
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))

# This is a "Data-Only" model. It won't create a table in SQLite.
class GameMessage(SQLModel):
    type: Literal["WELCOME", "SCORE_UPDATE", "WINNER_DECLARED"]
    scores: Dict[str, int]
    winner: Optional[str] = None

class User(SQLModel, table=True):
    # We use uuid_pkg.uuid4 to generate a random 36-character ID
    id: uuid_pkg.UUID = Field(
        default_factory=uuid_pkg.uuid4,
        primary_key=True,
        index=True,
        nullable=False
    )
    username: str = Field(index=True, unique=True)
    scores: List["Score"] = Relationship(back_populates="user")


class Room(SQLModel, table=True):
    id: uuid_pkg.UUID = Field(
        default_factory=uuid_pkg.uuid4,
        primary_key=True,
        index=True,
        nullable=False
    )
    code: str = Field(default_factory=generate_room_code, index=True, unique=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    scores: List["Score"] = Relationship(back_populates="room")


class Score(SQLModel, table=True):
    # Foreign keys must now match the UUID type
    user_id: uuid_pkg.UUID = Field(foreign_key="user.id", primary_key=True)
    room_id: uuid_pkg.UUID = Field(foreign_key="room.id", primary_key=True)
    points: int = Field(default=0)

    user: User = Relationship(back_populates="scores")
    room: Room = Relationship(back_populates="scores")