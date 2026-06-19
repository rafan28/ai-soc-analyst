def score_severity(threats):

    for threat in threats:

        failed_attempts = threat["failed_attempts"]

        if failed_attempts >= 10:
            threat["severity"] = "Critical"

        elif failed_attempts >= 6:
            threat["severity"] = "High"

        elif failed_attempts >= 3:
            threat["severity"] = "Medium"

        else:
            threat["severity"] = "Low"

    return threats