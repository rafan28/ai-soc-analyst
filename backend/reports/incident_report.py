def generate_report(threats, timeline):

    report = "=== INCIDENT REPORT ===\n\n"

    if not threats:
        report += "No threats detected.\n"
        return report

    report += "THREATS DETECTED\n"
    report += "=================\n\n"

    for threat in threats:

        report += f"Threat: {threat['threat']}\n"
        report += f"MITRE Technique: {threat['mitre_id']}\n"
        report += f"Severity: {threat['severity']}\n"
        report += f"Source IP: {threat['ip']}\n"
        report += f"Failed Attempts: {threat['failed_attempts']}\n"

        report += "\n------------------------\n\n"

    report += "\nATTACK TIMELINE\n"
    report += "=================\n\n"

    for step in timeline:

        report += (
            f"{step['timestamp']} - "
            f"{step['description']}\n"
        )

    return report