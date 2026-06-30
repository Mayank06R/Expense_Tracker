import { useState } from "react";
import { Pencil, Check, X } from "lucide-react";
import { toast } from "sonner";
import { useTransactions } from "../lib/store";
import StatCard from "./StatCard";
import CountUp from "./CountUp";

export default function MonthlyIncomeCard() {
  const { monthlyIncome, setMonthlyIncome } = useTransactions();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(String(monthlyIncome));

  const save = () => {
    const n = Number(draft);
    if (!Number.isFinite(n) || n < 0) {
      toast.error("Enter a valid monthly income");
      return;
    }
    setMonthlyIncome(n);
    setEditing(false);
    toast.success("Monthly income updated");
  };

  return (
    <StatCard
      label="Monthly Income"
      accent="#10B981"
      testId="monthly-income-card"
      delay={0.05}
      badge={
        !editing ? (
          <button
            className="p-1.5 rounded-full hover:bg-white/5 transition-colors"
            onClick={() => { setDraft(String(monthlyIncome)); setEditing(true); }}
            data-testid="edit-income-button"
            aria-label="Edit monthly income"
          >
            <Pencil size={13} color="#B9B7AF" />
          </button>
        ) : (
          <div className="flex gap-1">
            <button
              className="p-1.5 rounded-full hover:bg-white/5"
              onClick={() => setEditing(false)}
              data-testid="cancel-income-button"
              aria-label="Cancel"
            >
              <X size={13} color="#FF5C5C" />
            </button>
            <button
              className="p-1.5 rounded-full hover:bg-white/5"
              onClick={save}
              data-testid="save-income-button"
              aria-label="Save"
            >
              <Check size={13} color="#10B981" />
            </button>
          </div>
        )
      }
      hint={!editing ? "Tap ✏ to update" : "Press ✓ to save"}
    >
      {editing ? (
        <div className="flex items-baseline gap-1">
          <span className="font-serif" style={{ fontSize: "2rem", color: "#B9B7AF" }}>₹</span>
          <input
            type="number"
            min="0"
            step="1000"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") save(); if (e.key === "Escape") setEditing(false); }}
            className="line-input font-serif tabular"
            style={{ fontSize: "2rem", padding: 0, color: "#F5F2EA" }}
            autoFocus
            data-testid="income-input"
          />
        </div>
      ) : (
        <CountUp
          value={monthlyIncome}
          className="font-serif"
          // Big serif number
        />
      )}
    </StatCard>
  );
}
