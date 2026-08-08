import { Plus } from "lucide-react";
import { Card, PageHeader, Badge } from "../components/ui";
import { allowanceDeduction } from "../data/mockData";

export default function AllowanceDeduction() {
  return (
    <div>
      <PageHeader
        title="Allowance & Deduction"
        subtitle="Configure salary components applied during payroll"
        action={
          <button className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-4 py-2.5 rounded-xl text-[13.5px] font-semibold">
            <Plus size={16} /> Add Component
          </button>
        }
      />
      <Card className="p-4 sm:p-5">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-400 text-[12px] uppercase tracking-wide border-b border-gray-100">
                <th className="py-3 pr-4 font-semibold">Component</th>
                <th className="py-3 pr-4 font-semibold">Type</th>
                <th className="py-3 pr-4 font-semibold">Amount</th>
                <th className="py-3 pr-4 font-semibold">Applicable To</th>
              </tr>
            </thead>
            <tbody>
              {allowanceDeduction.map((a) => (
                <tr key={a.name} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/60">
                  <td className="py-3 pr-4 text-[13.5px] font-medium text-gray-800">{a.name}</td>
                  <td className="py-3 pr-4">
                    <Badge text={a.type} tone={a.type === "Allowance" ? "green" : "red"} />
                  </td>
                  <td className="py-3 pr-4 text-[13.5px] text-gray-600">{a.amount}</td>
                  <td className="py-3 pr-4 text-[13.5px] text-gray-600">{a.applicable}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
