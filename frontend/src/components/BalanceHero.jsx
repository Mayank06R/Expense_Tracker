import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { useTransactions } from "../lib/store";
import { formatCurrency } from "../lib/format";

export default function BalanceHero() {
  const { stats } = useTransactions();
  const { income, expense, balance } = stats;
  const positive = balance >= 0;

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="glass rounded-[28px] p-8 md:p-10"
      data-testid="balance-hero"
    >
      <div className="flex items-center justify-between">
        <span className="label">Available Balance</span>
        <span
          className="chip"
          style={{
            background: positive ? "rgba(76,122,93,0.10)" : "rgba(162,95,86,0.10)",
            color: positive ? "#4C7A5D" : "#A25F56",
            borderColor: positive ? "rgba(76,122,93,0.18)" : "rgba(162,95,86,0.18)",
          }}
          data-testid="balance-status-chip"
        >
          <span
            className="dot"
            style={{ background: positive ? "#4C7A5D" : "#A25F56" }}
          />
          {positive ? "Healthy aura" : "Spending alert"}
        </span>
      </div>

      <div className="mt-5 flex items-baseline gap-3">
        <h1
          className="font-serif tracking-tight tabular"
          style={{
            fontSize: "clamp(3rem, 7vw, 5.5rem)",
            color: positive ? "#1A1A18" : "#A25F56",
            lineHeight: 1,
            fontWeight: 500,
          }}
          data-testid="balance-amount"
        >
          {formatCurrency(balance)}
        </h1>
        <span className="font-sans text-sm" style={{ color: "#8F8F8A" }}>
          USD
        </span>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4">
        <div
          className="rounded-2xl p-5 hairline"
          style={{ background: "rgba(76,122,93,0.06)" }}
          data-testid="income-card"
        >
          <div className="flex items-center justify-between">
            <span className="label">Income</span>
            <ArrowUpRight size={16} color="#4C7A5D" />
          </div>
          <div
            className="mt-2 font-serif tabular"
            style={{ fontSize: "1.9rem", color: "#4C7A5D", fontWeight: 500 }}
            data-testid="income-amount"
          >
            {formatCurrency(income)}
          </div>
        </div>
        <div
          className="rounded-2xl p-5 hairline"
          style={{ background: "rgba(162,95,86,0.06)" }}
          data-testid="expense-card"
        >
          <div className="flex items-center justify-between">
            <span className="label">Expense</span>
            <ArrowDownRight size={16} color="#A25F56" />
          </div>
          <div
            className="mt-2 font-serif tabular"
            style={{ fontSize: "1.9rem", color: "#A25F56", fontWeight: 500 }}
            data-testid="expense-amount"
          >
            {formatCurrency(expense)}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
