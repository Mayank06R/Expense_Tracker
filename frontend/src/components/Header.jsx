import { Wallet, Download, RotateCcw, Plus } from "lucide-react";
import { useTransactions } from "../lib/store";
import { getCategory } from "../lib/categories";

function toCSV(transactions) {
  const head = ["id", "date", "type", "category", "amount_inr", "note"];
  const rows = transactions.map((t) => [
    t.id,
    t.date,
    t.type,
    getCategory(t.category).label,
    t.amount,
    (t.note || "").replace(/"/g, '""'),
  ]);
  return [head, ...rows].map((r) => r.map((v) => `"${v ?? ""}"`).join(",")).join("\n");
}

export default function Header({ onAdd }) {
  const { transactions, resetDemo } = useTransactions();

  const exportCSV = () => {
    const blob = new window.Blob([toCSV(transactions)], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `hisaab-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <header
      className="flex items-center justify-between pt-7 pb-5"
      data-testid="app-header"
    >
      <div className="flex items-center gap-3">
        <div
          className="w-11 h-11 rounded-2xl flex items-center justify-center relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg,#FF8B3D 0%,#F4C95D 100%)",
            color: "#0A0B14",
            boxShadow: "0 10px 28px rgba(255,139,61,0.32)",
          }}
          data-testid="brand-mark"
        >
          <Wallet size={20} strokeWidth={2.2} />
        </div>
        <div className="leading-tight">
          <div className="font-serif text-[1.7rem] tracking-tight" style={{ color: "#F5F2EA" }}>
            Hisaab
          </div>
          <div className="text-[10px] uppercase tracking-[0.28em] font-mono" style={{ color: "#7A7A83" }}>
            spending · in real-time
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          className="btn-pill btn-ghost"
          onClick={resetDemo}
          data-testid="reset-demo-button"
          title="Reset demo data"
        >
          <RotateCcw size={14} />
          <span className="hidden sm:inline">Reset</span>
        </button>
        <button
          className="btn-pill btn-ghost"
          onClick={exportCSV}
          data-testid="export-csv-button"
        >
          <Download size={14} />
          <span className="hidden sm:inline">Export</span>
        </button>
        <button
          className="btn-pill btn-primary"
          onClick={onAdd}
          data-testid="header-add-transaction-button"
        >
          <Plus size={15} />
          Add
        </button>
      </div>
    </header>
  );
}
