import { motion } from "framer-motion";
import { monthLabel } from "../lib/format";

export default function DashboardHero() {
  const month = monthLabel(new Date());
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-7"
      data-testid="dashboard-hero"
    >
      <div>
        <h1
          className="font-serif tracking-tight"
          style={{
            fontSize: "clamp(2.4rem, 5.2vw, 4rem)",
            color: "#F5F2EA",
            fontWeight: 500,
            lineHeight: 1.04,
          }}
          data-testid="page-title"
        >
          Spending <span className="gradient-text">Dashboard</span>
        </h1>
        <p className="mt-2 text-[15px]" style={{ color: "#B9B7AF" }}>
          <span data-testid="hero-month">{month}</span> — real-time overview of your financial health.
        </p>
      </div>
      <div className="chip chip-live" data-testid="live-indicator">
        <span className="dot dot-pulse" style={{ background: "#10B981" }} />
        Live
      </div>
    </motion.section>
  );
}
