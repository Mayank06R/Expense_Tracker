import { useState } from "react";
import Header from "../components/Header";
import BalanceHero from "../components/BalanceHero";
import AddTransactionForm from "../components/AddTransactionForm";
import TransactionList from "../components/TransactionList";
import CategoryDonut from "../components/CategoryDonut";
import SpendingTrend from "../components/SpendingTrend";
import ThreeBackground from "../components/ThreeBackground";

export default function Dashboard() {
  const [pulse, setPulse] = useState(0);

  return (
    <div className="grain" data-testid="dashboard">
      <ThreeBackground pulseKey={pulse} />
      <div className="relative" style={{ zIndex: 1 }}>
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <Header />

          <div className="pt-2 pb-6">
            <h2
              className="font-serif tracking-tight"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                color: "#1A1A18",
                fontWeight: 500,
                lineHeight: 1.05,
              }}
              data-testid="page-title"
            >
              An <em style={{ fontStyle: "italic", color: "#4C7A5D" }}>honest</em> view
              <br />
              of your money.
            </h2>
            <p className="mt-3 max-w-xl text-[15px]" style={{ color: "#5E5E5A" }}>
              Log a moment, watch the aura breathe. Aura is a quiet, frontend-only
              tracker — your data lives only on this device.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 pb-12">
            <div className="lg:col-span-3 space-y-6">
              <BalanceHero />
              <AddTransactionForm onAdded={() => setPulse((p) => p + 1)} />
              <SpendingTrend />
            </div>
            <div className="lg:col-span-2 space-y-6">
              <CategoryDonut />
              <TransactionList />
            </div>
          </div>

          <footer
            className="py-8 text-xs flex items-center justify-between"
            style={{ color: "#8F8F8A" }}
            data-testid="footer"
          >
            <span>© Aura · localStorage-only · no servers, no tracking</span>
            <span className="font-serif italic">a quiet ritual for money</span>
          </footer>
        </div>
      </div>
    </div>
  );
}
