import React from 'react';
import clsx from 'clsx';

const SummaryCard = ({ title, amount, icon, highlight = false }) => {
  return (
    <div className={clsx(
      "p-6 rounded-2xl border flex flex-col justify-between transition-all duration-300 hover:shadow-md",
      highlight ? "border-accent bg-card" : "border-muted bg-card"
    )}>
      <div className="flex justify-between items-start mb-4">
        <span className="text-textMuted font-medium">{title}</span>
        <div className="p-2 bg-background rounded-lg border border-muted">
          {icon}
        </div>
      </div>
      <div>
        <h3 className="text-3xl font-semibold tracking-tight">
          ${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </h3>
      </div>
    </div>
  );
};

export default SummaryCard;
