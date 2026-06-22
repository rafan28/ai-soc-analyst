from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import shutil

# Core custom modules
from backend.parsers.linux_auth_parser import parse_linux_auth_lines
from backend.detectors.bruteforce_detector import detect_bruteforce
from backend.scoring.severity_scorer import score_severity
from backend.mitre.mitre_mapper import map_mitre
from backend.timeline.timeline_generator import generate_timeline
from backend.llm.investigator import investigate_incident

app = FastAPI(title="AI SOC Analyst Engine")

# ✅ CORS Middleware configured to allow Lovable / Vite React frontends
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows local dev (http://localhost:5173) and Lovable previews
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
async def analyze_log(file: UploadFile = File(...)):
    try:
        # 1. Read and decode the uploaded file contents
        contents = await file.read()
        text = contents.decode("utf-8")
        lines = text.splitlines()

        # 2. Run your analytical log pipeline
        events = parse_linux_auth_lines(lines)
        threats = detect_bruteforce(events)
        threats = score_severity(threats)
        threats = map_mitre(threats)  # Now runs your newly upgraded dictionary!
        timeline = generate_timeline(events)

        # 3. Fire the summary prompt to your local Ollama instance
        ai_report = investigate_incident(threats, timeline)

        # 4. Standard clean JSON payload structure for React components
        return {
            "success": True,
            "filename": file.filename,
            "threats": threats,
            "timeline": timeline,
            "ai_report": ai_report
        }

    except Exception as e:
        # Catching failures gracefully so the React console shows the exact error line
        raise HTTPException(status_code=500, detail=f"Log processing engine failed: {str(e)}")