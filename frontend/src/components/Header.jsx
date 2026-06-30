import { Sparkles, Download, RotateCcw } from "lucide-react";
import { useTransactions } from "../lib/store";
import { getCategory } from "../lib/categories";

function toCSV(transactions) {
  const head = ["id", "date", "type", "category", "amount", "note"];
  const rows = transactions.map((t) => [
    t.id,
    t.date,
    t.type,
    getCategory(t.category).label,
    t.amount,
    (t.note || "").replace(/"/g, '""'),
  ]);
  const csv = [head, ...rows]
    .map((r) => r.map((v) => `"${v ?? ""}"`).join(","))
    .join("\n");
  return csv;
}

export default function Header() {
  const { transactions, resetDemo } = useTransactions();

  const exportCSV = () => {
    const blob = new Blob([toCSV(transactions)], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `aura-transactions-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <header
      className="flex items-center justify-between pt-8 pb-6"
      data-testid="app-header"
    >
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-2xl flex items-center justify-center"
          style={{ background: "#1A1A18", color: "#F9F9F7" }}
          data-testid="brand-mark"
        >
          <Sparkles size={18} strokeWidth={1.6} />
        </div>
        <div className="leading-tight">
          <div className="font-serif text-2xl tracking-tight" style={{ color: "#1A1A18" }}>
            Aura
          </div>
          <div className="text-[11px] uppercase tracking-[0.22em]" style={{ color: "#8F8F8A" }}>
            wealth · in motion
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          className="btn-pill btn-ghost"
          onClick={resetDemo}
          data-testid="reset-demo-button"
          title="Reset to demo data"
        >
          <RotateCcw size={14} />
          <span className="hidden sm:inline">Reset</span>
        </button>
        <button
          className="btn-pill btn-primary"
          onClick={exportCSV}
          data-testid="export-csv-button"
        >
          <Download size={14} />
          Export CSV
        </button>
      </div>
    </header>
  );
}
