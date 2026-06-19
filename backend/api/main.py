from fastapi import FastAPI
from fastapi import UploadFile
from fastapi import File

from backend.parsers.linux_auth_parser import parse_linux_auth_lines

from backend.detectors.bruteforce_detector import detect_bruteforce

from backend.scoring.severity_scorer import score_severity

from backend.mitre.mitre_mapper import map_mitre

from backend.timeline.timeline_generator import generate_timeline

from backend.llm.investigator import investigate_incident
from fastapi.middleware.cors import CORSMiddleware
import shutil



app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows any frontend to connect (Lovable preview, localhost, etc.)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():

    return {
        "message": "AI SOC Analyst API Running"
    }


@app.get("/health")
def health():

    return {
        "status": "healthy"
    }


@app.post("/analyze")
async def analyze_log(
    file: UploadFile = File(...)
):

    contents = await file.read()

    text = contents.decode("utf-8")

    lines = text.splitlines()

    events = parse_linux_auth_lines(
        lines
    )

    threats = detect_bruteforce(
        events
    )

    threats = score_severity(
        threats
    )

    threats = map_mitre(
        threats
    )

    timeline = generate_timeline(
        events
    )

    ai_report = investigate_incident(
        threats,
        timeline
    )

    return {
        
        "threats": threats,
        "timeline": timeline,
        "ai_report": ai_report
    }