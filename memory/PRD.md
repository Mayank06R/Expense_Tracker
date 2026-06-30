# Aura — Expense Tracker

## Original problem statement
"i want to build a expense tracker with great ui and interactive web application that uses threejs it should be completely frontend based no complex architecture The Expense Tracker project is a web application developed using React. Its main purpose is to assist users in keeping track of their expenses. With this app, users can easily add and delete expenses to view a summary of their spending habits as well as it will show the available balance the user has left."

## Architecture
- 100% frontend (React 19 + CRA via craco). No backend usage.
- Data persisted in `localStorage` under key `aura.expense.tracker.v1`.
- 3D scene via @react-three/fiber 9 + @react-three/drei 10 + three 0.171.
- Charts: Recharts. Motion: framer-motion. Toasts: sonner. Icons: lucide-react.

## User personas
- Solo individual tracking personal income / expenses on a single device, valuing privacy (no servers).
- Design-curious user who enjoys delightful, distinctive UI.

## Core requirements (static)
- Add transactions (income or expense) with category, amount, date, note.
- Delete any transaction.
- Show available balance (income − expense), total income, total expense.
- Visualize category breakdown (donut) and 14-day income/expense trend (area).
- Export all transactions to CSV.
- Reset to demo data.
- Persistent across reloads via localStorage.

## What's been implemented (2026-02)
- Bento glass dashboard with Cormorant Garamond serif headings + Manrope body.
- Organic earthy palette (sage / terracotta), grain overlay, subtle radial accents.
- Interactive Three.js scene: distorting blob whose color, distortion and scale react to balance/expense ratio; small accent orb. Pulses on each new transaction.
- BalanceHero with healthy/alert chip, animated entry.
- Add Transaction form with segmented Expense/Income, category pills, date picker, note.
- Recent activity list with hover-reveal delete, animated remove.
- Category Donut + legend with % breakdown.
- 14-day Area chart with gradient fills and custom tooltips.
- Export to CSV, Reset demo, sonner success/error toasts.

## Prioritized backlog (P0/P1/P2)
- P1: Monthly/weekly filters and per-month budget caps.
- P1: Multi-currency selector and FX-aware totals.
- P2: Recurring transactions / scheduled entries.
- P2: Dark mode variant of the same organic theme.
- P2: Light onboarding tour highlighting the Three.js aura.

## Next tasks
- Gather user feedback after first review.
- Wire optional monthly budget alerts driving the aura color.
