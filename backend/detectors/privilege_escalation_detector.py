def detect_privilege_escalation(events):
    threats = []
    for event in events:
        message = event.get("message", "").lower()
        if "sudo" in message and ("incorrect password attempt" in message or "not in the sudoers file" in message):
            threats.append({
                "threat": "Privilege Escalation",
                "timestamp": event.get("timestamp", "Unknown"),
                "details": "Unauthorized sudo attempt detected."
            })
    return threats