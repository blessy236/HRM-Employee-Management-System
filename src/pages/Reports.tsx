import { FileBarChart2, Download } from "lucide-react";
import { Card, PageHeader, Badge } from "../components/ui";
import { reports } from "../data/mockData";

const typeTone: Record<string, "blue" | "green" | "orange" | "gray"> = {
  Attendance: "blue",
  Payroll: "green",
  Headcount: "gray",
  Leave: "orange",
  Performance: "blue",
};

export default function Reports() {
  return (
    <div>
      <PageHeader title="Reports" subtitle="Generated reports and analytics exports" />
      <Card className="p-4 sm:p-5">
        <div className="space-y-1">
          {reports.map((r, i) => (
            <div key={i} className="flex items-center gap-4 py-4 border-b border-gray-50 last:border-0">
              <div className="w-11 h-11 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center flex-shrink-0">
                <FileBarChart2 size={19} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-semibold text-gray-800">{r.name}</p>
                <p className="text-[12.5px] text-gray-400 mt-0.5">
                  {r.period} · Generated {r.generated}
                </p>
              </div>
              <Badge text={r.type} tone={typeTone[r.type] || "gray"} />
              <button className="text-gray-400 hover:text-brand-600">
                <Download size={17} />
              </button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
