import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useTransactions } from "../lib/store";
import { buildDailySeries } from "../lib/monthly";
import { formatINR } from "../lib/format";

export default function DailySpendingChart() {
  const { transactions, monthRef } = useTransactions();
  const series = buildDailySeries(transactions, monthRef);
  const today = monthRef.getDate();
  const max = Math.max(1, ...series.map((s) => s.expense));

  const avg = (() => {
    const expenses = series.slice(0, today).map((s) => s.expense);
    return expenses.length
      ? expenses.reduce((a, b) => a + b, 0) / expenses.length
      : 0;
  })();

  const daysLogged = series
    .slice(0, today)
    .filter((s) => s.expense > 0).length;

  const barsRef = useRef(null);

  // ✅ ESLint fix
  const currentMonth = monthRef.getMonth();

  useEffect(() => {
    if (!barsRef.current) return;

    const bars = barsRef.current.querySelectorAll("[data-bar]");

    gsap.fromTo(
      bars,
      { scaleY: 0, transformOrigin: "bottom" },
      {
        scaleY: 1,
        duration: 1.0,
        ease: "power3.out",
        stagger: {
          each: 0.025,
          from: "start",
        },
      }
    );
  }, [series.length, currentMonth]);

  // Build Y-axis ticks
  const ticks = 5;
  const niceMax = Math.ceil(max / 1000) * 1000;

  const tickValues = Array.from({ length: ticks + 1 }, (_, i) =>
    Math.round((niceMax * (ticks - i)) / ticks)
  );

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.7,
        delay: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="glass card-hover rounded-3xl p-7 relative overflow-hidden"
      data-testid="daily-spending-chart"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3
            className="font-serif tracking-tight"
            style={{
              fontSize: "1.5rem",
              color: "#F5F2EA",
              fontWeight: 500,
            }}
          >
            Daily Spending
          </h3>

          <p
            className="text-sm mt-1"
            style={{ color: "#7A7A83" }}
          >
            {monthRef.toLocaleDateString("en-IN", {
              month: "long",
              year: "numeric",
            })}{" "}
            — amount per day
          </p>
        </div>

        <span className="chip">
          <span
            className="dot"
            style={{ background: "#FF8B3D" }}
          />
          {daysLogged} days logged
        </span>
      </div>

      <div className="mt-6 flex gap-3" style={{ height: 220 }}>
        {/* Y axis */}
        <div
          className="flex flex-col justify-between font-mono text-[10px] pr-2"
          style={{ color: "#6B6B73" }}
        >
          {tickValues.map((v) => (
            <span key={v} className="tabular">
              ₹{v >= 1000 ? `${Math.round(v / 1000)}k` : v}
            </span>
          ))}
        </div>

        {/* Bars */}
        <div ref={barsRef} className="flex-1 relative">
          {/* Horizontal grid */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
            {tickValues.map((_, i) => (
              <div
                key={i}
                style={{
                  borderTop:
                    i === tickValues.length - 1
                      ? "none"
                      : "1px dashed rgba(255,255,255,0.05)",
                  height: 0,
                }}
              />
            ))}
          </div>

          {/* Avg line */}
          {avg > 0 && (
            <div
              className="absolute left-0 right-0 flex items-center"
              style={{
                bottom: `${(avg / niceMax) * 100}%`,
                height: 0,
              }}
            >
              <div
                className="flex-1"
                style={{
                  borderTop:
                    "1px dashed rgba(244,201,93,0.45)",
                }}
              />

              <span
                className="ml-2 text-[10px] font-mono"
                style={{ color: "#F4C95D" }}
              >
                Avg {formatINR(avg)}
              </span>
            </div>
          )}

          <div className="absolute inset-0 flex items-end gap-[3px] px-0.5">
            {series.map((d) => {
              const inFuture = d.day > today;
              const h = inFuture
                ? 0
                : Math.max(2, (d.expense / niceMax) * 100);

              return (
                <div
                  key={d.day}
                  data-bar
                  className="flex-1 relative group"
                  style={{
                    height: `${h}%`,
                    background: inFuture
                      ? "rgba(255,255,255,0.03)"
                      : d.expense > avg * 1.5
                      ? "linear-gradient(180deg,#FF5C5C 0%,#FF8B3D 100%)"
                      : "linear-gradient(180deg,#FF8B3D 0%,#F4C95D 100%)",
                    borderRadius: "4px 4px 1px 1px",
                    opacity: inFuture ? 0.5 : 1,
                    boxShadow: inFuture
                      ? "none"
                      : "0 0 12px rgba(255,139,61,0.25)",
                  }}
                  data-testid={`daily-bar-${d.day}`}
                >
                  <div
                    className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] font-mono px-2 py-1 rounded-md"
                    style={{
                      background: "rgba(0,0,0,0.7)",
                      color: "#F5F2EA",
                      border:
                        "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    {d.day} · {formatINR(d.expense)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* X axis labels */}
      <div
        className="mt-3 flex justify-between text-[10px] font-mono pl-9"
        style={{ color: "#6B6B73" }}
      >
        {[1, 5, 9, 13, 17, 21, 25, 29].map((d) => (
          <span key={d} className="tabular">
            {d}
          </span>
        ))}
      </div>
    </motion.section>
  );
}
