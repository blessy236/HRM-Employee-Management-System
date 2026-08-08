import { useState } from "react";
import { Plus } from "lucide-react";
import { Card, PageHeader, Badge } from "../components/ui";
import { leaveRequests } from "../data/mockData";

const toneMap: Record<string, "green" | "red" | "orange"> = {
  Approved: "green",
  Rejected: "red",
  Pending: "orange",
};

export default function LeaveTracking() {
  const [filter, setFilter] = useState("All");
  const filtered = leaveRequests.filter((r) => filter === "All" || r.status === filter);

  return (
    <div>
      <PageHeader
        title="Leave Tracking"
        subtitle="Review and manage employee leave requests"
        action={
          <button className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-4 py-2.5 rounded-xl text-[13.5px] font-semibold">
            <Plus size={16} /> New Request
          </button>
        }
      />

      <div className="flex gap-2 mb-5">
        {["All", "Approved", "Pending", "Rejected"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-[13px] font-medium ${
              filter === f ? "bg-brand-600 text-white" : "bg-white border border-gray-100 text-gray-500"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <Card className="p-4 sm:p-5">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-400 text-[12px] uppercase tracking-wide border-b border-gray-100">
                <th className="py-3 pr-4 font-semibold">Employee</th>
                <th className="py-3 pr-4 font-semibold">Leave Type</th>
                <th className="py-3 pr-4 font-semibold">From</th>
                <th className="py-3 pr-4 font-semibold">To</th>
                <th className="py-3 pr-4 font-semibold">Days</th>
                <th className="py-3 pr-4 font-semibold">Status</th>
                <th className="py-3 pr-4 font-semibold"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/60">
                  <td className="py-3 pr-4 text-[13.5px] font-medium text-gray-800">{r.employee}</td>
                  <td className="py-3 pr-4 text-[13.5px] text-gray-600">{r.type}</td>
                  <td className="py-3 pr-4 text-[13.5px] text-gray-600">{r.from}</td>
                  <td className="py-3 pr-4 text-[13.5px] text-gray-600">{r.to}</td>
                  <td className="py-3 pr-4 text-[13.5px] text-gray-600">{r.days}</td>
                  <td className="py-3 pr-4">
                    <Badge text={r.status} tone={toneMap[r.status]} />
                  </td>
                  <td className="py-3 pr-4 text-right">
                    {r.status === "Pending" && (
                      <div className="flex gap-2 justify-end">
                        <button className="text-emerald-600 text-[12.5px] font-medium">Approve</button>
                        <button className="text-red-500 text-[12.5px] font-medium">Reject</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
