from datetime import datetime


def detect_impossible_travel(events):

    threats = []

    user_logins = {}

    for event in events:

        if event["event"] != "successful_login":
            continue

        user = event["user"]

        if user not in user_logins:
            user_logins[user] = []

        user_logins[user].append(event)

    for user, logins in user_logins.items():

        logins.sort(
            key=lambda x: datetime.strptime(
                x["timestamp"],
                "%Y-%m-%d %H:%M:%S"
            )
        )

        for i in range(1, len(logins)):

            previous = logins[i - 1]
            current = logins[i]

            previous_time = datetime.strptime(
                previous["timestamp"],
                "%Y-%m-%d %H:%M:%S"
            )

            current_time = datetime.strptime(
                current["timestamp"],
                "%Y-%m-%d %H:%M:%S"
            )

            hours = (
                current_time - previous_time
            ).total_seconds() / 3600

            if (
                previous["country"] != current["country"]
                and hours < 1
            ):

                threats.append({
                    "threat": "Impossible Travel",
                    "user": user,
                    "severity": "Critical",
                    "from_country": previous["country"],
                    "to_country": current["country"]
                })

    return threats