import { motion, AnimatePresence } from "framer-motion";
import { Trash2, ArrowUpRight, ArrowDownRight, Inbox } from "lucide-react";
import { useTransactions } from "../lib/store";
import { getCategory } from "../lib/categories";
import { formatCurrency, shortDate } from "../lib/format";

export default function TransactionList() {
  const { transactions, removeTransaction } = useTransactions();
  const sorted = [...transactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="glass rounded-[28px] p-7 md:p-8"
      data-testid="transaction-list-card"
    >
      <div className="flex items-center justify-between">
        <h3
          className="font-serif tracking-tight"
          style={{ fontSize: "1.7rem", color: "#1A1A18", fontWeight: 500 }}
        >
          Recent activity
        </h3>
        <span className="chip" data-testid="transaction-count">
          {sorted.length} {sorted.length === 1 ? "entry" : "entries"}
        </span>
      </div>

      <div className="mt-5 thin-scroll" style={{ maxHeight: 460, overflowY: "auto" }}>
        {sorted.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-16 text-center"
            data-testid="empty-state"
          >
            <Inbox size={26} color="#8F8F8A" />
            <p className="mt-3 font-serif" style={{ color: "#5E5E5A", fontSize: "1.2rem" }}>
              No moments yet
            </p>
            <p className="text-sm mt-1" style={{ color: "#8F8F8A" }}>
              Add your first transaction to bring the aura to life.
            </p>
          </div>
        ) : (
          <ul className="space-y-1" data-testid="transaction-list">
            <AnimatePresence initial={false}>
              {sorted.map((t) => {
                const cat = getCategory(t.category);
                const isIncome = t.type === "income";
                return (
                  <motion.li
                    key={t.id}
                    layout
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="group flex items-center gap-4 py-3 px-2 rounded-2xl hover:bg-black/[0.025] transition-colors"
                    data-testid={`transaction-${t.id}`}
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                      style={{
                        background: `${cat.color}22`,
                        color: cat.color,
                      }}
                    >
                      {isIncome ? (
                        <ArrowUpRight size={16} />
                      ) : (
                        <ArrowDownRight size={16} />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          className="font-sans truncate"
                          style={{ color: "#1A1A18", fontWeight: 600, fontSize: "0.95rem" }}
                        >
                          {t.note || cat.label}
                        </span>
                      </div>
                      <div
                        className="text-xs mt-0.5"
                        style={{ color: "#8F8F8A", letterSpacing: "0.02em" }}
                      >
                        <span style={{ color: cat.color, fontWeight: 600 }}>{cat.label}</span>
                        <span className="mx-1.5">·</span>
                        {shortDate(t.date)}
                      </div>
                    </div>

                    <div
                      className="font-serif tabular shrink-0"
                      style={{
                        fontSize: "1.15rem",
                        color: isIncome ? "#4C7A5D" : "#A25F56",
                        fontWeight: 500,
                      }}
                      data-testid={`transaction-amount-${t.id}`}
                    >
                      {isIncome ? "+" : "−"}
                      {formatCurrency(t.amount).replace("-", "")}
                    </div>

                    <button
                      onClick={() => removeTransaction(t.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full hover:bg-[#A25F56]/10"
                      data-testid={`delete-transaction-${t.id}`}
                      aria-label="Delete transaction"
                    >
                      <Trash2 size={15} color="#A25F56" />
                    </button>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ul>
        )}
      </div>
    </motion.section>
  );
}
