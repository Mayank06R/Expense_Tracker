import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { useTransactions } from "../lib/store";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "../lib/categories";

export default function AddTransactionForm({ onAdded }) {
  const { addTransaction } = useTransactions();
  const [type, setType] = useState("expense");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [category, setCategory] = useState("food");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));

  const categories = type === "expense" ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;

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
    toast.success(
      type === "income" ? "Income added to your aura" : "Expense logged"
    );
    onAdded?.();
  };

  return (
    <motion.form
      onSubmit={submit}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="glass rounded-[28px] p-7 md:p-8"
      data-testid="add-transaction-form"
    >
      <div className="flex items-center justify-between">
        <h3
          className="font-serif tracking-tight"
          style={{ fontSize: "1.7rem", color: "#1A1A18", fontWeight: 500 }}
        >
          Log a moment
        </h3>
        <div className={`seg ${type}`} data-testid="type-selector">
          <button
            type="button"
            className={type === "expense" ? "active" : ""}
            onClick={() => switchType("expense")}
            data-testid="type-expense-button"
          >
            Expense
          </button>
          <button
            type="button"
            className={type === "income" ? "active" : ""}
            onClick={() => switchType("income")}
            data-testid="type-income-button"
          >
            Income
          </button>
        </div>
      </div>

      <div className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <div className="label mb-1">Amount</div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif" style={{ fontSize: "2rem", color: "#5E5E5A" }}>
              $
            </span>
            <input
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="line-input tabular font-serif"
              style={{ fontSize: "2rem", padding: "0.2rem 0" }}
              data-testid="amount-input"
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
                    ? {
                        background: c.color,
                        color: "#F9F9F7",
                        borderColor: c.color,
                      }
                    : {
                        background: "transparent",
                        color: "#1A1A18",
                        borderColor: "rgba(28,28,26,0.12)",
                      }
                }
              >
                <span
                  className="dot"
                  style={{
                    background: selected ? "rgba(255,255,255,0.85)" : c.color,
                  }}
                />
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
          placeholder="Coffee with a friend…"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="line-input"
          data-testid="note-input"
          maxLength={80}
        />
      </div>

      <div className="mt-7 flex items-center justify-end">
        <button
          type="submit"
          className="btn-pill btn-primary"
          data-testid="submit-transaction-button"
        >
          <Plus size={16} />
          Add transaction
        </button>
      </div>
    </motion.form>
  );
}
