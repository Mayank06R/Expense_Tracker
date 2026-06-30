import { createContext, useContext, useEffect, useMemo, useReducer, useCallback } from "react";

const STORAGE_KEY = "aura.expense.tracker.v1";

const seed = () => {
  const now = new Date();
  const day = (offset) => {
    const d = new Date(now);
    d.setDate(d.getDate() - offset);
    return d.toISOString();
  };
  return [
    { id: crypto.randomUUID(), type: "income", category: "salary", amount: 4200, note: "Monthly salary", date: day(2) },
    { id: crypto.randomUUID(), type: "expense", category: "housing", amount: 1450, note: "Rent", date: day(2) },
    { id: crypto.randomUUID(), type: "expense", category: "food", amount: 38.5, note: "Farmers market", date: day(1) },
    { id: crypto.randomUUID(), type: "expense", category: "transport", amount: 22, note: "Metro pass", date: day(1) },
    { id: crypto.randomUUID(), type: "expense", category: "entertainment", amount: 64, note: "Live jazz", date: day(0) },
    { id: crypto.randomUUID(), type: "income", category: "freelance", amount: 580, note: "Logo project", date: day(0) },
  ];
};

const load = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return seed();
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return seed();
    return parsed;
  } catch {
    return seed();
  }
};

const save = (txs) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(txs));
  } catch {}
};

function reducer(state, action) {
  switch (action.type) {
    case "add":
      return [action.payload, ...state];
    case "remove":
      return state.filter((t) => t.id !== action.id);
    case "clear":
      return [];
    case "reset":
      return seed();
    default:
      return state;
  }
}

const TxContext = createContext(null);

export function TransactionsProvider({ children }) {
  const [transactions, dispatch] = useReducer(reducer, null, load);

  useEffect(() => {
    save(transactions);
  }, [transactions]);

  const addTransaction = useCallback((tx) => {
    const full = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      note: "",
      ...tx,
      amount: Number(tx.amount),
    };
    dispatch({ type: "add", payload: full });
    return full;
  }, []);

  const removeTransaction = useCallback((id) => dispatch({ type: "remove", id }), []);
  const clearAll = useCallback(() => dispatch({ type: "clear" }), []);
  const resetDemo = useCallback(() => dispatch({ type: "reset" }), []);

  const stats = useMemo(() => {
    let income = 0;
    let expense = 0;
    for (const t of transactions) {
      if (t.type === "income") income += Number(t.amount) || 0;
      else expense += Number(t.amount) || 0;
    }
    const balance = income - expense;
    return { income, expense, balance, count: transactions.length };
  }, [transactions]);

  const value = useMemo(
    () => ({ transactions, addTransaction, removeTransaction, clearAll, resetDemo, stats }),
    [transactions, addTransaction, removeTransaction, clearAll, resetDemo, stats]
  );

  return <TxContext.Provider value={value}>{children}</TxContext.Provider>;
}

export function useTransactions() {
  const ctx = useContext(TxContext);
  if (!ctx) throw new Error("useTransactions must be used within TransactionsProvider");
  return ctx;
}
