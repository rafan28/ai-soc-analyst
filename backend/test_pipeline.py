from parsers.linux_auth_parser import parse_linux_auth_log
from detectors.bruteforce_detector import detect_bruteforce
from reports.incident_report import generate_report

events = parse_linux_auth_log("sample_logs/linux_auth.log")
threats = detect_bruteforce(events)
report = generate_report(threats)
print(report)