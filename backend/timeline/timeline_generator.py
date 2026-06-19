def generate_timeline(events):

    timeline = []

    for event in events:

        if event["event"] == "failed_login":

            timeline.append({
                "timestamp": event["timestamp"],
                "description": "Initial Access Attempt"
            })

        elif event["event"] == "successful_login":

            timeline.append({
                "timestamp": event["timestamp"],
                "description": "Potential Account Compromise"
            })

    return timeline