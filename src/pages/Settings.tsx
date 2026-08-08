import { useState } from "react";
import { Card, PageHeader } from "../components/ui";
import { Save, KeyRound, Bell, UserCog } from "lucide-react";

export default function Settings() {
  const [saved, setSaved] = useState(false);

  return (
    <div>
      <PageHeader title="Settings" subtitle="Manage workspace and system preferences" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card className="p-5">
          <div className="flex items-center gap-2.5 mb-4">
            <UserCog size={18} className="text-brand-600" />
            <h3 className="font-semibold text-gray-800 text-[15px]">Company Profile</h3>
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-[12.5px] text-gray-500 font-medium">Company Name</label>
              <input
                defaultValue="Siegecode"
                className="w-full mt-1 bg-gray-50 border border-gray-100 rounded-xl px-3.5 py-2.5 text-[13.5px] outline-none focus:ring-2 focus:ring-brand-100"
              />
            </div>
            <div>
              <label className="text-[12.5px] text-gray-500 font-medium">Support Email</label>
              <input
                defaultValue="hr@siegecode.com"
                className="w-full mt-1 bg-gray-50 border border-gray-100 rounded-xl px-3.5 py-2.5 text-[13.5px] outline-none focus:ring-2 focus:ring-brand-100"
              />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-2.5 mb-4">
            <KeyRound size={18} className="text-brand-600" />
            <h3 className="font-semibold text-gray-800 text-[15px]">HR Assistant (Groq API)</h3>
          </div>
          <p className="text-[12.5px] text-gray-500 mb-3 leading-relaxed">
            The chatbot reads its key from the <code className="bg-gray-100 px-1.5 py-0.5 rounded text-[12px]">VITE_GROQ_API_KEY</code>{" "}
            environment variable at build time. Add it to your <code className="bg-gray-100 px-1.5 py-0.5 rounded text-[12px]">.env</code> file
            and redeploy — for security, keys can't be set from this screen.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-xl px-3.5 py-2.5 text-[12.5px] font-mono text-gray-500">
            VITE_GROQ_API_KEY=gsk_************************
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-2.5 mb-4">
            <Bell size={18} className="text-brand-600" />
            <h3 className="font-semibold text-gray-800 text-[15px]">Notifications</h3>
          </div>
          <div className="space-y-3">
            {["Leave request alerts", "Payroll run reminders", "New hire onboarding"].map((n) => (
              <label key={n} className="flex items-center justify-between text-[13.5px] text-gray-600">
                {n}
                <input type="checkbox" defaultChecked className="w-4 h-4 accent-brand-600" />
              </label>
            ))}
          </div>
        </Card>
      </div>

      <button
        onClick={() => setSaved(true)}
        className="mt-5 flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-5 py-2.5 rounded-xl text-[13.5px] font-semibold"
      >
        <Save size={16} /> Save Changes
      </button>
      {saved && <span className="ml-3 text-emerald-600 text-[13px]">Settings saved.</span>}
    </div>
  );
}
