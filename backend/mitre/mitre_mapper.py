MITRE_MAPPING = {
    "Brute Force Attack": {
        "id": "T1110",
        "name": "Brute Force"
    },
    "Impossible Travel": {
        "id": "T1078",
        "name": "Valid Accounts"
    }
}

def map_mitre(threats):
    for threat in threats:
        attack_type = threat["threat"]
        
        if attack_type in MITRE_MAPPING:
            threat["mitre_id"] = MITRE_MAPPING[attack_type]["id"]
            threat["mitre_name"] = MITRE_MAPPING[attack_type]["name"]
        else:
            threat["mitre_id"] = "Unknown"
            threat["mitre_name"] = "Unknown"
            
    return threats