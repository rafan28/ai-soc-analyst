import streamlit as st
import requests

st.set_page_config(page_title="AI SOC Analyst", page_icon="🛡️", layout="wide")
st.title("🛡️ AI SOC Analyst Dashboard")

uploaded_file = st.file_uploader("Upload Linux Auth Log (.log)", type=["log", "txt"])

if st.button("Run AI Analysis", type="primary"):
    if uploaded_file is not None:
        with st.spinner("Analyzing logs and generating Llama 3.2 report..."):
            try:
                files = {"file": (uploaded_file.name, uploaded_file.getvalue(), "text/plain")}
                response = requests.post("http://127.0.0.1:8000/analyze", files=files)
                
                if response.status_code == 200:
                    data = response.json()
                    st.success("Analysis Complete!")
                    
                    col1, col2 = st.columns(2)
                    with col1:
                        st.subheader("🚨 Detected Threats")
                        if data.get("threats"):
                            st.dataframe(data["threats"], use_container_width=True)
                        else:
                            st.info("No threats detected.")
                            
                    with col2:
                        st.subheader("⏱️ Attack Timeline")
                        if data.get("timeline"):
                            for event in data["timeline"]:
                                st.code(f"{event['timestamp']}  |  {event['description']}")
                        else:
                            st.info("No timeline events.")
                            
                    st.divider()
                    st.subheader("🤖 AI Executive Summary")
                    st.markdown(data.get("ai_report", "No report generated."))
                else:
                    st.error(f"Backend error: {response.status_code}")
            except requests.exceptions.ConnectionError:
                st.error("Failed to connect to backend. Is your FastAPI server running?")