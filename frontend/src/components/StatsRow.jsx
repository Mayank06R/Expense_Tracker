import { TrendingDown, TrendingUp } from "lucide-react";
import { useTransactions } from "../lib/store";
import StatCard from "./StatCard";
import CountUp from "./CountUp";
import { formatINR } from "../lib/format";

export function TotalSpentCard() {
  const { stats } = useTransactions();
  return (
    <StatCard
      label="Total Spent"
      accent="#FF8B3D"
      testId="total-spent-card"
      delay={0.1}
      hint={`${stats.monthCount} transactions this month`}
    >
      <CountUp value={stats.monthExpense} className="font-serif" />
    </StatCard>
  );
}

export function AvailableBalanceCard() {
  const { stats, monthlyIncome } = useTransactions();
  const pct = monthlyIncome > 0 ? (stats.available / monthlyIncome) * 100 : 0;
  const positive = stats.available >= 0;
  return (
    <StatCard
      label="Available Balance"
      accent={positive ? "#2DD4BF" : "#FF5C5C"}
      testId="available-balance-card"
      delay={0.15}
      hint={`${pct.toFixed(1)}% of income remaining`}
    >
      <CountUp
        value={stats.available}
        className="font-serif"
        prefix={positive ? "₹" : "−₹"}
      />
    </StatCard>
  );
}

export function SavingsRateCard() {
  const { stats } = useTransactions();
  const rate = stats.savingsRate * 100;
  const healthy = rate >= 20;
  const ok = rate >= 0 && rate < 20;
  return (
    <StatCard
      label="Savings Rate"
      accent={healthy ? "#10B981" : ok ? "#F4C95D" : "#FF5C5C"}
      testId="savings-rate-card"
      delay={0.2}
      badge={
        <span
          className={`chip ${healthy ? "chip-live" : rate < 0 ? "chip-warn" : "chip-gold"}`}
          data-testid="savings-rate-status"
        >
          {healthy ? (
            <>
              <TrendingUp size={12} /> Healthy
            </>
          ) : ok ? (
            <>
              <TrendingDown size={12} /> Low
            </>
          ) : (
            <>
              <TrendingDown size={12} /> Negative
            </>
          )}
        </span>
      }
      hint="Target: 20%+"
    >
      <div
        className="font-serif tabular"
        style={{ fontSize: "2.2rem", color: healthy ? "#10B981" : ok ? "#F4C95D" : "#FF5C5C", fontWeight: 500 }}
        data-testid="savings-rate-value"
      >
        {rate.toFixed(1)}%
      </div>
    </StatCard>
  );
}
