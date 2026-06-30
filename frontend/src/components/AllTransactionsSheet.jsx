import { motion, AnimatePresence } from "framer-motion";
import { Trash2, X, ArrowDownRight, ArrowUpRight } from "lucide-react";
import { useTransactions } from "../lib/store";
import { getCategory } from "../lib/categories";
import { formatINR, formatDate } from "../lib/format";
import { sameMonth } from "../lib/monthly";

export default function AllTransactionsSheet({ open, onClose }) {
  const { transactions, removeTransaction, monthRef } = useTransactions();
  const all = [...transactions]
    .filter((t) => sameMonth(t.date, monthRef))
    .sort((a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date));

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
            data-testid="sheet-overlay"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-0 top-0 bottom-0 z-[101] w-[min(540px,100vw)] glass-strong p-7 overflow-y-auto thin-scroll"
            style={{ borderLeft: "1px solid rgba(255,255,255,0.08)" }}
            data-testid="all-transactions-sheet"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif tracking-tight" style={{ fontSize: "1.7rem", color: "#F5F2EA", fontWeight: 500 }}>
                  All Transactions
                </h3>
                <p className="text-sm mt-1" style={{ color: "#7A7A83" }}>
                  {all.length} this month
                </p>
              </div>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-white/5" data-testid="close-sheet-button" aria-label="Close">
                <X size={16} color="#B9B7AF" />
              </button>
            </div>

            <ul className="mt-5 space-y-1" data-testid="all-transactions-list">
              <AnimatePresence initial={false}>
                {all.map((t) => {
                  const cat = getCategory(t.category);
                  const isIncome = t.type === "income";
                  return (
                    <motion.li
                      key={t.id}
                      layout
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 8, height: 0 }}
                      transition={{ duration: 0.22 }}
                      className="group flex items-center gap-3 py-3 px-2 rounded-2xl hover:bg-white/[0.03]"
                      data-testid={`sheet-transaction-${t.id}`}
                    >
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: `${cat.color}1A`, color: cat.color, border: `1px solid ${cat.color}33` }}
                      >
                        {isIncome ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="truncate" style={{ color: "#F5F2EA", fontWeight: 600, fontSize: "0.95rem" }}>
                          {t.note || cat.label}
                        </div>
                        <div className="text-xs mt-0.5" style={{ color: "#7A7A83" }}>
                          <span style={{ color: cat.color, fontWeight: 600 }}>{cat.label}</span>
                          <span className="mx-1.5">·</span>
                          {formatDate(t.date)}
                        </div>
                      </div>
                      <div
                        className="font-serif tabular shrink-0"
                        style={{ fontSize: "1.05rem", color: isIncome ? "#10B981" : "#FF5C5C", fontWeight: 500 }}
                      >
                        {isIncome ? "+" : "−"}
                        {formatINR(t.amount)}
                      </div>
                      <button
                        onClick={() => removeTransaction(t.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full hover:bg-[#FF5C5C]/10"
                        data-testid={`sheet-delete-${t.id}`}
                        aria-label="Delete"
                      >
                        <Trash2 size={14} color="#FF5C5C" />
                      </button>
                    </motion.li>
                  );
                })}
              </AnimatePresence>
            </ul>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
