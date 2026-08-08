import { Plus, Clock } from "lucide-react";
import { Card, PageHeader } from "../components/ui";
import { shifts } from "../data/mockData";

export default function Shift() {
  return (
    <div>
      <PageHeader
        title="Shift Management"
        subtitle="Configure and assign working shifts"
        action={
          <button className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-4 py-2.5 rounded-xl text-[13.5px] font-semibold">
            <Plus size={16} /> Add Shift
          </button>
        }
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {shifts.map((s) => (
          <Card key={s.name} className="p-5">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center text-white"
                style={{ backgroundColor: s.color }}
              >
                <Clock size={20} />
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-[15px]">{s.name}</p>
                <p className="text-[12.5px] text-gray-400">{s.time}</p>
              </div>
            </div>
            <div className="pt-3 border-t border-gray-50 flex items-center justify-between">
              <span className="text-[13px] text-gray-500">{s.employees} employees assigned</span>
              <button className="text-brand-600 text-[13px] font-medium">Manage</button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
