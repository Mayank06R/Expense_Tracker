import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { AlertTriangle, ShieldCheck } from "lucide-react";
import { useTransactions } from "../lib/store";
import { getCategory } from "../lib/categories";
import { formatINR } from "../lib/format";

export default function MTDBudgetCard() {
  const { stats } = useTransactions();
  const { monthExpense, totalBudget, overBudget } = stats;
  const usedPct = totalBudget > 0 ? (monthExpense / totalBudget) * 100 : 0;
  const remaining = Math.max(0, totalBudget - monthExpense);
  const isOver = monthExpense > totalBudget;

  const fillRef = useRef(null);
  useEffect(() => {
    if (!fillRef.current) return;
    gsap.to(fillRef.current, {
      width: `${Math.min(100, usedPct)}%`,
      duration: 1.4,
      ease: "power3.out",
    });
  }, [usedPct]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="glass card-hover rounded-3xl p-7 lg:col-span-2 relative overflow-hidden"
      data-testid="mtd-budget-card"
    >
      <span
        className="absolute -top-16 -right-16 w-56 h-56 rounded-full blur-3xl pointer-events-none"
        style={{
          background: isOver ? "#FF5C5C" : "#F4C95D",
          opacity: 0.18,
        }}
      />
      <div className="flex items-start justify-between relative">
        <div>
          <span className="label">Month-to-Date Spend</span>
          <div className="mt-2 flex items-baseline gap-2 flex-wrap">
            <span
              className="font-serif tabular"
              style={{ fontSize: "2.6rem", color: "#F5F2EA", fontWeight: 500, lineHeight: 1 }}
              data-testid="mtd-spent-amount"
            >
              {formatINR(monthExpense)}
            </span>
            <span className="font-sans" style={{ color: "#7A7A83", fontSize: "1rem" }}>
              / {formatINR(totalBudget)}
            </span>
          </div>
        </div>
        <span
          className={`chip ${isOver ? "chip-warn" : "chip-gold"}`}
          data-testid="mtd-percent-chip"
        >
          {usedPct.toFixed(1)}% used
        </span>
      </div>

      <div className="progress-track mt-5">
        <div
          ref={fillRef}
          className={`progress-fill ${isOver ? "over" : usedPct >= 90 ? "warn" : ""}`}
          style={{ width: "0%" }}
          data-testid="mtd-progress-fill"
        />
      </div>

      <div className="mt-4 flex items-center justify-between text-xs" style={{ color: "#B9B7AF" }}>
        <span data-testid="mtd-remaining">{formatINR(remaining)} remaining</span>
        <span>{formatINR(totalBudget)} total budget</span>
      </div>

      {overBudget.length > 0 ? (
        <div
          className="mt-5 flex items-start gap-2 p-3 rounded-2xl"
          style={{
            background: "rgba(255,92,92,0.08)",
            border: "1px solid rgba(255,92,92,0.18)",
          }}
          data-testid="mtd-over-budget-alert"
        >
          <AlertTriangle size={15} color="#FF5C5C" className="mt-0.5 shrink-0" />
          <div className="text-sm" style={{ color: "#FFB4B4" }}>
            <span style={{ color: "#FF5C5C", fontWeight: 700 }}>{overBudget.length}</span>{" "}
            categor{overBudget.length === 1 ? "y" : "ies"} over budget:{" "}
            <span style={{ color: "#F5F2EA", fontWeight: 600 }}>
              {overBudget
                .sort((a, b) => b.ratio - a.ratio)
                .map((o) => getCategory(o.cat).label)
                .join(", ")}
            </span>
          </div>
        </div>
      ) : (
        <div
          className="mt-5 flex items-center gap-2 p-3 rounded-2xl"
          style={{
            background: "rgba(16,185,129,0.08)",
            border: "1px solid rgba(16,185,129,0.18)",
          }}
        >
          <ShieldCheck size={15} color="#10B981" />
          <span className="text-sm" style={{ color: "#BAEFD7" }}>
            All categories within budget. Stay the course.
          </span>
        </div>
      )}
    </motion.section>
  );
}
