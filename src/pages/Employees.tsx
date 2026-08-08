import { useMemo, useState } from "react";
import { Plus, Search, Mail } from "lucide-react";
import { Card, PageHeader, Badge, Avatar } from "../components/ui";
import { employees } from "../data/mockData";

const statusTone = { Active: "green", "On Leave": "orange", Inactive: "gray" } as const;

export default function Employees() {
  const [query, setQuery] = useState("");
  const [dept, setDept] = useState("All");
  const [page, setPage] = useState(1);
  const perPage = 10;

  const departments = ["All", ...Array.from(new Set(employees.map((e) => e.department)))];

  const filtered = useMemo(() => {
    return employees.filter(
      (e) =>
        (dept === "All" || e.department === dept) &&
        (e.name.toLowerCase().includes(query.toLowerCase()) || e.email.toLowerCase().includes(query.toLowerCase()))
    );
  }, [query, dept]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paged = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div>
      <PageHeader
        title="Employees"
        subtitle={`${employees.length} team members across all departments`}
        action={
          <button className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-4 py-2.5 rounded-xl text-[13.5px] font-semibold">
            <Plus size={16} /> Add Employee
          </button>
        }
      />

      <Card className="p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={17} />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Search by name or email..."
              className="w-full bg-gray-50 border border-gray-100 rounded-xl pl-10 pr-4 py-2.5 text-[13.5px] outline-none focus:ring-2 focus:ring-brand-100"
            />
          </div>
          <select
            value={dept}
            onChange={(e) => {
              setDept(e.target.value);
              setPage(1);
            }}
            className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-[13.5px] outline-none"
          >
            {departments.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-400 text-[12px] uppercase tracking-wide border-b border-gray-100">
                <th className="py-3 pr-4 font-semibold">Employee</th>
                <th className="py-3 pr-4 font-semibold">Role</th>
                <th className="py-3 pr-4 font-semibold">Department</th>
                <th className="py-3 pr-4 font-semibold">Joined</th>
                <th className="py-3 pr-4 font-semibold">Status</th>
                <th className="py-3 pr-4 font-semibold"></th>
              </tr>
            </thead>
            <tbody>
              {paged.map((e) => (
                <tr key={e.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/60">
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-3">
                      <Avatar name={e.name} color={e.avatarColor} />
                      <div className="min-w-0">
                        <p className="text-[13.5px] font-medium text-gray-800">{e.name}</p>
                        <p className="text-[12px] text-gray-400">{e.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 pr-4 text-[13.5px] text-gray-600">{e.role}</td>
                  <td className="py-3 pr-4 text-[13.5px] text-gray-600">{e.department}</td>
                  <td className="py-3 pr-4 text-[13.5px] text-gray-600">{e.joined}</td>
                  <td className="py-3 pr-4">
                    <Badge text={e.status} tone={statusTone[e.status] as any} />
                  </td>
                  <td className="py-3 pr-4 text-right">
                    <button className="text-gray-400 hover:text-brand-600">
                      <Mail size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {paged.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-400 text-[13.5px]">
                    No employees match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
          <p className="text-[12.5px] text-gray-400">
            Showing {paged.length ? (page - 1) * perPage + 1 : 0}–{(page - 1) * perPage + paged.length} of {filtered.length}
          </p>
          <div className="flex gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-3 py-1.5 rounded-lg border border-gray-100 text-[12.5px] disabled:opacity-40"
            >
              Prev
            </button>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-3 py-1.5 rounded-lg border border-gray-100 text-[12.5px] disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
