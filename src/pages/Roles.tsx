import { Plus, ShieldCheck } from "lucide-react";
import { Card, PageHeader, Badge } from "../components/ui";
import { roleList } from "../data/mockData";

export default function Roles() {
  return (
    <div>
      <PageHeader
        title="Roles & Permissions"
        subtitle="Manage access levels across the organization"
        action={
          <button className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-4 py-2.5 rounded-xl text-[13.5px] font-semibold">
            <Plus size={16} /> Add Role
          </button>
        }
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {roleList.map((r) => (
          <Card key={r.name} className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-[15px]">{r.name}</p>
                  <p className="text-[12.5px] text-gray-400">{r.users} users assigned</p>
                </div>
              </div>
              <button className="text-brand-600 text-[13px] font-medium">Edit</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {r.permissions.map((p) => (
                <Badge key={p} text={p} tone="blue" />
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
