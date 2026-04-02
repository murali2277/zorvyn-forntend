import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import useStore from '../../store/useStore';

const COLORS = ['#ff7a00', '#d97706', '#ea580c', '#c2410c', '#404040', '#737373'];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-muted p-2 rounded-lg shadow-lg text-sm flex gap-2 items-center">
        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: payload[0].payload.fill }}></div>
        <span className="text-textMuted">{payload[0].name}:</span>
        <span className="font-semibold text-textPrimary">₹{payload[0].value.toLocaleString()}</span>
      </div>
    );
  }
  return null;
};

const CategoryChart = () => {
  const transactions = useStore((state) => state.transactions);

  const chartData = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'expense');
    const categoryTotals = expenses.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {});

    return Object.keys(categoryTotals).map((key) => ({
      name: key,
      value: categoryTotals[key],
    })).sort((a, b) => b.value - a.value);
  }, [transactions]);

  if (chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-textMuted text-sm">
        No expense data for chart.
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          dataKey="value"
          stroke="none"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend 
          verticalAlign="bottom" 
          wrapperStyle={{ paddingTop: '10px', paddingBottom: '10px' }}
          iconType="circle"
          formatter={(value) => <span className="text-textMuted text-xs">{value}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CategoryChart;
