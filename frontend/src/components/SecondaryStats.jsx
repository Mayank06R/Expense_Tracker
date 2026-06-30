import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { useTransactions } from "../lib/store";
import { getCategory } from "../lib/categories";
import { formatINR } from "../lib/format";
import StatCard from "./StatCard";

export function DailyAverageCard() {
  const { stats } = useTransactions();
  const delta = stats.dailyDelta * 100;
  const lower = delta < 0;
  return (
    <StatCard
      label="Daily Average"
      accent="#2DD4BF"
      testId="daily-average-card"
      delay={0.3}
      hint="vs last month"
      badge={
        <span
          className={`chip ${lower ? "chip-live" : "chip-warn"}`}
          data-testid="daily-delta-chip"
        >
          {lower ? <ArrowDownRight size={12} /> : <ArrowUpRight size={12} />}
          {delta >= 0 ? "+" : ""}
          {delta.toFixed(0)}%
        </span>
      }
    >
      <div
        className="font-serif tabular"
        style={{ fontSize: "2rem", color: "#F5F2EA", fontWeight: 500 }}
        data-testid="daily-avg-amount"
      >
        {formatINR(stats.dailyAvg)}
      </div>
    </StatCard>
  );
}

export function LargestTransactionCard() {
  const { stats } = useTransactions();
  const tx = stats.largest;
  const cat = tx ? getCategory(tx.category) : null;
  return (
    <StatCard
      label="Largest Transaction"
      accent="#A78BFF"
      testId="largest-transaction-card"
      delay={0.35}
      hint={tx ? tx.note || cat.label : "Nothing yet this month"}
    >
      <div
        className="font-serif tabular"
        style={{ fontSize: "2rem", color: "#F5F2EA", fontWeight: 500 }}
        data-testid="largest-tx-amount"
      >
        {tx ? formatINR(tx.amount) : "₹0"}
      </div>
      {tx && cat && (
        <div className="mt-2 inline-flex items-center gap-1.5 text-xs" style={{ color: cat.color, fontWeight: 600 }}>
          <span className="dot" style={{ background: cat.color }} />
          {cat.label}
        </div>
      )}
    </StatCard>
  );
}
