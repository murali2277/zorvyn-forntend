import React, { useMemo } from 'react';
import useStore from '../store/useStore';
import { Lightbulb, TrendingUp, PiggyBank } from 'lucide-react';

const Insights = () => {
  const { transactions, getTotalIncome, getTotalExpenses } = useStore();

  const insightData = useMemo(() => {
    // Highest spending category
    const expenses = transactions.filter(t => t.type === 'expense');
    const categoryTotals = expenses.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {});
    
    let highestCategory = 'N/A';
    let highestAmount = 0;
    
    for (const [cat, amt] of Object.entries(categoryTotals)) {
      if (amt > highestAmount) {
        highestAmount = amt;
        highestCategory = cat;
      }
    }

    const savingsRate = getTotalIncome() > 0 
      ? (((getTotalIncome() - getTotalExpenses()) / getTotalIncome()) * 100).toFixed(1) 
      : 0;

    return { highestCategory, savingsRate };
  }, [transactions, getTotalIncome, getTotalExpenses]);

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-xl font-medium mb-6">Quick Insights</h2>
      
      <div className="space-y-6 flex-1">
        <div className="flex items-start gap-5">
          <div className="p-4 glass-icon-well shadow-sm text-accent">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div className="mt-1">
            <h4 className="text-sm font-medium text-textMuted">Top Expense Category</h4>
            <p className="text-xl font-semibold mt-1">{insightData.highestCategory}</p>
          </div>
        </div>

        <div className="flex items-start gap-5">
          <div className="p-4 glass-icon-well shadow-sm text-green-500">
            <PiggyBank className="w-5 h-5" />
          </div>
          <div className="mt-1">
            <h4 className="text-sm font-medium text-textMuted">Savings Rate</h4>
            <p className="text-xl font-semibold mt-1">{insightData.savingsRate}%</p>
            <p className="text-xs text-textMuted mt-1">of total income saved</p>
          </div>
        </div>

        <div className="flex items-start gap-5">
          <div className="p-4 glass-icon-well shadow-sm text-blue-400">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div className="mt-1">
            <h4 className="text-sm font-medium text-textMuted">Recommendation</h4>
            <p className="text-sm leading-relaxed mt-1 text-textPrimary">
              Consider reducing your budget for <strong>{insightData.highestCategory}</strong> to improve your savings rate this month.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;
