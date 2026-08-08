import { Download } from "lucide-react";
import { Card, PageHeader, Badge, StatCard } from "../components/ui";
import { payroll } from "../data/mockData";
import { Banknote, TrendingUp, Wallet, Clock3 } from "lucide-react";

export default function Payroll() {
  const totalNet = payroll.reduce((s, p) => s + p.net, 0);
  const totalDeduction = payroll.reduce((s, p) => s + p.deduction, 0);
  const pendingCount = payroll.filter((p) => p.status === "Pending").length;

  return (
    <div>
      <PageHeader
        title="Payroll"
        subtitle="July 2026 payroll cycle"
        action={
          <button className="flex items-center gap-2 border border-gray-200 text-gray-600 px-4 py-2.5 rounded-xl text-[13.5px] font-semibold hover:bg-gray-50">
            <Download size={16} /> Export Payslips
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-5">
        <StatCard label="Total Payout" value={`₹${totalNet.toLocaleString("en-IN")}`} icon={Banknote} iconBg="#3b6cf0" />
        <StatCard label="Total Deductions" value={`₹${totalDeduction.toLocaleString("en-IN")}`} icon={Wallet} iconBg="#f97316" />
        <StatCard label="Avg. Net Salary" value={`₹${Math.round(totalNet / payroll.length).toLocaleString("en-IN")}`} icon={TrendingUp} iconBg="#10b981" />
        <StatCard label="Pending Payslips" value={pendingCount} icon={Clock3} iconBg="#a855f7" />
      </div>

      <Card className="p-4 sm:p-5">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-400 text-[12px] uppercase tracking-wide border-b border-gray-100">
                <th className="py-3 pr-4 font-semibold">Employee</th>
                <th className="py-3 pr-4 font-semibold">Department</th>
                <th className="py-3 pr-4 font-semibold">Basic</th>
                <th className="py-3 pr-4 font-semibold">Allowance</th>
                <th className="py-3 pr-4 font-semibold">Deduction</th>
                <th className="py-3 pr-4 font-semibold">Net Pay</th>
                <th className="py-3 pr-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {payroll.map((p) => (
                <tr key={p.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/60">
                  <td className="py-3 pr-4 text-[13.5px] font-medium text-gray-800">{p.name}</td>
                  <td className="py-3 pr-4 text-[13.5px] text-gray-600">{p.department}</td>
                  <td className="py-3 pr-4 text-[13.5px] text-gray-600">₹{p.basic.toLocaleString("en-IN")}</td>
                  <td className="py-3 pr-4 text-[13.5px] text-emerald-600">+₹{p.allowance.toLocaleString("en-IN")}</td>
                  <td className="py-3 pr-4 text-[13.5px] text-red-500">-₹{p.deduction.toLocaleString("en-IN")}</td>
                  <td className="py-3 pr-4 text-[13.5px] font-semibold text-gray-900">₹{p.net.toLocaleString("en-IN")}</td>
                  <td className="py-3 pr-4">
                    <Badge text={p.status} tone={p.status === "Paid" ? "green" : "orange"} />
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
