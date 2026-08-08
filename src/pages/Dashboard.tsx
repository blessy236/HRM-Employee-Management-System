import { Users, UserCheck, CalendarClock, Clock3 } from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Card, StatCard } from "../components/ui";
import { attendanceTrend, departmentDistribution, stats, leaveRequests, events } from "../data/mockData";

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-[26px] font-bold text-gray-900 tracking-tight">Dashboard Overview</h1>
      <p className="text-gray-500 text-[14.5px] mt-1 mb-6">Welcome back! Here's what's happening today.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard
          label="Total Employees"
          value={stats.totalEmployees}
          icon={Users}
          iconBg="#3b6cf0"
          trend="12%"
          trendLabel="vs last month"
        />
        <StatCard
          label="Present Today"
          value={stats.presentToday}
          icon={UserCheck}
          iconBg="#10b981"
          trend="5%"
          trendLabel="vs yesterday"
        />
        <StatCard
          label="On Leave"
          value={stats.onLeave}
          icon={CalendarClock}
          iconBg="#f97316"
          trend="2%"
          trendLabel="vs last week"
          trendUp={false}
        />
        <StatCard
          label="Pending Requests"
          value={stats.pendingRequests}
          icon={Clock3}
          iconBg="#a855f7"
          trend="3%"
          trendLabel="new today"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mt-5">
        <Card className="xl:col-span-2 p-5">
          <h3 className="font-semibold text-gray-800 text-[16px] mb-4">Attendance Trends</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={attendanceTrend}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eef0f4" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#9ca3af" }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#9ca3af" }} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #eef0f4", fontSize: 12.5 }} />
              <Legend wrapperStyle={{ fontSize: 12.5 }} />
              <Line type="monotone" dataKey="Absent" stroke="#ef4444" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="On Leave" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="Present" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-5">
          <h3 className="font-semibold text-gray-800 text-[16px] mb-4">Department Distribution</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={departmentDistribution}
                dataKey="value"
                nameKey="name"
                innerRadius={62}
                outerRadius={92}
                paddingAngle={2}
              >
                {departmentDistribution.map((d, i) => (
                  <Cell key={i} fill={d.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #eef0f4", fontSize: 12.5 }} />
              <Legend
                verticalAlign="bottom"
                iconType="circle"
                formatter={(v) => <span className="text-[12px] text-gray-600">{v}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mt-5">
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800 text-[16px]">Recent Leave Requests</h3>
            <span className="text-brand-600 text-[13px] font-medium cursor-pointer">View all</span>
          </div>
          <div className="space-y-3">
            {leaveRequests.slice(0, 5).map((r) => (
              <div key={r.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div>
                  <p className="text-[13.5px] font-medium text-gray-800">{r.employee}</p>
                  <p className="text-[12px] text-gray-400">
                    {r.type} · {r.from} → {r.to}
                  </p>
                </div>
                <span
                  className={`text-[11.5px] font-semibold px-2.5 py-1 rounded-full ${
                    r.status === "Approved"
                      ? "bg-emerald-50 text-emerald-600"
                      : r.status === "Pending"
                      ? "bg-orange-50 text-orange-500"
                      : "bg-red-50 text-red-500"
                  }`}
                >
                  {r.status}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800 text-[16px]">Upcoming Events</h3>
            <span className="text-brand-600 text-[13px] font-medium cursor-pointer">View calendar</span>
          </div>
          <div className="space-y-3">
            {events.map((e, i) => (
              <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                <div className="w-11 h-11 rounded-xl bg-brand-50 text-brand-600 flex flex-col items-center justify-center flex-shrink-0">
                  <span className="text-[13px] font-bold leading-none">{e.date.split("-")[2]}</span>
                  <span className="text-[9px] uppercase leading-none mt-0.5">Aug</span>
                </div>
                <div className="min-w-0">
                  <p className="text-[13.5px] font-medium text-gray-800 truncate">{e.title}</p>
                  <p className="text-[12px] text-gray-400">{e.time} · {e.type}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
