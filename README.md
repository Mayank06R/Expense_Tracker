<div align="center">

# 🪔 Hisaab

### *An interactive INR spending dashboard with a real 3D category breakdown.*

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Three.js](https://img.shields.io/badge/Three.js-r171-000000?logo=three.js&logoColor=white)](https://threejs.org)
[![GSAP](https://img.shields.io/badge/GSAP-3.12-88CE02?logo=greensock&logoColor=white)](https://gsap.com)
[![Tailwind](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-F4C95D)](#license)

**Hisaab** (Hindi: *hisāb*, "accounts / reckoning") is a 100% frontend React expense tracker built for Indian users. It tracks rent, Zomato, Ola, Amazon, Netflix, SIPs and everything in between — and renders your spending as a tactile 3D bar field you can rotate.

</div>

---

## ✨ Features

- 💸 **Editable Monthly Income** — set your salary once, it persists across reloads
- 📊 **Live month-aware stats** — Total Spent, Available Balance, Savings Rate, Daily Average vs last month, Largest Transaction
- 🎯 **Per-category budgets** with over-budget / at-risk / healthy status
- 🥇 **Spending Habits Summary** — top-3 categories ranked with medals
- 📈 **30-day Daily Spending bar chart** with average-line overlay
- 🧊 **Interactive 3D Category Breakdown** — Three.js pillars you can drag to rotate, auto-rotates idle
- 🌌 **Ambient Three.js background** — floating orbs and particles that react to your savings health
- 💾 **localStorage persistence** — your data never leaves the device
- 📥 **Export to CSV** — `hisaab-YYYY-MM-DD.csv`
- ✏️ **Inline income editing** with sonner toast confirmations
- 🇮🇳 **Indian merchants seeded** — Zomato, Swiggy, IKEA Hyderabad, Amazon Prime, Myntra, Ola, Netflix, BookMyShow PVR, BESCOM, Jio, Apollo Pharmacy, Udemy, etc.
- 🎨 **"Indigo Twilight" theme** — deep #07080F canvas, saffron + gold + emerald accents
- ✨ **GSAP-powered count-ups** and progress-bar fills, **framer-motion** card entrance animations

---

## 🖥️ Screens

```
┌─────────────────────────────────────────────────────────────────────────┐
│ 🪔 Hisaab                                       Reset · Export · + Add │
│                                                                         │
│ Spending Dashboard                                            🟢 Live   │
│ June 2026 — real-time overview of your financial health                 │
│                                                                         │
│ ┌─Monthly Income─┐ ┌─Total Spent─┐ ┌─Available Bal.─┐ ┌─Savings Rate──┐ │
│ │ ₹75,000     ✏ │ │ ₹54,040     │ │ ₹20,960        │ │ 27.9% Healthy │ │
│ └────────────────┘ └─────────────┘ └────────────────┘ └───────────────┘ │
│                                                                         │
│ ┌─Month-to-Date Spend ──────────────────┐ ┌─Daily Avg─┐ ┌─Largest───┐  │
│ │ ₹54,040 / ₹54,000           100.1% ⚠ │ │ ₹1,801    │ │ ₹18,000    │  │
│ │ ████████████████████████████████████  │ │ −7% vs LM │ │ Rent       │  │
│ │ 4 over budget: Shopping, Entertain… │ └───────────┘ └───────────┘  │
│ └───────────────────────────────────────┘                                │
│                                                                         │
│ Spending Habits Summary                                                 │
│ 🥇 Housing ₹22,500 (41.6%)  🥈 Shopping ₹13,846  🥉 Food ₹5,760        │
│                                                                         │
│ Daily Spending (30-day bar chart)                                       │
│ ▁▂█▃▁▁▂▁▁▂▁▂▁▁▂▁▂▁▁█▁▁▂▁▁▁▂▁▁▁                                          │
│                                                                         │
│ ┌─ 3D Category Breakdown ────┐ ┌─ Budget Progress ──────────────────┐  │
│ │ (Three.js — drag to rotate)│ │ Shopping     Over   ₹13,846/₹6,000 │  │
│ │   ▮  ▮                     │ │ ███████████████████████████        │  │
│ │ ▮ ▮ ▮  ▮ ▮ ▮               │ │ Entertainment Over  ₹3,167/₹2,500  │  │
│ │ ═══════════════════════════│ │ Transport    Over   ₹3,700/₹3,000  │  │
│ └────────────────────────────┘ └────────────────────────────────────┘  │
│                                                                         │
│ Recent Transactions                                          View all → │
│ A  Amazon Prime    Shopping · 30 Jun                          −₹297    │
│ S  Starbucks       Food · 29 Jun                              −₹490    │
│ I  IKEA Hyderabad  Housing · 28 Jun                         −₹4,500    │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech stack

| Layer        | Choice                                                          |
|--------------|-----------------------------------------------------------------|
| Framework    | **React 19** + Create React App (craco)                         |
| Styling      | **Tailwind CSS 3** + custom CSS variables (Indigo Twilight)     |
| 3D           | **@react-three/fiber 9** + **@react-three/drei 10** + three 171 |
| Animation    | **GSAP 3.12** (count-ups, bar fills) + **framer-motion 11**     |
| Icons        | **lucide-react**                                                |
| Toasts       | **sonner**                                                      |
| UI primitives| **shadcn/ui** (Radix-based)                                     |
| State        | React Context + `useReducer` + `localStorage`                   |
| Fonts        | Cormorant Garamond (display) · Manrope (body) · JetBrains Mono  |

> No backend. No tracking. No analytics. Your data never leaves your device.

---

## 🚀 Getting started

### Prerequisites
- **Node.js 20+** and **Yarn 1.22+**

### Install & run

```bash
# clone
git clone https://github.com/<your-org>/hisaab.git
cd hisaab/frontend

# install
yarn install

# dev server (http://localhost:3000)
yarn start

# production build
yarn build
```

The app is **100% frontend** — `frontend/` is the only directory you need. The repository also contains a FastAPI/MongoDB scaffold under `backend/`, but Hisaab does not call it. Feel free to delete that folder if you're forking the project.

---

## 📂 Project structure

```
frontend/
├── public/
│   └── index.html              # Google Fonts + page title
└── src/
    ├── App.js                  # TransactionsProvider + Toaster + Router
    ├── App.css                 # Theme utilities (.glass, .btn-pill, .progress-*)
    ├── index.css               # Indigo Twilight tokens + shadcn bridge
    ├── lib/
    │   ├── categories.js       # Indian categories + DEFAULT_BUDGETS (₹54k)
    │   ├── format.js           # INR formatter (en-IN, lakh grouping)
    │   ├── monthly.js          # sameMonth / buildDailySeries helpers
    │   └── store.js            # Context, reducer, localStorage, monthStats
    ├── pages/
    │   └── Dashboard.jsx       # Top-level layout
    └── components/
        ├── Header.jsx
        ├── DashboardHero.jsx
        ├── MonthlyIncomeCard.jsx
        ├── StatsRow.jsx        # TotalSpent / Available / SavingsRate
        ├── MTDBudgetCard.jsx
        ├── SecondaryStats.jsx  # DailyAvg / Largest
        ├── SpendingHabitsCard.jsx
        ├── DailySpendingChart.jsx
        ├── CategoryBreakdown3D.jsx     # ⬅ the Three.js scene
        ├── BudgetProgressCard.jsx
        ├── RecentTransactionsCard.jsx
        ├── AllTransactionsSheet.jsx
        ├── AddTransactionDialog.jsx
        ├── ThreeBackground.jsx          # ambient orbs + particles
        ├── CountUp.jsx                  # GSAP number animator
        └── StatCard.jsx                 # generic glass stat card
```

---

## 🧮 How the math works

All stats are derived from `transactions[]` + `monthlyIncome` + `budgets{}`:

```text
mIncome          = Σ amount where type=income     ∧ same month
mExpense         = Σ amount where type=expense    ∧ same month
monthCount       = count of expense txns same month
largest          = max-amount expense same month
effectiveIncome  = monthlyIncome + mIncome
available        = effectiveIncome − mExpense
savingsRate      = available / effectiveIncome
dailyAvg         = mExpense / today's day-of-month
dailyDelta       = (dailyAvg − prevDailyAvg) / prevDailyAvg
totalBudget      = Σ budgets[cat]
overBudget[cat]  = spent[cat] > budget[cat]
atRisk[cat]      = 0.9 ≤ spent[cat]/budget[cat] ≤ 1
```

`monthlyIncome` is your salary configuration (one number).
Add *additional* income (freelance, bonus, gift) as transactions — they flow into `mIncome` and bump `available`.

---

## 🇮🇳 Indian categories & defaults

| Category         | Default budget |
|------------------|----------------|
| Housing          | ₹20,000        |
| Food & Dining    | ₹8,000         |
| Shopping         | ₹6,000         |
| Groceries        | ₹6,000         |
| Transport        | ₹3,000         |
| Entertainment    | ₹2,500         |
| Utilities        | ₹2,500         |
| Healthcare       | ₹3,000         |
| Education        | ₹2,000         |
| Other            | ₹1,000         |
| EMI & Loans      | 0 (add your own) |
| Investments/SIP  | 0 (add your own) |
| **Total**        | **₹54,000**    |

Income categories: Salary, Freelance, Bonus, Investment Return, Gift, Other.

Edit them in `src/lib/categories.js`.

---

## 🎨 Customization

| What                    | Where                                                  |
|-------------------------|--------------------------------------------------------|
| Theme colors            | `src/index.css` (`:root` CSS variables)                |
| Default budgets         | `EXPENSE_CATEGORIES` in `src/lib/categories.js`        |
| Currency                | `src/lib/format.js` (replace `en-IN` / `INR`)          |
| Default monthly income  | `INCOME_KEY` default in `src/lib/store.js`             |
| Seed transactions       | `seedTransactions()` in `src/lib/store.js`             |
| 3D scene tuning         | `src/components/CategoryBreakdown3D.jsx`               |
| Ambient orbs / particles| `src/components/ThreeBackground.jsx`                   |

> Want USD instead of INR? Change the locale to `en-US` and currency to `USD` in `format.js` — the rest of the app reads through it.

---

## ⌨️ Keyboard shortcuts

| Key       | Action                              |
|-----------|-------------------------------------|
| `Esc`     | Close Add Transaction / All Sheet   |
| `Enter`   | Save (inside Add dialog or income edit) |

---

## 🧪 LocalStorage keys

| Key                            | Stores                              |
|--------------------------------|-------------------------------------|
| `hisaab.tracker.v2`            | Array of transactions               |
| `hisaab.monthly.income.v1`     | Monthly income (number)             |
| `hisaab.budgets.v1`            | `{ categoryId: budgetINR, … }`      |

Run in DevTools to wipe & reload with fresh demo:
```js
localStorage.clear(); location.reload();
```

---

## 🗺️ Roadmap

- [ ] Inline budget editing on Budget Progress card
- [ ] Month switcher (review previous months)
- [ ] Recurring transactions (Rent, Netflix, SIP) with auto-generation
- [ ] **Subscriptions Radar** — auto-flag recurring debits (Netflix, Spotify, Hotstar, Jio, Airtel)
- [ ] PDF monthly statement export
- [ ] PWA / offline-first
- [ ] Multi-currency selector (for NRIs)
- [ ] Optional E2E sync via Supabase / Firebase

---

## 🤝 Contributing

PRs welcome. Conventional commits preferred (`feat:`, `fix:`, `chore:`).

```bash
git checkout -b feat/subscriptions-radar
yarn install
yarn start
# hack hack hack
git commit -m "feat: subscriptions radar"
```

---

## 📄 License

MIT © 2026 — do whatever you like. A star ⭐ on the repo would be sweet.

---

<div align="center">

*Built with ❤️ for the Indian spender who wants their dashboard to feel like a Bloomberg terminal — not a spreadsheet.*

</div>
