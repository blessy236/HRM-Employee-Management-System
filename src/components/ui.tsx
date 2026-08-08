import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm ${className}`}>
      {children}
    </div>
  );
}

export function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div>
        <h1 className="text-[26px] font-bold text-gray-900 tracking-tight">{title}</h1>
        {subtitle && <p className="text-gray-500 text-[14.5px] mt-1">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function StatCard({
  label,
  value,
  icon: Icon,
  iconBg,
  trend,
  trendLabel,
  trendUp = true,
}: {
  label: string;
  value: string | number;
  icon: LucideIcon;
  iconBg: string;
  trend?: string;
  trendLabel?: string;
  trendUp?: boolean;
}) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <span className="text-gray-500 text-[14px] font-medium">{label}</span>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: iconBg }}>
          <Icon size={19} className="text-white" />
        </div>
      </div>
      <div className="text-[28px] font-bold text-gray-900 mt-3">{value}</div>
      {trend && (
        <div className="flex items-center gap-1.5 mt-2">
          <span className={`text-[12.5px] font-semibold ${trendUp ? "text-emerald-500" : "text-red-500"}`}>
            {trendUp ? "↗" : "↘"} {trend}
          </span>
          <span className="text-[12.5px] text-gray-400">{trendLabel}</span>
        </div>
      )}
    </Card>
  );
}

export function Badge({ text, tone = "gray" }: { text: string; tone?: "green" | "red" | "orange" | "gray" | "blue" }) {
  const tones: Record<string, string> = {
    green: "bg-emerald-50 text-emerald-600",
    red: "bg-red-50 text-red-500",
    orange: "bg-orange-50 text-orange-500",
    gray: "bg-gray-100 text-gray-500",
    blue: "bg-brand-50 text-brand-600",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[12px] font-semibold ${tones[tone]}`}>
      {text}
    </span>
  );
}

export function Avatar({ name, color }: { name: string; color: string }) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
  return (
    <div
      className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[12.5px] font-semibold flex-shrink-0"
      style={{ backgroundColor: color }}
    >
      {initials}
    </div>
  );
}
