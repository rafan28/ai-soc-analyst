import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/dashboard/settings")({ component: SettingsPage });

const sections = [
  { title: "API Configuration", desc: "Connect Protecto to your FastAPI backend.", fields: [
    { label: "Base URL", value: "https://api.protecto.local", type: "text" },
    { label: "API Key", value: "sk-prot-•••••••••••••••••", type: "password" },
  ]},
  { title: "Model Selection", desc: "Choose the AI model used for investigation reports.", fields: [
    { label: "Provider", value: "OpenAI", type: "text" },
    { label: "Model", value: "gpt-4o", type: "text" },
  ]},
];

function SettingsPage() {
  const [theme, setTheme] = useState<"dark" | "light" | "system">("dark");
  return (
    <>
      <PageHeader title="Settings" description="Manage your workspace configuration." />
      <div className="mx-auto max-w-3xl space-y-6 p-6">
        {sections.map((s) => (
          <div key={s.title} className="glass-panel rounded-xl p-6">
            <h3 className="text-base font-semibold">{s.title}</h3>
            <p className="text-xs text-muted-foreground">{s.desc}</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {s.fields.map((f) => (
                <div key={f.label}>
                  <label className="text-xs font-medium text-muted-foreground">{f.label}</label>
                  <input type={f.type} defaultValue={f.value}
                    className="mt-1 h-9 w-full rounded-md border border-border bg-card/60 px-3 text-sm focus:border-primary/50 focus:outline-none" />
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="glass-panel rounded-xl p-6">
          <h3 className="text-base font-semibold">Theme</h3>
          <p className="text-xs text-muted-foreground">Pick the appearance for the console.</p>
          <div className="mt-4 flex gap-2">
            {(["dark", "light", "system"] as const).map((t) => (
              <button key={t} onClick={() => setTheme(t)}
                className={`rounded-md border px-4 py-2 text-sm capitalize transition-colors ${theme === t ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:text-foreground"}`}>
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="glass-panel rounded-xl p-6">
          <h3 className="text-base font-semibold">User Preferences</h3>
          <p className="text-xs text-muted-foreground">Notifications and default views.</p>
          <div className="mt-4 space-y-3">
            {["Email me on critical threats", "Send weekly digest", "Auto-open AI report after analysis"].map((p) => (
              <label key={p} className="flex items-center justify-between rounded-md border border-border bg-card/40 px-4 py-3 text-sm">
                <span>{p}</span>
                <input type="checkbox" defaultChecked className="h-4 w-4 accent-[var(--color-primary)]" />
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <Button className="bg-gradient-to-r from-primary to-accent text-primary-foreground">Save changes</Button>
        </div>
      </div>
    </>
  );
}