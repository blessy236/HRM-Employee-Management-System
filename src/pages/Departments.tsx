import { Plus, Building2, Users2, Wallet2 } from "lucide-react";
import { Card, PageHeader } from "../components/ui";
import { departments } from "../data/mockData";

export default function Departments() {
  return (
    <div>
      <PageHeader
        title="Departments"
        subtitle="Overview of all organizational departments"
        action={
          <button className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-4 py-2.5 rounded-xl text-[13.5px] font-semibold">
            <Plus size={16} /> Add Department
          </button>
        }
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {departments.map((d) => (
          <Card key={d.name} className="p-5">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center text-white"
                style={{ backgroundColor: d.color }}
              >
                <Building2 size={20} />
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-[15px]">{d.name}</p>
                <p className="text-[12.5px] text-gray-400">Head: {d.head}</p>
              </div>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-gray-50">
              <div className="flex items-center gap-2 text-gray-500 text-[13px]">
                <Users2 size={15} /> {d.employees} employees
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-[13px]">
                <Wallet2 size={15} /> {d.budget}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
