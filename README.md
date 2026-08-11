# 🛡️ Protecto AI - AI-Powered SOC Analyst

An AI-powered Security Operations Center (SOC) platform that automatically analyzes Linux authentication logs, detects security threats, maps attacks to the MITRE ATT&CK framework, generates attack timelines, and produces AI-driven incident investigation reports using a local Large Language Model (Ollama).

---

## 🚀 Overview

Protecto AI automates the initial investigation process performed by SOC analysts.

Instead of manually reviewing authentication logs, analysts can upload log files and receive:

* Threat Detection
* MITRE ATT&CK Mapping
* Attack Timeline
* Severity Assessment
* AI-Generated Investigation Report

The goal is to reduce investigation time while providing structured, explainable security insights.

---

## ✨ Features

### 🔍 Linux Authentication Log Parser

* Parses Linux `auth.log` / authentication logs
* Extracts:

  * Usernames
  * Source IPs
  * Login Events
  * Timestamps

---

### 🚨 Brute Force Detection

Detects:

* Multiple failed login attempts
* Suspicious authentication behavior
* Successful login after repeated failures

---

### ⚠ Severity Scoring

Automatically assigns severity levels based on detected activity.

Example:

* Low
* Medium
* High
* Critical

---

### 🎯 MITRE ATT&CK Mapping

Automatically maps detected attacks to MITRE ATT&CK techniques.

Current support includes:

* T1110 – Brute Force
* Additional techniques can easily be added.

---

### 📅 Attack Timeline

Generates an investigation timeline showing:

* Failed Logins
* Successful Logins
* Suspicious Events

in chronological order.

---

### 🤖 AI Investigation

Uses a local LLM (Ollama + Llama 3) to generate professional incident investigation reports.

The AI produces:

* Executive Summary
* Threat Assessment
* MITRE Analysis
* Recommended Actions

---

### 🌐 Modern Dashboard

Responsive React dashboard featuring:

* Threat Overview
* Timeline
* MITRE ATT&CK View
* AI Investigation Panel
* Log Upload Interface

---

## 🏗 System Architecture

```text
                Linux Authentication Log
                           │
                           ▼
                  Log Parsing Engine
                           │
                           ▼
                Threat Detection Engine
                           │
                           ▼
                  Severity Assessment
                           │
                           ▼
                 MITRE ATT&CK Mapping
                           │
                           ▼
                  Timeline Generation
                           │
                           ▼
                 AI Investigation Engine
                     (Ollama + Llama 3)
                           │
                           ▼
                    FastAPI Backend
                           │
                           ▼
                 React Frontend Dashboard
```

---

## 🛠 Tech Stack

### Backend

* Python
* FastAPI
* Ollama
* Llama 3
* Regex
* JSON

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS

### Cybersecurity

* MITRE ATT&CK Framework
* Linux Authentication Logs
* Security Event Analysis

---

## 📸 Screenshots

Add screenshots here:

### Dashboard

*(Insert Screenshot)*

---

### Threat Detection

*(Insert Screenshot)*

---

### MITRE ATT&CK

*(Insert Screenshot)*

---

### AI Investigation

*(Insert Screenshot)*

---

## Incident Report

*(Insert Screenshot)*
*(Insert Screenshot)*
*(Insert Screenshot)*
*(Insert Screenshot)*





---

## ⚙ Installation

### Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
```

```bash
cd YOUR_REPOSITORY
```

---

### Backend

Create a virtual environment.

```bash
python -m venv .venv
```

Activate it.

Windows

```bash
.venv\Scripts\Activate.ps1
```

Install dependencies.

```bash
pip install -r requirements.txt
```

Start FastAPI.

```bash
uvicorn backend.api.main:app --reload
```

---

### Frontend

```bash
cd frontend
```

```bash
npm install
```

```bash
npm run dev
```

---

### Ollama

Install Ollama.

Download Llama 3.

```bash
ollama pull llama3.2
```

Run Ollama locally before starting the backend.

---

## 📂 Project Structure

```text
backend/
│
├── api/
├── detectors/
├── llm/
├── mitre/
├── parsers/
├── reports/
├── scoring/
├── timeline/

frontend/
│
├── components/
├── routes/
├── lib/
├── assets/
```

---

## 🔄 Workflow

1. Upload Linux authentication log.
2. Parse authentication events.
3. Detect brute-force activity.
4. Assign severity.
5. Map attacks to MITRE ATT&CK.
6. Generate attack timeline.
7. Produce AI investigation report.
8. Display results in the React dashboard.

---

## 🔮 Future Improvements

* Windows Event Log Support
* Apache/Nginx Log Analysis
* Password Spraying Detection
* Credential Stuffing Detection
* GeoIP Enrichment
* PDF Incident Report Export
* Multi-file Correlation
* Real-time Log Monitoring
* Threat Intelligence Integration
* Multi-user Authentication

---

## 👨‍💻 Authors

Developed by:

* Rafan Afsar
* Joel Stephen Meesala

---

## 📜 License

This project is intended for educational and research purposes.
