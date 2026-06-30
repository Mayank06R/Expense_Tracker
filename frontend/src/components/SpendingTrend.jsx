import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useTransactions } from "../lib/store";
import { formatCurrency, shortDate } from "../lib/format";

function TipBox({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass rounded-xl px-3 py-2 text-xs" style={{ color: "#1A1A18" }}>
      <div className="font-semibold mb-1">{label}</div>
      {payload.map((p) => (
        <div key={p.dataKey} className="tabular flex items-center gap-2">
          <span className="dot" style={{ background: p.color }} />
          <span style={{ color: "#5E5E5A" }}>
            {p.dataKey}: {formatCurrency(p.value)}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function SpendingTrend() {
  const { transactions } = useTransactions();

  const data = useMemo(() => {
    // Build last 14 days bucketed series
    const days = 14;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const buckets = [];
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      buckets.push({ d, income: 0, expense: 0 });
    }
    const keyOf = (d) => d.toISOString().slice(0, 10);
    const idx = new Map(buckets.map((b, i) => [keyOf(b.d), i]));
    for (const t of transactions) {
      const k = new Date(t.date).toISOString().slice(0, 10);
      if (idx.has(k)) {
        const b = buckets[idx.get(k)];
        if (t.type === "income") b.income += Number(t.amount);
        else b.expense += Number(t.amount);
      }
    }
    return buckets.map((b) => ({
      date: shortDate(b.d.toISOString()),
      Income: Math.round(b.income * 100) / 100,
      Expense: Math.round(b.expense * 100) / 100,
    }));
  }, [transactions]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="glass rounded-[28px] p-7"
      data-testid="trend-chart-card"
    >
      <div className="flex items-center justify-between">
        <div>
          <span className="label">Last 14 days</span>
          <h3
            className="font-serif tracking-tight mt-1"
            style={{ fontSize: "1.5rem", color: "#1A1A18", fontWeight: 500 }}
          >
            Rhythm of money
          </h3>
        </div>
        <div className="flex items-center gap-3">
          <span className="chip" style={{ color: "#4C7A5D" }}>
            <span className="dot" style={{ background: "#4C7A5D" }} /> Income
          </span>
          <span className="chip" style={{ color: "#A25F56" }}>
            <span className="dot" style={{ background: "#A25F56" }} /> Expense
          </span>
        </div>
      </div>

      <div style={{ width: "100%", height: 240 }} className="mt-4" data-testid="trend-chart">
        <ResponsiveContainer>
          <AreaChart data={data} margin={{ top: 10, right: 6, left: -18, bottom: 0 }}>
            <defs>
              <linearGradient id="gIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4C7A5D" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#4C7A5D" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gExpense" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#A25F56" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#A25F56" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(28,28,26,0.05)" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: "#8F8F8A" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#8F8F8A" }}
              axisLine={false}
              tickLine={false}
              width={48}
            />
            <Tooltip content={<TipBox />} cursor={{ stroke: "rgba(28,28,26,0.12)" }} />
            <Area
              type="monotone"
              dataKey="Income"
              stroke="#4C7A5D"
              strokeWidth={2}
              fill="url(#gIncome)"
            />
            <Area
              type="monotone"
              dataKey="Expense"
              stroke="#A25F56"
              strokeWidth={2}
              fill="url(#gExpense)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.section>
  );
}
