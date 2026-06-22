def detect_cron_persistence(events):
    threats = []
    for event in events:
        message = event.get("message", "").lower()
        if "crontab" in message and ("-e" in message or "replace" in message or "begin edit" in message):
            threats.append({
                "threat": "Persistence via Cron Job",
                "timestamp": event.get("timestamp", "Unknown"),
                "details": "Suspicious cron job modification."
            })
    return threats