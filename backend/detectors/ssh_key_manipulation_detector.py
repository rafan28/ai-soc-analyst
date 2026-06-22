def detect_ssh_key_manipulation(events):
    threats = []
    for event in events:
        message = event.get("message", "").lower()
        if "authorized_keys" in message and ("echo" in message or ">>" in message or "chmod" in message):
            threats.append({
                "threat": "SSH Key Manipulation",
                "timestamp": event.get("timestamp", "Unknown"),
                "details": "Modification of SSH authorized_keys file detected."
            })
    return threats