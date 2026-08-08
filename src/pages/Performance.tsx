import { Card, PageHeader, Avatar, Badge } from "../components/ui";
import { performanceReviews } from "../data/mockData";
import { employees } from "../data/mockData";

const ratingTone: Record<string, "green" | "blue" | "orange" | "red"> = {
  Excellent: "green",
  Good: "blue",
  Average: "orange",
  "Needs Improvement": "red",
};

export default function Performance() {
  return (
    <div>
      <PageHeader title="Performance" subtitle="Q2 2026 review cycle progress" />
      <Card className="p-4 sm:p-5">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-400 text-[12px] uppercase tracking-wide border-b border-gray-100">
                <th className="py-3 pr-4 font-semibold">Employee</th>
                <th className="py-3 pr-4 font-semibold">Department</th>
                <th className="py-3 pr-4 font-semibold">Goals</th>
                <th className="py-3 pr-4 font-semibold">Score</th>
                <th className="py-3 pr-4 font-semibold">Rating</th>
              </tr>
            </thead>
            <tbody>
              {performanceReviews.map((p, i) => {
                const emp = employees[i];
                return (
                  <tr key={p.name} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/60">
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-3">
                        <Avatar name={p.name} color={emp.avatarColor} />
                        <span className="text-[13.5px] font-medium text-gray-800">{p.name}</span>
                      </div>
                    </td>
                    <td className="py-3 pr-4 text-[13.5px] text-gray-600">{p.department}</td>
                    <td className="py-3 pr-4 text-[13.5px] text-gray-600">
                      {p.goalsCompleted}/{p.totalGoals} completed
                    </td>
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-2 w-32">
                        <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-brand-500 rounded-full" style={{ width: `${p.score}%` }} />
                        </div>
                        <span className="text-[12px] text-gray-500 w-8">{p.score}%</span>
                      </div>
                    </td>
                    <td className="py-3 pr-4">
                      <Badge text={p.rating} tone={ratingTone[p.rating]} />
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
