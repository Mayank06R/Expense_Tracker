# Hisaab — Indian Spending Dashboard

## Original problem statement (last update)
"i want some indian touch you know like something indian spends on things like netflix, flat, shopping ... and i dont want the name aura ... give me this layout: Spending Dashboard / Monthly Income / Total Spent / Available Balance / Savings Rate / Month-to-Date Spend with budget bar / Daily Average / Largest Transaction / Spending Habits with medals / Daily Spending bar chart / Category Breakdown 3D / Budget Progress / Recent Transactions. Also use threejs / gsap animations — i am not liking the previous theme."

## Architecture
- 100% frontend (React 19 + craco). No backend usage.
- Data persisted in `localStorage` keys: `hisaab.tracker.v2`, `hisaab.monthly.income.v1`, `hisaab.budgets.v1`.
- 3D: @react-three/fiber 9, @react-three/drei 10, three 0.171 (Category Breakdown + ambient background orbs).
- Animations: GSAP 3.12 (count-ups + progress fills), framer-motion (card entrances).
- Charts: hand-built Daily Spending bar chart, hand-built Budget Progress bars (no recharts dependency on dashboard).
- Currency: INR (en-IN locale, ₹ symbol, lakh grouping).

## User personas
- Indian working professional tracking monthly INR spending on rent, Zomato, Amazon, Ola, Netflix, SIP etc.
- Wants per-category budgets, real-time over-budget alerts, savings-rate target, and a tactile premium UI.

## Core requirements (static)
- Editable monthly income (saves to localStorage).
- Add/delete income & expense transactions across 12 expense + 6 income Indian-flavoured categories.
- Live month-aware stats: Total Spent, Available Balance, Savings Rate, Daily Average vs last month, Largest Transaction.
- Month-to-Date budget bar + over-budget callouts.
- Top-3 Spending Habits (🥇🥈🥉), 30-day Daily Spending bar chart, Three.js 3D Category Breakdown, Per-category Budget Progress.
- Recent Transactions (last 5) + All Transactions sheet.
- Export to CSV, Reset Demo.

## What's been implemented (2026-02)
- Brand rename to **Hisaab** with wallet icon + saffron→gold gradient mark.
- Deep "Indigo Twilight" dark theme: #07080F canvas + saffron #FF8B3D, gold #F4C95D, emerald #10B981, coral #FF5C5C accents. Grain overlay + radial accents.
- GSAP-driven CountUp component for animated numbers and gsap-animated progress bars.
- Interactive 3D Category Breakdown (rotating RoundedBox pillars, glowing bases, floor disc with orange ring, floating ₹ labels, OrbitControls drag-to-rotate, auto-rotate ~0.08 rad/s).
- Ambient Three.js background (saffron/teal/violet orbs + 70 floating particles) tied subtly to savings rate.
- Indian merchant seed: 31 expense transactions totaling ₹54,040 (Rent ₹18,000, IKEA, Zomato, Swiggy, Starbucks, Amazon Prime, Myntra, Ola, Netflix, BookMyShow PVR, BESCOM Electricity, Jio Recharge, Apollo Pharmacy, Practo, Udemy, etc.) + 27 previous-month transactions for daily-avg comparison.
- DEFAULT_BUDGETS sum to ₹54,000 → MTD shows '100.1% used' matching user spec.
- Add Transaction dialog (FAB + header button), All Transactions sheet ('View all'), Export CSV → 'hisaab-YYYY-MM-DD.csv'.
- Bugs fixed in iteration 3: (a) new transactions land at the TOP of Recent (monotonic seed createdAt at midnight + ms offset), (b) income transactions correctly raise Available Balance + Savings Rate via `effectiveIncome = monthlyIncome + mIncome`, (c) Add dialog usable on narrow viewports (scrollable outer container), (d) empty-amount JS toast actually fires (native `required` removed).

## Prioritized backlog (P0/P1/P2)
- P1: Per-category budget editor inline on the Budget Progress card.
- P1: Month switcher (review previous months, not just current).
- P2: Recurring transactions (rent / Netflix / SIP) with auto-generation each month.
- P2: Push notifications when a category crosses 90 % / 100 % budget.
- P2: PDF export of monthly statement.
- P2: Multi-currency for NRIs (USD / EUR alongside INR).

## Next tasks
- Inline budget editing on Budget Progress rows.
- Month picker to flip between Jun/May/Apr 2026.
- Add a "Subscriptions" view that auto-groups Netflix/Spotify/Hotstar etc.
