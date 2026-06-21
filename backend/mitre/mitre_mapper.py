# Expanded to cover common authentication, web scan, and system persistence threats
MITRE_MAPPING = {
    "Brute Force Attack": {
        "id": "T1110",
        "name": "Brute Force"
    },
    "Impossible Travel": {
        "id": "T1078",
        "name": "Valid Accounts"
    },
    "Privilege Escalation": {
        "id": "T1548.003",
        "name": "Abuse Elevation Control Mechanism: Sudo"
    },
    "Log Clearing": {
        "id": "T1070.002",
        "name": "Indicator Removal: Clear Linux Logs"
    },
    "Web Application Exploit": {
        "id": "T1190",
        "name": "Exploit Public-Facing Application"
    },
    "Vulnerability Scanning": {
        "id": "T1595.002",
        "name": "Active Scanning: Vulnerability Scanning"
    },
    "Persistence via Cron Job": {
        "id": "T1053.003",
        "name": "Scheduled Task/Job: Cron"
    },
    "SSH Key Manipulation": {
        "id": "T1098.004",
        "name": "Account Manipulation: SSH Authorized Keys"
    }
}

def map_mitre(threats: list) -> list:
    """
    Safely maps detected threats to their corresponding MITRE ATT&CK IDs and Names.
    """
    if not threats:
        return []

    for threat in threats:
        # Use .get() to prevent KeyError if the key 'threat' is missing
        attack_type = threat.get("threat")
        
        # Look up the technique, defaulting to unknown if not found
        mapping = MITRE_MAPPING.get(attack_type, {"id": "Unknown", "name": "Unknown"})
        
        threat["mitre_id"] = mapping["id"]
        threat["mitre_name"] = mapping["name"]
            
    return threats