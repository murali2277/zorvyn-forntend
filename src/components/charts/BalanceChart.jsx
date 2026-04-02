import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import useStore from '../../store/useStore';
import { generateTrendData } from '../../data/mockData';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-muted p-3 flex flex-col gap-1 rounded-lg shadow-lg text-sm">
        <span className="text-textMuted">{new Date(label).toLocaleDateString()}</span>
        <span className="font-semibold text-accent">
          Balance: ${payload[0].value.toLocaleString()}
        </span>
      </div>
    );
  }
  return null;
};

const BalanceChart = () => {
  const transactions = useStore((state) => state.transactions);
  
  const chartData = useMemo(() => {
    return generateTrendData(transactions);
  }, [transactions]);

  if (chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-textMuted text-sm">
        Not enough data.
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ff7a00" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#ff7a00" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#404040" vertical={false} />
        <XAxis 
          dataKey="date" 
          stroke="#9ca3af" 
          fontSize={12} 
          tickLine={false} 
          axisLine={false}
          tickFormatter={(val) => new Date(val).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        />
        <YAxis 
          stroke="#9ca3af" 
          fontSize={12} 
          tickLine={false} 
          axisLine={false} 
          tickFormatter={(val) => `$${val}`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area 
          type="monotone" 
          dataKey="balance" 
          stroke="#ff7a00" 
          strokeWidth={3} 
          fillOpacity={1} 
          fill="url(#colorBalance)" 
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default BalanceChart;
