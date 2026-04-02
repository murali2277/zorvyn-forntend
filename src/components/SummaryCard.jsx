import React from 'react';
import clsx from 'clsx';

const SummaryCard = ({ title, amount, icon, highlight = false }) => {
  return (
    <div className={clsx(
      "p-6 flex flex-col justify-between",
      "glass-card hover:-translate-y-1 transition-transform duration-300",
      highlight && "text-accent"
    )}>
      <div className="flex justify-between items-start mb-4">
        <span className="text-textMuted font-medium">{title}</span>
        <div className="p-3 glass-icon-well shadow-sm">
          {icon}
        </div>
      </div>
      <div>
        <h3 className="text-3xl font-semibold tracking-tight">
          ₹{amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </h3>
      </div>
    </div>
  );
};

export default SummaryCard;
