def detect_bruteforce(events):
    failed_counts = {}
    detected_threats = []

    # Count failed logins per IP
    for event in events:
        if event["event"] == "failed_login":
            ip = event["ip"]
            
            if ip not in failed_counts:
                failed_counts[ip] = 1
            else:
                failed_counts[ip] += 1

    # Check which IPs exceeded threshold
    for ip, count in failed_counts.items():
        if count >= 3:
            detected_threats.append({
                "threat": "Brute Force Attack",
                "ip": ip,
                "failed_attempts": count
                # Notice we removed 'severity' here! The scorer will add it later.
            })

    return detected_threats