import type { Threat, TimelineEvent, MitreTechnique } from "./types";

export const mockThreats: Threat[] = [
  {
    id: "t-001",
    name: "Brute Force SSH Login Attempt",
    severity: "critical",
    mitre: "T1110.001",
    sourceIp: "203.0.113.42",
    timestamp: "2025-06-19T08:14:22Z",
    riskScore: 96,
    description: "Over 1,200 failed SSH authentication attempts originating from a single IP within 5 minutes.",
  },
  {
    id: "t-002",
    name: "Privilege Escalation via sudo",
    severity: "high",
    mitre: "T1548.003",
    sourceIp: "10.0.4.18",
    timestamp: "2025-06-19T08:31:10Z",
    riskScore: 84,
    description: "User account 'dev-ops' invoked sudo to spawn an interactive root shell outside change window.",
  },
  {
    id: "t-003",
    name: "Suspicious Cron Job Modification",
    severity: "high",
    mitre: "T1053.003",
    sourceIp: "10.0.4.18",
    timestamp: "2025-06-19T08:42:55Z",
    riskScore: 78,
    description: "Persistence attempt: new crontab entry executes outbound shell script every 2 minutes.",
  },
  {
    id: "t-004",
    name: "Anomalous Outbound Traffic",
    severity: "medium",
    mitre: "T1041",
    sourceIp: "10.0.4.18",
    timestamp: "2025-06-19T08:51:03Z",
    riskScore: 61,
    description: "Large encrypted payload exfiltrated to unrecognized cloud endpoint.",
  },
  {
    id: "t-005",
    name: "Failed MFA Challenge",
    severity: "low",
    mitre: "T1621",
    sourceIp: "198.51.100.7",
    timestamp: "2025-06-19T09:02:44Z",
    riskScore: 28,
    description: "Repeated MFA push rejections from a known user device.",
  },
  {
    id: "t-006",
    name: "New Account Created Outside Policy",
    severity: "medium",
    mitre: "T1136.001",
    sourceIp: "10.0.4.18",
    timestamp: "2025-06-19T09:11:09Z",
    riskScore: 55,
    description: "Local account 'svc_backup' created with UID 0 by non-admin process.",
  },
];

export const mockTimeline: TimelineEvent[] = [
  { timestamp: "2025-06-19T08:14:22Z", description: "1,243 failed SSH login attempts detected", user: "root", ip: "203.0.113.42" },
  { timestamp: "2025-06-19T08:22:01Z", description: "Successful SSH login after burst", user: "dev-ops", ip: "203.0.113.42" },
  { timestamp: "2025-06-19T08:31:10Z", description: "sudo invoked to spawn /bin/bash as root", user: "dev-ops", ip: "10.0.4.18" },
  { timestamp: "2025-06-19T08:42:55Z", description: "Crontab modified — new persistence job", user: "root", ip: "10.0.4.18" },
  { timestamp: "2025-06-19T08:51:03Z", description: "Outbound TLS connection to unknown 198.51.100.83", user: "root", ip: "10.0.4.18" },
  { timestamp: "2025-06-19T09:11:09Z", description: "New account 'svc_backup' created with UID 0", user: "root", ip: "10.0.4.18" },
  { timestamp: "2025-06-19T09:18:42Z", description: "Auth log file truncated", user: "root", ip: "10.0.4.18" },
];

export const mockMitre: MitreTechnique[] = [
  { id: "T1110.001", name: "Brute Force: Password Guessing", tactic: "Credential Access", severity: "critical", description: "Adversaries attempt to gain access to accounts via repeated guessing of credentials.", relatedThreats: ["t-001"] },
  { id: "T1548.003", name: "Sudo and Sudo Caching", tactic: "Privilege Escalation", severity: "high", description: "Abuse of sudo configuration to elevate privileges.", relatedThreats: ["t-002"] },
  { id: "T1053.003", name: "Scheduled Task/Job: Cron", tactic: "Persistence", severity: "high", description: "Use of cron utility to perform task scheduling for initial or recurring execution.", relatedThreats: ["t-003"] },
  { id: "T1041", name: "Exfiltration Over C2 Channel", tactic: "Exfiltration", severity: "medium", description: "Data is stolen over the existing command-and-control channel.", relatedThreats: ["t-004"] },
  { id: "T1621", name: "Multi-Factor Authentication Request Generation", tactic: "Credential Access", severity: "low", description: "Adversaries generate MFA requests to coerce approval.", relatedThreats: ["t-005"] },
  { id: "T1136.001", name: "Create Account: Local Account", tactic: "Persistence", severity: "medium", description: "Local accounts created to maintain access.", relatedThreats: ["t-006"] },
];

export const mockAiReport = `## Executive Summary
A coordinated intrusion targeting host \`prod-web-04\` was observed on 2025-06-19 between 08:14 and 09:18 UTC. The attacker successfully brute-forced SSH access, escalated privileges via sudo, established persistence through cron, and exfiltrated approximately 412 MB of encrypted data before attempting log tampering.

## Threat Assessment
- **Severity:** Critical
- **Confidence:** High (94%)
- **Kill-chain progression:** Initial Access → Privilege Escalation → Persistence → Exfiltration → Defense Evasion
- **Affected assets:** prod-web-04 (10.0.4.18), user account dev-ops
- **Likely actor profile:** Opportunistic but skilled; uses living-off-the-land binaries and standard MITRE techniques.

## MITRE ATT&CK Analysis
The following techniques were correlated:
- **T1110.001** Brute Force: Password Guessing — entry vector
- **T1548.003** Sudo and Sudo Caching — privilege escalation
- **T1053.003** Scheduled Task: Cron — persistence mechanism
- **T1041** Exfiltration Over C2 Channel — data theft
- **T1070.002** Clear Linux Logs — defense evasion (suspected)

## Recommended Actions
1. **Immediate:** Isolate host prod-web-04 from the network and snapshot for forensics.
2. Force password rotation and revoke active sessions for the dev-ops account.
3. Remove the malicious crontab entry and inspect /etc/cron.* for similar persistence.
4. Block egress to 198.51.100.83 at the perimeter and add to threat intel feeds.
5. Enforce MFA on all SSH access and disable password authentication globally.
6. Restore /var/log/auth.log from backup and ship to immutable SIEM storage.`;