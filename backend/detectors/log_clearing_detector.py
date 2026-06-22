def detect_log_clearing(events):
    threats = []
    for event in events:
        message = event.get("message", "").lower()
        if "rm " in message and ("/var/log" in message or ".bash_history" in message):
            threats.append({
                "threat": "Log Clearing",
                "timestamp": event.get("timestamp", "Unknown"),
                "details": "Attempt to delete system logs or shell history."
            })
    return threats