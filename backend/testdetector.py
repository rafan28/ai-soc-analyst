from parsers.linux_auth_parser import parse_linux_auth_log
from detectors.brute_force_detector import detect_bruteforce

events = parse_linux_auth_log("sample_logs/linux_auth.log")

threats = detect_bruteforce(events)

print(threats)