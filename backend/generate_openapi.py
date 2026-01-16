import json
from app.main import app

with open("../shared/openapi.json", "w") as f:
    json.dump(app.openapi(), f, indent=2)