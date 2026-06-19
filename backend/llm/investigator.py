import ollama

from backend.llm.prompts import INVESTIGATION_PROMPT


def investigate_incident(
    threats,
    timeline
):

    incident_data = ""

    incident_data += "THREATS\n\n"

    for threat in threats:

        incident_data += (
            f"Threat: {threat['threat']}\n"
        )

        incident_data += (
            f"Severity: {threat['severity']}\n"
        )

        incident_data += (
            f"MITRE Technique: {threat['mitre_id']}\n"
        )

        incident_data += (
            f"Source IP: {threat['ip']}\n"
        )

        incident_data += (
            f"Failed Attempts: "
            f"{threat['failed_attempts']}\n\n"
        )

    incident_data += "\nTIMELINE\n\n"

    for step in timeline:

        incident_data += (
            f"{step['timestamp']} - "
            f"{step['description']}\n"
        )

    prompt = INVESTIGATION_PROMPT.format(
        incident_data=incident_data
    )

    response = ollama.chat(
        model="llama3.2",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response["message"]["content"]