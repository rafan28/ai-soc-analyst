INVESTIGATION_PROMPT = """
You are an expert SOC Analyst.

Analyze the security incident below.

Provide:

1. Executive Summary
2. Threat Assessment
3. MITRE ATT&CK Analysis
4. Recommended Actions

Incident Data:

{incident_data}
"""