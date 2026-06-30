import { useMemo } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useTransactions } from "../lib/store";
import { getCategory } from "../lib/categories";
import { formatCurrency } from "../lib/format";

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const p = payload[0];
  return (
    <div className="glass rounded-xl px-3 py-2 text-xs" style={{ color: "#1A1A18" }}>
      <div className="font-semibold">{p.payload.label}</div>
      <div className="tabular" style={{ color: "#5E5E5A" }}>
        {formatCurrency(p.value)} · {(p.payload.pct * 100).toFixed(1)}%
      </div>
    </div>
  );
}

export default function CategoryDonut() {
  const { transactions, stats } = useTransactions();

  const data = useMemo(() => {
    const map = new Map();
    for (const t of transactions) {
      if (t.type !== "expense") continue;
      map.set(t.category, (map.get(t.category) || 0) + Number(t.amount));
    }
    const total = Array.from(map.values()).reduce((s, v) => s + v, 0) || 1;
    return Array.from(map.entries())
      .map(([id, value]) => {
        const cat = getCategory(id);
        return { id, label: cat.label, color: cat.color, value, pct: value / total };
      })
      .sort((a, b) => b.value - a.value);
  }, [transactions]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="glass rounded-[28px] p-7"
      data-testid="category-donut-card"
    >
      <div className="flex items-center justify-between">
        <div>
          <span className="label">Breakdown</span>
          <h3
            className="font-serif tracking-tight mt-1"
            style={{ fontSize: "1.5rem", color: "#1A1A18", fontWeight: 500 }}
          >
            Where it flows
          </h3>
        </div>
      </div>

      {data.length === 0 ? (
        <div className="py-10 text-center text-sm" style={{ color: "#8F8F8A" }} data-testid="donut-empty">
          No expenses yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center mt-4">
          <div style={{ width: "100%", height: 200 }} data-testid="donut-chart">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="label"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={2}
                  stroke="none"
                >
                  {data.map((d) => (
                    <Cell key={d.id} fill={d.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <ul className="space-y-2" data-testid="donut-legend">
            {data.slice(0, 6).map((d) => (
              <li key={d.id} className="flex items-center gap-2 text-sm">
                <span className="dot" style={{ background: d.color }} />
                <span style={{ color: "#1A1A18", fontWeight: 600 }}>{d.label}</span>
                <span className="ml-auto tabular" style={{ color: "#5E5E5A" }}>
                  {(d.pct * 100).toFixed(0)}%
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="divider my-5" />
      <div className="flex items-center justify-between">
        <span className="label">Total expenses</span>
        <span className="font-serif tabular" style={{ fontSize: "1.4rem", color: "#A25F56", fontWeight: 500 }}>
          {formatCurrency(stats.expense)}
        </span>
      </div>
    </motion.section>
  );
}
