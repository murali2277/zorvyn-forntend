import React from 'react';
import useStore from '../store/useStore';
import SummaryCard from '../components/SummaryCard';
import RoleSwitcher from '../components/RoleSwitcher';
import ThemeToggle from '../components/ThemeToggle';
import TransactionTable from '../components/TransactionTable';
import Insights from '../components/Insights';
import BalanceChart from '../components/charts/BalanceChart';
import CategoryChart from '../components/charts/CategoryChart';
import { initialTransactions } from '../data/mockData';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';

const Dashboard = () => {
  const { getBalance, getTotalIncome, getTotalExpenses } = useStore();

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-muted pb-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Finance Overview</h1>
          <p className="text-textMuted mt-1">Manage and track your financials seamlessly.</p>
        </div>
        <div className="flex items-center gap-2">
          <RoleSwitcher />
          <ThemeToggle />
        </div>
      </header>

      {/* Summary Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <SummaryCard 
          title="Total Balance" 
          amount={getBalance()} 
          icon={<Wallet className="text-accent w-6 h-6" />}
          highlight
        />
        <SummaryCard 
          title="Total Income" 
          amount={getTotalIncome()} 
          icon={<TrendingUp className="text-green-500 w-6 h-6" />}
        />
        <SummaryCard 
          title="Total Expenses" 
          amount={getTotalExpenses()} 
          icon={<TrendingDown className="text-red-500 w-6 h-6" />}
        />
      </section>

      {/* Charts Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto min-h-[350px] animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <div className="lg:col-span-2 bg-card border border-muted rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-medium mb-4">Balance Trend</h2>
          <div className="h-[250px]">
            <BalanceChart />
          </div>
        </div>
        <div className="bg-card border border-muted rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-medium mb-4">Expenses by Category</h2>
          <div className="h-[250px]">
            <CategoryChart />
          </div>
        </div>
      </section>

      {/* Bottom Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
        <div className="lg:col-span-2 bg-card border border-muted rounded-2xl shadow-sm overflow-hidden">
          <TransactionTable />
        </div>
        <div className="bg-card border border-muted rounded-2xl p-6 shadow-sm">
          <Insights />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
