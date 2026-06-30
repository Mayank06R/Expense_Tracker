import { useState } from "react";
import { Plus } from "lucide-react";
import Header from "../components/Header";
import DashboardHero from "../components/DashboardHero";
import MonthlyIncomeCard from "../components/MonthlyIncomeCard";
import { TotalSpentCard, AvailableBalanceCard, SavingsRateCard } from "../components/StatsRow";
import MTDBudgetCard from "../components/MTDBudgetCard";
import { DailyAverageCard, LargestTransactionCard } from "../components/SecondaryStats";
import SpendingHabitsCard from "../components/SpendingHabitsCard";
import DailySpendingChart from "../components/DailySpendingChart";
import CategoryBreakdown3D from "../components/CategoryBreakdown3D";
import BudgetProgressCard from "../components/BudgetProgressCard";
import RecentTransactionsCard from "../components/RecentTransactionsCard";
import AddTransactionDialog from "../components/AddTransactionDialog";
import AllTransactionsSheet from "../components/AllTransactionsSheet";
import ThreeBackground from "../components/ThreeBackground";

export default function Dashboard() {
  const [addOpen, setAddOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <div className="grain" data-testid="dashboard">
      <ThreeBackground />
      <div className="relative" style={{ zIndex: 1 }}>
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <Header onAdd={() => setAddOpen(true)} />
          <DashboardHero />

          {/* Row 1: 4 stat cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <MonthlyIncomeCard />
            <TotalSpentCard />
            <AvailableBalanceCard />
            <SavingsRateCard />
          </div>

          {/* Row 2: MTD budget (spans 2) + Daily Average + Largest */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 mt-5">
            <div className="lg:col-span-2">
              <MTDBudgetCard />
            </div>
            <DailyAverageCard />
            <LargestTransactionCard />
          </div>

          {/* Row 3: Spending Habits */}
          <div className="mt-5">
            <SpendingHabitsCard />
          </div>

          {/* Row 4: Daily Spending bar chart */}
          <div className="mt-5">
            <DailySpendingChart />
          </div>

          {/* Row 5: 3D Category Breakdown + Budget Progress */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
            <CategoryBreakdown3D />
            <BudgetProgressCard />
          </div>

          {/* Row 6: Recent Transactions */}
          <div className="mt-5">
            <RecentTransactionsCard onViewAll={() => setSheetOpen(true)} />
          </div>

          <footer
            className="py-10 mt-4 text-xs flex flex-col sm:flex-row items-center justify-between gap-2"
            style={{ color: "#6B6B73" }}
            data-testid="footer"
          >
            <span>© Hisaab · localStorage-only · no servers, no tracking</span>
            <span className="font-serif italic" style={{ color: "#7A7A83" }}>
              an honest mirror of your spending
            </span>
          </footer>
        </div>
      </div>

      {/* Floating Add button */}
      <button
        className="fab"
        onClick={() => setAddOpen(true)}
        data-testid="fab-add-transaction"
        aria-label="Add transaction"
      >
        <Plus size={24} strokeWidth={2.4} />
      </button>

      <AddTransactionDialog open={addOpen} onClose={() => setAddOpen(false)} />
      <AllTransactionsSheet open={sheetOpen} onClose={() => setSheetOpen(false)} />
    </div>
  );
}
