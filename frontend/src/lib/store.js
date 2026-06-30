import { createContext, useContext, useEffect, useMemo, useReducer, useCallback, useState } from "react";
import { DEFAULT_BUDGETS } from "./categories";
import { sameMonth, previousMonth, buildCategoryTotals } from "./monthly";

const STORAGE_KEY = "hisaab.tracker.v2";
const INCOME_KEY = "hisaab.monthly.income.v1";
const BUDGETS_KEY = "hisaab.budgets.v1";

const seedTransactions = () => {
  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth();

  const mk = (day, monthOffset, type, category, amount, note) => {
    const d = new Date(y, m + monthOffset, day, 12, 0, 0);
    return {
      id: crypto.randomUUID(),
      type,
      category,
      amount,
      note,
      date: d.toISOString(),
      createdAt: d.toISOString(),
    };
  };

  const current = [
    // Housing 22,500
    mk(1, 0, "expense", "housing", 18000, "Rent Payment"),
    mk(28, 0, "expense", "housing", 4500, "IKEA Hyderabad"),
    // Food 5,760
    mk(5, 0, "expense", "food", 1370, "Zomato"),
    mk(12, 0, "expense", "food", 1370, "Swiggy"),
    mk(29, 0, "expense", "food", 490, "Starbucks"),
    mk(18, 0, "expense", "food", 1360, "Domino's Pizza"),
    mk(22, 0, "expense", "food", 1170, "Haldiram's"),
    // Shopping 13,846
    mk(3, 0, "expense", "shopping", 4500, "Myntra"),
    mk(8, 0, "expense", "shopping", 2800, "Amazon"),
    mk(11, 0, "expense", "shopping", 2500, "Flipkart"),
    mk(15, 0, "expense", "shopping", 1650, "Nykaa"),
    mk(20, 0, "expense", "shopping", 2099, "Decathlon"),
    mk(30, 0, "expense", "shopping", 297, "Amazon Prime"),
    // Transport 3,700
    mk(6, 0, "expense", "transport", 1150, "Ola rides"),
    mk(14, 0, "expense", "transport", 380, "Uber"),
    mk(9, 0, "expense", "transport", 500, "Metro Card recharge"),
    mk(16, 0, "expense", "transport", 1470, "Petrol"),
    mk(27, 0, "expense", "transport", 200, "Parking Bengaluru"),
    // Entertainment 3,167
    mk(5, 0, "expense", "entertainment", 649, "Netflix"),
    mk(7, 0, "expense", "entertainment", 119, "Spotify"),
    mk(10, 0, "expense", "entertainment", 299, "Disney+ Hotstar"),
    mk(19, 0, "expense", "entertainment", 1700, "BookMyShow — PVR"),
    mk(23, 0, "expense", "entertainment", 400, "Steam Game"),
    // Utilities 1,799
    mk(4, 0, "expense", "utilities", 820, "BESCOM Electricity"),
    mk(4, 0, "expense", "utilities", 599, "Airtel Fiber WiFi"),
    mk(17, 0, "expense", "utilities", 239, "Jio Recharge"),
    mk(21, 0, "expense", "utilities", 141, "Indane Gas"),
    // Healthcare 2,769
    mk(13, 0, "expense", "healthcare", 450, "Apollo Pharmacy"),
    mk(24, 0, "expense", "healthcare", 1200, "1mg Medicines"),
    mk(26, 0, "expense", "healthcare", 1119, "Practo Consultation"),
    // Education 499
    mk(2, 0, "expense", "education", 499, "Udemy Course"),
    // Income
    mk(1, 0, "income", "salary", 75000, "Monthly salary"),
  ];

  const previous = [
    mk(1, -1, "expense", "housing", 18000, "Rent Payment"),
    mk(1, -1, "expense", "housing", 3000, "Society Maintenance"),
    mk(5, -1, "expense", "housing", 6500, "IKEA"),
    mk(2, -1, "expense", "utilities", 950, "BESCOM Electricity"),
    mk(3, -1, "expense", "utilities", 599, "Airtel WiFi"),
    mk(5, -1, "expense", "utilities", 239, "Jio Recharge"),
    mk(31, -1, "expense", "utilities", 141, "Indane Gas"),
    mk(6, -1, "expense", "groceries", 3200, "BigBasket"),
    mk(8, -1, "expense", "food", 780, "Zomato"),
    mk(17, -1, "expense", "food", 950, "Swiggy"),
    mk(18, -1, "expense", "food", 680, "BlinkIt"),
    mk(30, -1, "expense", "food", 820, "Pizza Hut"),
    mk(10, -1, "expense", "shopping", 3200, "Amazon"),
    mk(12, -1, "expense", "shopping", 2800, "Myntra"),
    mk(28, -1, "expense", "shopping", 2400, "Flipkart"),
    mk(12, -1, "expense", "shopping", 2800, "Nykaa"),
    mk(31, -1, "expense", "shopping", 2099, "Decathlon"),
    mk(14, -1, "expense", "transport", 2200, "Ola rides"),
    mk(15, -1, "expense", "transport", 1800, "Petrol"),
    mk(29, -1, "expense", "transport", 1500, "Uber"),
    mk(20, -1, "expense", "entertainment", 1300, "PVR Cinemas"),
    mk(22, -1, "expense", "entertainment", 649, "Netflix"),
    mk(23, -1, "expense", "entertainment", 119, "Spotify"),
    mk(24, -1, "expense", "entertainment", 299, "Hotstar"),
    mk(25, -1, "expense", "healthcare", 1150, "Apollo Pharmacy"),
    mk(26, -1, "expense", "healthcare", 1500, "Practo"),
    mk(27, -1, "expense", "education", 499, "Udemy"),
    mk(1, -1, "income", "salary", 75000, "Monthly salary"),
  ];

  return [...current, ...previous];
};

