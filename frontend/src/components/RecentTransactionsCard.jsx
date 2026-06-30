import { motion, AnimatePresence } from "framer-motion";
import { Trash2, ChevronRight } from "lucide-react";
import { useTransactions } from "../lib/store";
import { getCategory } from "../lib/categories";
import { formatINR, shortDate } from "../lib/format";
import { sameMonth } from "../lib/monthly";

export default function RecentTransactionsCard({ onViewAll }) {
  const { transactions, removeTransaction, monthRef } = useTransactions();
  const recent = transactions
    .filter((t) => t.type === "expense" && sameMonth(t.date, monthRef))
    .sort((a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date))
    .slice(0, 5);

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="glass card-hover rounded-3xl p-7 relative overflow-hidden"
      data-testid="recent-transactions-card"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-serif tracking-tight" style={{ fontSize: "1.5rem", color: "#F5F2EA", fontWeight: 500 }}>
            Recent Transactions
          </h3>
          <p className="text-sm mt-1" style={{ color: "#7A7A83" }}>
            Last 5 expenses this month
          </p>
        </div>
        <button
          className="btn-pill btn-ghost"
          onClick={onViewAll}
          data-testid="view-all-button"
        >
          View all <ChevronRight size={14} />
        </button>
      </div>

      {recent.length === 0 ? (
        <div className="py-10 text-center text-sm" style={{ color: "#7A7A83" }} data-testid="recent-empty">
          No expenses this month yet.
        </div>
      ) : (
        <ul className="mt-5 divide-y" style={{ borderColor: "rgba(255,255,255,0.05)" }} data-testid="recent-list">
          <AnimatePresence initial={false}>
            {recent.map((t) => {
              const cat = getCategory(t.category);
              return (
                <motion.li
                  key={t.id}
                  layout
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="group flex items-center gap-4 py-4"
                  data-testid={`recent-transaction-${t.id}`}
                  style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-sm font-bold"
                    style={{
                      background: `${cat.color}1F`,
                      color: cat.color,
                      border: `1px solid ${cat.color}33`,
                    }}
                  >
                    {(t.note || cat.label).slice(0, 1).toUpperCase()}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="font-sans truncate" style={{ color: "#F5F2EA", fontWeight: 600, fontSize: "0.97rem" }}>
                      {t.note || cat.label}
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: "#7A7A83" }}>
                      <span style={{ color: cat.color, fontWeight: 600 }}>{cat.label}</span>
                      <span className="mx-1.5">·</span>
                      {shortDate(t.date)}
                    </div>
                  </div>

                  <div
                    className="font-serif tabular shrink-0"
                    style={{ fontSize: "1.15rem", color: "#FF5C5C", fontWeight: 500 }}
                    data-testid={`recent-amount-${t.id}`}
                  >
                    −{formatINR(t.amount)}
                  </div>

                  <button
                    onClick={() => removeTransaction(t.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full hover:bg-[#FF5C5C]/10"
                    data-testid={`delete-recent-${t.id}`}
                    aria-label="Delete"
                  >
                    <Trash2 size={14} color="#FF5C5C" />
                  </button>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>
      )}
    </motion.section>
  );
}
