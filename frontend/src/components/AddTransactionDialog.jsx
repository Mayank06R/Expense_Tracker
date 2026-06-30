import { useState, useEffect } from "react";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { useTransactions } from "../lib/store";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "../lib/categories";

export default function AddTransactionDialog({ open, onClose }) {
  const { addTransaction } = useTransactions();
  const [type, setType] = useState("expense");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [category, setCategory] = useState("food");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));

  const categories = type === "expense" ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") onClose?.(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const switchType = (next) => {
    setType(next);
    setCategory(next === "expense" ? "food" : "salary");
  };

  const submit = (e) => {
    e.preventDefault();
    const value = parseFloat(amount);
    if (!value || value <= 0 || Number.isNaN(value)) {
      toast.error("Enter a valid amount");
      return;
    }
    addTransaction({
      type,
      category,
      amount: value,
      note: note.trim(),
      date: new Date(date).toISOString(),
    });
    setAmount("");
    setNote("");
    toast.success(type === "income" ? "Income added" : "Expense logged");
    onClose?.();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100]"
            style={{ background: "rgba(7,8,15,0.7)", backdropFilter: "blur(8px)" }}
            onClick={onClose}
            data-testid="add-transaction-overlay"
          />
          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-[min(560px,calc(100vw-32px))] max-h-[90vh] overflow-y-auto thin-scroll glass-strong rounded-3xl p-7"
            data-testid="add-transaction-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif tracking-tight" style={{ fontSize: "1.7rem", color: "#F5F2EA", fontWeight: 500 }}>
                  Add transaction
                </h3>
                <p className="text-sm mt-1" style={{ color: "#7A7A83" }}>
                  Log income or an expense
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/5 transition-colors"
                data-testid="close-dialog-button"
                aria-label="Close"
              >
                <X size={16} color="#B9B7AF" />
              </button>
            </div>

            <div className={`seg ${type} mt-5`} data-testid="type-selector">
              <button type="button" className={type === "expense" ? "active" : ""} onClick={() => switchType("expense")} data-testid="type-expense-button">Expense</button>
              <button type="button" className={type === "income" ? "active" : ""} onClick={() => switchType("income")} data-testid="type-income-button">Income</button>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <div className="label mb-1">Amount (₹)</div>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif" style={{ fontSize: "2rem", color: "#7A7A83" }}>₹</span>
                  <input
                    type="number"
                    step="1"
                    min="0"
                    placeholder="0"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="line-input tabular font-serif"
                    style={{ fontSize: "2rem", padding: "0.2rem 0", color: "#F5F2EA" }}
                    data-testid="amount-input"
                    autoFocus
                    required
                  />
                </div>
              </div>

              <div>
                <div className="label mb-1">Date</div>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="line-input"
                  data-testid="date-input"
                  required
                />
              </div>
            </div>

            <div className="mt-6">
              <div className="label mb-2">Category</div>
              <div className="flex flex-wrap gap-2" data-testid="category-grid">
                {categories.map((c) => {
                  const selected = c.id === category;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setCategory(c.id)}
                      data-testid={`category-${c.id}`}
                      className="btn-pill"
                      style={
                        selected
                          ? { background: c.color, color: "#0A0B14", borderColor: c.color, boxShadow: `0 6px 18px ${c.color}55` }
                          : { background: "rgba(255,255,255,0.03)", color: "#F5F2EA", borderColor: "rgba(255,255,255,0.10)" }
                      }
                    >
                      <span className="dot" style={{ background: selected ? "rgba(10,11,20,0.7)" : c.color }} />
                      {c.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-6">
              <div className="label mb-1">Note</div>
              <input
                type="text"
                placeholder="e.g. Zomato dinner, Ola to office…"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="line-input"
                data-testid="note-input"
                maxLength={80}
              />
            </div>

            <div className="mt-7 flex items-center justify-end gap-2">
              <button type="button" onClick={onClose} className="btn-pill btn-ghost" data-testid="cancel-dialog-button">Cancel</button>
              <button type="submit" className="btn-pill btn-primary" data-testid="submit-transaction-button">
                <Plus size={15} />
                Save
              </button>
            </div>
          </motion.form>
        </>
      )}
    </AnimatePresence>
  );
}