const load = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return seedTransactions();
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return seedTransactions();
    return parsed;
  } catch {
    return seedTransactions();
  }
};

const loadIncome = () => {
  const raw = localStorage.getItem(INCOME_KEY);
  if (raw === null) return 75000;
  const n = Number(raw);
  return Number.isFinite(n) ? n : 75000;
};

const loadBudgets = () => {
  try {
    const raw = localStorage.getItem(BUDGETS_KEY);
    if (!raw) return { ...DEFAULT_BUDGETS };
    return { ...DEFAULT_BUDGETS, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_BUDGETS };
  }
};

function reducer(state, action) {
  switch (action.type) {
    case "add":      return [action.payload, ...state];
    case "remove":   return state.filter((t) => t.id !== action.id);
    case "clear":    return [];
    case "reset":    return seedTransactions();
    default:         return state;
  }
}

const TxContext = createContext(null);

export function TransactionsProvider({ children }) {
  const [transactions, dispatch] = useReducer(reducer, null, load);
  const [monthlyIncome, setMonthlyIncomeState] = useState(() => loadIncome());
  const [budgets, setBudgetsState] = useState(() => loadBudgets());

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions)); }, [transactions]);
  useEffect(() => { localStorage.setItem(INCOME_KEY, String(monthlyIncome)); }, [monthlyIncome]);
  useEffect(() => { localStorage.setItem(BUDGETS_KEY, JSON.stringify(budgets)); }, [budgets]);

  const addTransaction = useCallback((tx) => {
    const full = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      note: "",
      ...tx,
      amount: Number(tx.amount),
      createdAt: new Date().toISOString(),
    };
    dispatch({ type: "add", payload: full });
    return full;
  }, []);

  const removeTransaction = useCallback((id) => dispatch({ type: "remove", id }), []);
  const resetDemo = useCallback(() => dispatch({ type: "reset" }), []);
  const clearAll = useCallback(() => dispatch({ type: "clear" }), []);

  const setMonthlyIncome = useCallback((v) => {
    const n = Math.max(0, Math.round(Number(v) || 0));
    setMonthlyIncomeState(n);
  }, []);

  const setBudget = useCallback((catId, value) => {
    setBudgetsState((prev) => ({ ...prev, [catId]: Math.max(0, Math.round(Number(value) || 0)) }));
  }, []);

  const monthRef = useMemo(() => new Date(), []);

  const stats = useMemo(() => {
    const ref = monthRef;
    const prev = previousMonth(ref);
    let mIncome = 0, mExpense = 0, mCount = 0, largest = null;
    let pExpense = 0;
    for (const t of transactions) {
      const amt = Number(t.amount) || 0;
      if (sameMonth(t.date, ref)) {
        if (t.type === "income") mIncome += amt;
        else {
          mExpense += amt;
          mCount += 1;
          if (!largest || amt > largest.amount) largest = t;
        }
      } else if (sameMonth(t.date, prev)) {
        if (t.type === "expense") pExpense += amt;
      }
    }
    const available = monthlyIncome - mExpense;
    const savingsRate = monthlyIncome > 0 ? available / monthlyIncome : 0;
    const today = ref.getDate();
    const dailyAvg = today > 0 ? mExpense / today : 0;
    const prevDays = new Date(prev.getFullYear(), prev.getMonth() + 1, 0).getDate();
    const prevDailyAvg = prevDays > 0 ? pExpense / prevDays : 0;
    const dailyDelta = prevDailyAvg > 0 ? (dailyAvg - prevDailyAvg) / prevDailyAvg : 0;

    const catTotals = buildCategoryTotals(transactions, ref);
    const totalBudget = Object.values(budgets).reduce((s, v) => s + (Number(v) || 0), 0);
    const overBudget = [];
    const atRisk = [];
    for (const [cat, spent] of catTotals.entries()) {
      const b = budgets[cat] || 0;
      if (b > 0) {
        const ratio = spent / b;
        if (ratio > 1) overBudget.push({ cat, spent, budget: b, ratio });
        else if (ratio >= 0.9) atRisk.push({ cat, spent, budget: b, ratio });
      }
    }

    return {
      monthIncome: mIncome,
      monthExpense: mExpense,
      monthCount: mCount,
      available,
      savingsRate,
      largest,
      dailyAvg,
      prevDailyAvg,
      dailyDelta,
      totalBudget,
      overBudget,
      atRisk,
      catTotals,
      prevMonthExpense: pExpense,
    };
  }, [transactions, monthlyIncome, budgets, monthRef]);

  const value = useMemo(
    () => ({
      transactions,
      addTransaction,
      removeTransaction,
      resetDemo,
      clearAll,
      stats,
      monthlyIncome,
      setMonthlyIncome,
      budgets,
      setBudget,
      monthRef,
    }),
    [transactions, addTransaction, removeTransaction, resetDemo, clearAll, stats, monthlyIncome, setMonthlyIncome, budgets, setBudget, monthRef]
  );

  return <TxContext.Provider value={value}>{children}</TxContext.Provider>;
}

export function useTransactions() {
  const ctx = useContext(TxContext);
  if (!ctx) throw new Error("useTransactions must be used within TransactionsProvider");
  return ctx;
}
