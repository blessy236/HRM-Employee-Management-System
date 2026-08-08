import { useState } from "react";
import { Download, CheckCircle2, XCircle, Clock } from "lucide-react";
import { Card, PageHeader, Badge, Avatar } from "../components/ui";
import { employees } from "../data/mockData";

function seeded(i: number) {
  const x = Math.sin(i * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

const today = employees.slice(0, 20).map((e, i) => {
  const roll = seeded(i + 5);
  const status = roll > 0.9 ? "Absent" : roll > 0.8 ? "On Leave" : "Present";
  const inTime = status === "Present" ? `0${8 + (i % 2)}:${(10 + i * 3) % 60 < 10 ? "0" : ""}${(10 + i * 3) % 60} AM` : "--";
  const outTime = status === "Present" ? `0${5 + (i % 2)}:${(15 + i * 2) % 60 < 10 ? "0" : ""}${(15 + i * 2) % 60} PM` : "--";
  return { ...e, status, inTime, outTime };
});

const toneMap: Record<string, "green" | "red" | "orange"> = {
  Present: "green",
  Absent: "red",
  "On Leave": "orange",
};

const iconMap: Record<string, any> = {
  Present: CheckCircle2,
  Absent: XCircle,
  "On Leave": Clock,
};

const iconColorMap: Record<string, string> = {
  Present: "text-emerald-500",
  Absent: "text-red-500",
  "On Leave": "text-orange-500",
};

export default function Attendance() {
  const [date] = useState(new Date().toISOString().split("T")[0]);
  const presentCount = today.filter((t) => t.status === "Present").length;
  const absentCount = today.filter((t) => t.status === "Absent").length;
  const leaveCount = today.filter((t) => t.status === "On Leave").length;

  return (
    <div>
      <PageHeader
        title="Attendance"
        subtitle={`Tracking for ${date}`}
        action={
          <button className="flex items-center gap-2 border border-gray-200 text-gray-600 px-4 py-2.5 rounded-xl text-[13.5px] font-semibold hover:bg-gray-50">
            <Download size={16} /> Export
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-5">
        <Card className="p-5 flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-emerald-500 flex items-center justify-center text-white">
            <CheckCircle2 size={20} />
          </div>
          <div>
            <p className="text-[22px] font-bold text-gray-900">{presentCount}</p>
            <p className="text-[13px] text-gray-400">Present</p>
          </div>
        </Card>
        <Card className="p-5 flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-red-500 flex items-center justify-center text-white">
            <XCircle size={20} />
          </div>
          <div>
            <p className="text-[22px] font-bold text-gray-900">{absentCount}</p>
            <p className="text-[13px] text-gray-400">Absent</p>
          </div>
        </Card>
        <Card className="p-5 flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-orange-500 flex items-center justify-center text-white">
            <Clock size={20} />
          </div>
          <div>
            <p className="text-[22px] font-bold text-gray-900">{leaveCount}</p>
            <p className="text-[13px] text-gray-400">On Leave</p>
          </div>
        </Card>
      </div>

      <Card className="p-4 sm:p-5">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-400 text-[12px] uppercase tracking-wide border-b border-gray-100">
                <th className="py-3 pr-4 font-semibold">Employee</th>
                <th className="py-3 pr-4 font-semibold">Department</th>
                <th className="py-3 pr-4 font-semibold">Check In</th>
                <th className="py-3 pr-4 font-semibold">Check Out</th>
                <th className="py-3 pr-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {today.map((t) => {
                const Icon = iconMap[t.status];
                return (
                  <tr key={t.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/60">
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-3">
                        <Avatar name={t.name} color={t.avatarColor} />
                        <span className="text-[13.5px] font-medium text-gray-800">{t.name}</span>
                      </div>
                    </td>
                    <td className="py-3 pr-4 text-[13.5px] text-gray-600">{t.department}</td>
                    <td className="py-3 pr-4 text-[13.5px] text-gray-600">{t.inTime}</td>
                    <td className="py-3 pr-4 text-[13.5px] text-gray-600">{t.outTime}</td>
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-1.5">
                        <Icon size={14} className={iconColorMap[t.status]} />
                        <Badge text={t.status} tone={toneMap[t.status]} />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
