import { motion } from "framer-motion";

export default function StatCard({
  label,
  children,
  accent,
  badge,
  hint,
  testId,
  delay = 0,
  className = "",
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`glass card-hover rounded-3xl p-6 relative overflow-hidden ${className}`}
      data-testid={testId}
    >
      {accent && (
        <span
          className="absolute -top-12 -right-10 w-44 h-44 rounded-full blur-3xl pointer-events-none"
          style={{ background: accent, opacity: 0.18 }}
        />
      )}
      <div className="flex items-center justify-between relative">
        <span className="label">{label}</span>
        {badge}
      </div>
      <div className="mt-3 relative">{children}</div>
      {hint && (
        <div className="mt-3 text-xs relative" style={{ color: "#7A7A83" }}>
          {hint}
        </div>
      )}
    </motion.div>
  );
}
