# Siegecode HRM

A full Workforce Management dashboard (Employees, Roles, Departments, Attendance, Shift, Leave Tracking, Allowance & Deduction, Events & Schedule, Payroll, Reports, Performance, Settings) with an AI **HR Assistant chatbot** powered by the **Groq API**, built with React + TypeScript + Vite + Tailwind CSS.

## 1. Install dependencies

```bash
npm install
```

## 2. Add your Groq API key (for the chatbot)

1. Get a free key at https://console.groq.com/keys
2. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
3. Open `.env` and paste your key:
   ```
   VITE_GROQ_API_KEY=gsk_your_real_key_here
   ```

Without this key, the rest of the app still works fully — the chatbot will just show a message asking you to add a key instead of crashing.

## 3. Run locally

```bash
npm run dev
```

Open http://localhost:5173

## 4. Build for production

```bash
npm run build
```

Output goes to `dist/`.

## 5. Deploy to Vercel (same as your existing hrm-ashen-eight.vercel.app)

1. Push this folder to a GitHub repo (or reuse your existing `Human-Resource-Management` repo).
2. In Vercel: Project Settings → Environment Variables → add `VITE_GROQ_API_KEY` with your key.
3. Redeploy. Framework preset: **Vite**, build command `npm run build`, output directory `dist`.

## Login

The app now requires signing in before you can reach the dashboard — going to `/` while logged out redirects to `/login`.

- Use **Quick Access Demo** → **Admin User** or **Employee** to sign in instantly with a demo account.
- Or type any email/password into the form (this is a front-end demo, so no password is actually checked — any email/password combo works; typing an email containing "employee" logs you in as an Employee, anything else logs you in as Admin User).
- The session persists in the browser (`localStorage`) until you click **Sign Out** from the profile menu in the top-right.
- To wire this up to a real backend later, replace the `login()` function in `src/context/AuthContext.tsx` with an API call.

## What's inside

- `src/pages/` — one file per sidebar section (Dashboard, Employees, Roles, Departments, Attendance, Shift, LeaveTracking, AllowanceDeduction, EventsSchedule, Payroll, Reports, Performance, Settings) plus `Login.tsx`.
- `src/components/Chatbot.tsx` — the floating HR Assistant widget (bottom-right on every dashboard page) that calls the Groq chat completions API directly from the browser using `VITE_GROQ_API_KEY`.
- `src/components/Sidebar.tsx`, `Topbar.tsx`, `DashboardLayout.tsx` — the app shell (sidebar nav, top search/notifications/profile bar).
- `src/data/mockData.ts` — all sample data (employees, departments, payroll, attendance, etc.) — swap this out for real API calls whenever you're ready.

## Notes on the chatbot

- Model used: `llama-3.3-70b-versatile` (fast + free-tier friendly on Groq). Change `GROQ_MODEL` in `src/components/Chatbot.tsx` if you'd like a different one.
- The key is read at build time via Vite's `import.meta.env.VITE_GROQ_API_KEY`, so it ships inside the client bundle — fine for a demo/internal tool, but for a public production app you should proxy Groq calls through your own backend instead of calling from the browser directly, so the key isn't exposed to visitors.
