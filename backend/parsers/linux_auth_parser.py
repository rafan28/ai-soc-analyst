import re

def parse_linux_auth_log(filepath):

    events = []

    with open(filepath) as file:

        for line in file:

            timestamp_match = re.search(
                r"^(\w+\s+\d+\s+\d+:\d+:\d+)",
                line
            )

            if timestamp_match:
                timestamp = timestamp_match.group(1)
            else:
                timestamp = "Unknown"

            result = re.search(
                r"Failed password for (\w+) from ([\d.]+)",
                line
            )

            if result:

                events.append({
                    "timestamp": timestamp,
                    "event": "failed_login",
                    "user": result.group(1),
                    "ip": result.group(2)
                })

            result = re.search(
                r"Accepted password for (\w+) from ([\d.]+)",
                line
            )

            if result:

                events.append({
                    "timestamp": timestamp,
                    "event": "successful_login",
                    "user": result.group(1),
                    "ip": result.group(2)
                })

    return events

import re


def parse_linux_auth_lines(lines):

    events = []

    for line in lines:

        timestamp_match = re.search(
            r"^(\w+\s+\d+\s+\d+:\d+:\d+)",
            line
        )

        if timestamp_match:
            timestamp = timestamp_match.group(1)
        else:
            timestamp = "Unknown"

        result = re.search(
            r"Failed password for (\w+) from ([\d.]+)",
            line
        )

        if result:

            events.append({
                "timestamp": timestamp,
                "event": "failed_login",
                "user": result.group(1),
                "ip": result.group(2)
            })

        result = re.search(
            r"Accepted password for (\w+) from ([\d.]+)",
            line
        )

        if result:

            events.append({
                "timestamp": timestamp,
                "event": "successful_login",
                "user": result.group(1),
                "ip": result.group(2)
            })

    return events