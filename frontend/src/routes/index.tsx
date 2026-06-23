import { createFileRoute } from "@tanstack/react-router";
import { Landing } from "@/components/landing/Landing";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Protecto SOC Analyst — AI-Powered SOC Platform" },
      {
        name: "description",
        content:
          "Detect, investigate, and respond to threats faster with AI-driven log analysis and MITRE ATT&CK mapping.",
      },
      { property: "og:title", content: "Protecto SOC Analyst" },
      {
        property: "og:description",
        content: "AI-driven SOC platform for security analysts and incident response teams.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return <Landing />;
}
