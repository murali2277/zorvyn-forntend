import React, { useState } from 'react';
import useStore from '../store/useStore';
import SummaryCard from '../components/SummaryCard';
import RoleSwitcher from '../components/RoleSwitcher';
import ThemeToggle from '../components/ThemeToggle';
import GithubRepoLink from '../components/GithubRepoLink';
import TransactionTable from '../components/TransactionTable';
import Insights from '../components/Insights';
import BalanceChart from '../components/charts/BalanceChart';
import CategoryChart from '../components/charts/CategoryChart';
import CustomSelect from '../components/CustomSelect';
import { initialTransactions } from '../data/mockData';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';

const Dashboard = () => {
  const { getBalance, getTotalIncome, getTotalExpenses } = useStore();
  const [timeframe, setTimeframe] = useState('daily');

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">

      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 animate-fade-in">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight"><span className="text-accent text-4xl font-bold">Finance</span> Overview</h1>
          <p className="text-textMuted mt-1">Manage and track your financials seamlessly.</p>
        </div>
        <div className="flex items-center gap-2">
          <GithubRepoLink />
          <RoleSwitcher />
          <ThemeToggle />
        </div>
      </header>


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


      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-auto min-h-[350px] animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <div className="lg:col-span-2 glass-card p-6 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-medium">Balance Trend</h2>
            <div className="glass-layer rounded-lg p-0.5 relative z-20">
              <CustomSelect 
                value={timeframe} 
                onChange={setTimeframe}
                options={[
                  { value: 'daily', label: 'Daily' },
                  { value: 'monthly', label: 'Monthly' },
                  { value: 'yearly', label: 'Yearly' }
                ]}
              />
            </div>
          </div>
          <div className="h-[250px]">
            <BalanceChart timeframe={timeframe} />
          </div>
        </div>
        <div className="glass-card p-6">
          <h2 className="text-xl font-medium mb-4">Expenses by Category</h2>
          <div className="h-[250px]">
            <CategoryChart />
          </div>
        </div>
      </section>


      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-slide-up items-start" style={{ animationDelay: '0.3s' }}>
        <div className="lg:col-span-2 glass-card overflow-hidden pb-4">
          <TransactionTable />
        </div>
        <div className="glass-card p-6 h-fit">
          <Insights />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
