import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useTransactions } from "../lib/store";
import { EXPENSE_CATEGORIES, getCategory } from "../lib/categories";
import { formatINR } from "../lib/format";

function BudgetRow({ cat, spent, budget, delay }) {
  const ratio = budget > 0 ? spent / budget : 0;
  const over = ratio > 1;
  const atRisk = ratio >= 0.9 && ratio <= 1;
  const fillRef = useRef(null);

  useEffect(() => {
    if (!fillRef.current) return;
    const pct = Math.min(100, ratio * 100);
    gsap.to(fillRef.current, {
      width: `${pct}%`,
      duration: 1.1,
      delay,
      ease: "power3.out",
    });
  }, [ratio, delay]);

  const status = over ? "Over" : atRisk ? "At risk" : null;

  return (
    <div className="py-3" data-testid={`budget-row-${cat.id}`}>
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <span className="dot" style={{ background: cat.color }} />
          <span style={{ color: "#F5F2EA", fontWeight: 600 }}>{cat.label}</span>
          {status && (
            <span
              className={`chip ${over ? "chip-warn" : "chip-gold"}`}
              style={{ fontSize: "0.62rem", padding: "0.18rem 0.5rem" }}
              data-testid={`budget-status-${cat.id}`}
            >
              {status}
            </span>
          )}
        </div>
        <div className="tabular text-xs" style={{ color: "#B9B7AF" }}>
          <span style={{ color: over ? "#FF5C5C" : "#F5F2EA", fontWeight: 600 }}>
            {formatINR(spent)}
          </span>{" "}
          <span style={{ color: "#7A7A83" }}>/ {formatINR(budget)}</span>
        </div>
      </div>
      <div className="progress-track mt-2" style={{ height: 6 }}>
        <div
          ref={fillRef}
          className={`progress-fill ${over ? "over" : atRisk ? "warn" : "healthy"}`}
          style={{ width: "0%" }}
        />
      </div>
    </div>
  );
}

export default function BudgetProgressCard() {
  const { stats, budgets } = useTransactions();
  const rows = EXPENSE_CATEGORIES
    .filter((c) => (budgets[c.id] || 0) > 0 || (stats.catTotals.get(c.id) || 0) > 0)
    .map((c) => ({
      cat: c,
      spent: stats.catTotals.get(c.id) || 0,
      budget: budgets[c.id] || 0,
    }))
    .sort((a, b) => {
      const ar = a.budget > 0 ? a.spent / a.budget : 0;
      const br = b.budget > 0 ? b.spent / b.budget : 0;
      return br - ar;
    });

  const overCount = stats.overBudget.length;

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="glass card-hover rounded-3xl p-7 relative overflow-hidden"
      data-testid="budget-progress-card"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-serif tracking-tight" style={{ fontSize: "1.5rem", color: "#F5F2EA", fontWeight: 500 }}>
            Budget Progress
          </h3>
          <p className="text-sm mt-1" style={{ color: "#7A7A83" }}>
            Per-category burn rate this month
          </p>
        </div>
        {overCount > 0 && (
          <span className="chip chip-warn" data-testid="budget-over-count">
            {overCount} over budget
          </span>
        )}
      </div>

      <div className="mt-4 thin-scroll" style={{ maxHeight: 440, overflowY: "auto" }}>
        {rows.map((r, i) => (
          <BudgetRow
            key={r.cat.id}
            cat={r.cat}
            spent={r.spent}
            budget={r.budget}
            delay={i * 0.05}
          />
        ))}
      </div>
    </motion.section>
  );
}
