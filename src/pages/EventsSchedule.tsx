import { Plus, CalendarClock } from "lucide-react";
import { Card, PageHeader, Badge } from "../components/ui";
import { events } from "../data/mockData";

const typeTone: Record<string, "blue" | "green" | "orange" | "gray"> = {
  Meeting: "blue",
  Celebration: "green",
  Payroll: "orange",
  Onboarding: "blue",
  Performance: "gray",
};

export default function EventsSchedule() {
  return (
    <div>
      <PageHeader
        title="Events & Schedule"
        subtitle="Company-wide events, meetings, and important dates"
        action={
          <button className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-4 py-2.5 rounded-xl text-[13.5px] font-semibold">
            <Plus size={16} /> Add Event
          </button>
        }
      />
      <Card className="p-4 sm:p-5">
        <div className="space-y-1">
          {events.map((e, i) => (
            <div
              key={i}
              className="flex items-center gap-4 py-4 border-b border-gray-50 last:border-0"
            >
              <div className="w-14 h-14 rounded-xl bg-brand-50 text-brand-600 flex flex-col items-center justify-center flex-shrink-0">
                <CalendarClock size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14.5px] font-semibold text-gray-800">{e.title}</p>
                <p className="text-[12.5px] text-gray-400 mt-0.5">
                  {e.date} · {e.time}
                </p>
              </div>
              <Badge text={e.type} tone={typeTone[e.type] || "gray"} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
