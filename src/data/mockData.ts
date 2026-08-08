export type Employee = {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: "Active" | "On Leave" | "Inactive";
  joined: string;
  avatarColor: string;
};

const colors = ["#3b6cf0", "#f97316", "#10b981", "#a855f7", "#ec4899", "#06b6d4", "#eab308"];
const first = ["Aarav","Diya","Vikram","Ananya","Rohan","Meera","Karthik","Priya","Arjun","Sneha","Ishaan","Kavya","Nikhil","Pooja","Rahul","Divya","Sanjay","Neha","Varun","Aisha"];
const last = ["Sharma","Iyer","Patel","Nair","Reddy","Menon","Gupta","Rao","Bose","Kapoor","Verma","Pillai","Chatterjee","Malhotra","Krishnan"];
const depts = ["Engineering","Marketing","Sales","HR","Design","Finance","Operations"];
const roles = ["Software Engineer","Product Designer","HR Executive","Sales Manager","Marketing Lead","Financial Analyst","QA Engineer","DevOps Engineer","Recruiter","Account Manager"];

function seededRand(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export const employees: Employee[] = Array.from({ length: 48 }).map((_, i) => {
  const fn = first[i % first.length];
  const ln = last[(i * 3 + 1) % last.length];
  const dept = depts[i % depts.length];
  const role = roles[i % roles.length];
  const statusRoll = seededRand(i + 1);
  const status: Employee["status"] = statusRoll > 0.9 ? "On Leave" : statusRoll > 0.85 ? "Inactive" : "Active";
  const month = 1 + Math.floor(seededRand(i + 50) * 12);
  const day = 1 + Math.floor(seededRand(i + 90) * 27);
  return {
    id: `EMP${String(1000 + i)}`,
    name: `${fn} ${ln}`,
    email: `${fn.toLowerCase()}.${ln.toLowerCase()}@siegecode.com`,
    role,
    department: dept,
    status,
    joined: `${2021 + (i % 5)}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
    avatarColor: colors[i % colors.length],
  };
});

export const departments = [
  { name: "Engineering", head: "Vikram Patel", employees: 87, budget: "₹2.4Cr", color: "#3b6cf0" },
  { name: "Marketing", head: "Meera Menon", employees: 49, budget: "₹85L", color: "#10b981" },
  { name: "Sales", head: "Rohan Reddy", employees: 62, budget: "₹1.1Cr", color: "#f97316" },
  { name: "HR", head: "Ananya Nair", employees: 25, budget: "₹40L", color: "#a855f7" },
  { name: "Design", head: "Kavya Pillai", employees: 25, budget: "₹55L", color: "#ec4899" },
];

export const roleList = [
  { name: "Admin", users: 4, permissions: ["Full Access", "User Management", "Payroll", "Reports"] },
  { name: "HR Director", users: 3, permissions: ["Employee Management", "Payroll", "Reports", "Leave Approval"] },
  { name: "Manager", users: 18, permissions: ["Team View", "Leave Approval", "Attendance"] },
  { name: "Employee", users: 223, permissions: ["Self Service", "Leave Request", "Attendance"] },
];

export const attendanceTrend = [
  { month: "Jan", Present: 88, Absent: 5, "On Leave": 7 },
  { month: "Feb", Present: 90, Absent: 4, "On Leave": 6 },
  { month: "Mar", Present: 85, Absent: 8, "On Leave": 7 },
  { month: "Apr", Present: 93, Absent: 3, "On Leave": 4 },
  { month: "May", Present: 89, Absent: 5, "On Leave": 6 },
  { month: "Jun", Present: 96, Absent: 2, "On Leave": 2 },
];

export const departmentDistribution = [
  { name: "Engineering", value: 35, color: "#3b6cf0" },
  { name: "Sales", value: 25, color: "#f97316" },
  { name: "Marketing", value: 20, color: "#10b981" },
  { name: "HR", value: 10, color: "#a855f7" },
  { name: "Design", value: 10, color: "#ec4899" },
];

export const leaveRequests = employees.slice(0, 14).map((e, i) => ({
  id: `LR${2000 + i}`,
  employee: e.name,
  type: ["Sick Leave", "Casual Leave", "Earned Leave", "Work From Home"][i % 4],
  from: `2026-08-${String(3 + i).padStart(2, "0")}`,
  to: `2026-08-${String(5 + i).padStart(2, "0")}`,
  days: 1 + (i % 4),
  status: i % 3 === 0 ? "Approved" : i % 3 === 1 ? "Pending" : "Rejected",
}));

export const shifts = [
  { name: "Morning Shift", time: "6:00 AM – 2:00 PM", employees: 64, color: "#f97316" },
  { name: "General Shift", time: "9:30 AM – 6:30 PM", employees: 142, color: "#3b6cf0" },
  { name: "Evening Shift", time: "2:00 PM – 10:00 PM", employees: 32, color: "#a855f7" },
  { name: "Night Shift", time: "10:00 PM – 6:00 AM", employees: 10, color: "#171923" },
];

export const payroll = employees.slice(0, 12).map((e, i) => ({
  id: e.id,
  name: e.name,
  department: e.department,
  basic: 45000 + (i % 6) * 8000,
  allowance: 8000 + (i % 4) * 1500,
  deduction: 3200 + (i % 3) * 900,
  net: 0,
  status: i % 5 === 0 ? "Pending" : "Paid",
})).map((p) => ({ ...p, net: p.basic + p.allowance - p.deduction }));

export const performanceReviews = employees.slice(0, 10).map((e, i) => ({
  name: e.name,
  department: e.department,
  score: 60 + ((i * 7) % 40),
  goalsCompleted: 4 + (i % 5),
  totalGoals: 8,
  rating: ["Excellent", "Good", "Average", "Needs Improvement"][Math.min(3, Math.floor((100 - (60 + ((i * 7) % 40))) / 15))],
}));

export const events = [
  { title: "Town Hall Meeting", date: "2026-08-10", time: "10:00 AM", type: "Meeting" },
  { title: "Diya Iyer's Birthday", date: "2026-08-11", time: "All day", type: "Celebration" },
  { title: "Q3 Payroll Processing", date: "2026-08-14", time: "9:00 AM", type: "Payroll" },
  { title: "New Hire Orientation", date: "2026-08-17", time: "11:00 AM", type: "Onboarding" },
  { title: "Performance Review Cycle", date: "2026-08-21", time: "All day", type: "Performance" },
];

export const notifications = [
  { title: "Leave request from Rohan Reddy", time: "5 min ago", unread: true },
  { title: "Payroll run completed for July", time: "2 hrs ago", unread: true },
  { title: "3 new employees onboarded", time: "1 day ago", unread: false },
  { title: "Attendance report ready", time: "2 days ago", unread: false },
];

export const stats = {
  totalEmployees: 248,
  presentToday: 234,
  onLeave: 8,
  pendingRequests: 14,
};

export const reports = [
  { name: "Monthly Attendance Report", period: "July 2026", generated: "2026-08-01", type: "Attendance" },
  { name: "Payroll Summary", period: "July 2026", generated: "2026-08-02", type: "Payroll" },
  { name: "Department Headcount", period: "Q2 2026", generated: "2026-07-15", type: "Headcount" },
  { name: "Leave Utilization", period: "H1 2026", generated: "2026-07-20", type: "Leave" },
  { name: "Performance Summary", period: "Q2 2026", generated: "2026-07-25", type: "Performance" },
];

export const allowanceDeduction = [
  { name: "House Rent Allowance", type: "Allowance", amount: "40% of Basic", applicable: "All Employees" },
  { name: "Travel Allowance", type: "Allowance", amount: "₹3,200 / mo", applicable: "All Employees" },
  { name: "Performance Bonus", type: "Allowance", amount: "Variable", applicable: "Eligible Employees" },
  { name: "Provident Fund", type: "Deduction", amount: "12% of Basic", applicable: "All Employees" },
  { name: "Professional Tax", type: "Deduction", amount: "₹200 / mo", applicable: "All Employees" },
  { name: "TDS", type: "Deduction", amount: "As per slab", applicable: "Taxable Employees" },
];
