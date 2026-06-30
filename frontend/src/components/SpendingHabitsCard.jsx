import { motion } from "framer-motion";
import { useTransactions } from "../lib/store";
import { getCategory } from "../lib/categories";
import { formatINR } from "../lib/format";

const MEDALS = ["🥇", "🥈", "🥉"];

export default function SpendingHabitsCard() {
  const { stats } = useTransactions();
  const total = stats.monthExpense || 1;
  const top = Array.from(stats.catTotals.entries())
    .map(([id, value]) => ({ ...getCategory(id), value, pct: value / total }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 3);

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="glass card-hover rounded-3xl p-7 relative overflow-hidden"
      data-testid="spending-habits-card"
    >
      <div className="flex items-baseline justify-between">
        <div>
          <h3 className="font-serif tracking-tight" style={{ fontSize: "1.7rem", color: "#F5F2EA", fontWeight: 500 }}>
            Spending Habits Summary
          </h3>
          <p className="text-sm mt-1" style={{ color: "#7A7A83" }}>
            Where your money is going this month
          </p>
        </div>
      </div>

      {top.length === 0 ? (
        <div className="py-10 text-center text-sm" style={{ color: "#7A7A83" }} data-testid="habits-empty">
          No expenses logged this month.
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {top.map((c, i) => (
            <div
              key={c.id}
              className="rounded-2xl p-5 relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${c.color}1A 0%, transparent 70%)`,
                border: `1px solid ${c.color}33`,
              }}
              data-testid={`habit-rank-${i + 1}`}
            >
              <div
                className="absolute -top-6 -right-6 w-24 h-24 rounded-full blur-2xl pointer-events-none"
                style={{ background: c.color, opacity: 0.2 }}
              />
              <div className="flex items-center gap-3 relative">
                <span
                  className="text-3xl"
                  style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.4))" }}
                  aria-label={`Rank ${i + 1}`}
                >
                  {MEDALS[i]}
                </span>
                <div>
                  <div className="font-sans" style={{ color: c.color, fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.02em" }}>
                    {c.label}
                  </div>
                  <div
                    className="font-serif tabular mt-1"
                    style={{ fontSize: "1.6rem", color: "#F5F2EA", fontWeight: 500, lineHeight: 1 }}
                    data-testid={`habit-amount-${i + 1}`}
                  >
                    {formatINR(c.value)}
                  </div>
                </div>
              </div>
              <div className="mt-3 text-xs" style={{ color: "#B9B7AF" }}>
                <span style={{ color: c.color, fontWeight: 600 }}>{(c.pct * 100).toFixed(1)}%</span> of spend
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.section>
  );
}
