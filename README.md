# InterviewAI — Your AI-powered interview coach

A polished demo of an AI mock-interview platform. It analyses a resume,
runs a personalised adaptive interview, evaluates answers, and produces a
detailed performance report — **entirely in the browser, no backend or API
keys required.**

Built with **React + TypeScript + Vite + Tailwind CSS + Framer Motion + Recharts**.

---

## Quick start

```bash
npm install       # install dependencies
npm run dev       # start the dev server (http://localhost:5173)
npm run build     # type-check + production build
npm run preview   # preview the production build
```

## The demo flow (works with zero configuration)

Landing → **Demo Login** → Dashboard → **Use sample resume** → AI resume
analysis → Interview setup → Interview room → answer questions (adaptive
follow-ups) → completion → performance report → history.

Every step is wired to real local state. Refreshing the page keeps your
session (stored in `localStorage`).

---

## Folder structure

```
interviewai/
├── .env.example              # documents future backend/API keys
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
├── public/
│   └── favicon.svg
└── src/
    ├── main.tsx              # entry point (Router + AppProvider)
    ├── App.tsx               # routes
    ├── index.css             # Tailwind + design system utilities
    ├── types/
    │   └── index.ts          # all shared TypeScript interfaces
    ├── data/
    │   └── demoData.ts       # sample resume, stats, history, sample report
    ├── context/
    │   └── AppContext.tsx    # global state (reducer + localStorage)
    ├── hooks/
    │   ├── useCamera.ts       # getUserMedia with graceful fallback
    │   └── useTimer.ts        # answer stopwatch + formatTime
    ├── services/
    │   └── ai/               # ← swap mock for real APIs here
    │       ├── index.ts       # public surface the UI imports
    │       ├── aiProvider.ts  # provider abstraction (mock ↔ live)
    │       ├── mockAI.ts      # the local mock engine
    │       ├── resumeAI.ts
    │       ├── interviewAI.ts
    │       └── evaluationAI.ts
    ├── components/
    │   ├── layout/           # Navbar, Sidebar, AppLayout
    │   ├── ui/               # GlassCard, Button styles, ProgressBar,
    │   │                     #   ProgressIndicator, StatTile, Logo, background
    │   ├── dashboard/        # ScoreCard, DashboardCard
    │   ├── resume/           # ResumeUploader
    │   ├── interview/        # AIAvatar, CandidateCamera, InterviewTimer,
    │   │                     #   LiveAnalytics, Transcript
    │   └── report/           # AnalyticsChart (radar / bar / line)
    └── pages/
        ├── Landing.tsx
        ├── Login.tsx
        ├── Dashboard.tsx
        ├── Resume.tsx
        ├── ResumeAnalysis.tsx
        ├── InterviewSetup.tsx
        ├── Interview.tsx
        ├── Report.tsx
        ├── History.tsx
        ├── Profile.tsx
        └── Settings.tsx
```

## Routes

`/` · `/login` · `/dashboard` · `/resume` · `/resume-analysis` ·
`/interview-setup` · `/interview` · `/report` · `/history` · `/profile` ·
`/settings`

---

## Connecting real AI later

The UI never calls a model directly — it imports from `src/services/ai`,
which delegates to a **provider** in `aiProvider.ts`. Today that provider is
`MockProvider` (backed by `mockAI.ts`). To go live:

1. Stand up your own backend (it holds the secret keys — never the browser).
2. Implement a `LiveProvider` in `aiProvider.ts` whose methods `fetch` your
   backend at `import.meta.env.VITE_API_URL`:
   - `analyzeResume(file)` → `POST /resume/analyze` (send the PDF, get a `ResumeProfile`)
   - `evaluateAnswer(answer, question)` → `POST /interview/evaluate`
   - `generateReport(records, ...)` → `POST /interview/report`
   - question generation can stay client-side or move server-side
3. Set `VITE_AI_MODE=live` in `.env` and point `ai` at `LiveProvider`.

Because every method already returns the typed shapes in `src/types`, no UI
changes are needed. Voice (e.g. ElevenLabs) and speech-to-text plug into the
same seam — the interview room’s answer box is where a live transcript would land.

**Never expose API keys in frontend code.** `.env.example` lists
`OPENAI_API_KEY` / `ELEVENLABS_API_KEY` / `ANTHROPIC_API_KEY` only to
document what your **server** needs.

---

## Notes on the analytics

Speaking pace, filler words, eye-contact and engagement figures are labelled
**AI-estimated / engagement indicators**. They are practice aids only and do
**not** measure ability, honesty, personality, or whether someone is
qualified. The final "readiness" score is a coaching estimate, not a hiring
decision.
