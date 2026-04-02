import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Dashboard from '../src/pages/Dashboard';

vi.mock('../src/store/useStore', () => ({
  __esModule: true,
  default: () => ({
    getBalance: () => 5000,
    getTotalIncome: () => 7000,
    getTotalExpenses: () => 2000
  })
}));

vi.mock('../src/components/RoleSwitcher', () => ({
  __esModule: true,
  default: () => <div data-testid="role-switcher" />
}));

vi.mock('../src/components/ThemeToggle', () => ({
  __esModule: true,
  default: () => <div data-testid="theme-toggle" />
}));

vi.mock('../src/components/SummaryCard', () => ({
  __esModule: true,
  default: ({ title, amount }) => (
    <div data-testid="summary-card">
      {title}: {amount}
    </div>
  )
}));

vi.mock('../src/components/charts/BalanceChart', () => ({
  __esModule: true,
  default: () => <div data-testid="balance-chart" />
}));

vi.mock('../src/components/charts/CategoryChart', () => ({
  __esModule: true,
  default: () => <div data-testid="category-chart" />
}));

vi.mock('../src/components/TransactionTable', () => ({
  __esModule: true,
  default: () => <div data-testid="transaction-table" />
}));

vi.mock('../src/components/Insights', () => ({
  __esModule: true,
  default: () => <div data-testid="insights" />
}));

describe('Dashboard', () => {
  it('renders components properly', () => {
    render(<Dashboard />);
    
    expect(screen.getByText('Finance Overview')).toBeDefined();
    expect(screen.getByTestId('role-switcher')).toBeDefined();
    expect(screen.getByTestId('theme-toggle')).toBeDefined();
    expect(screen.getAllByTestId('summary-card')).toHaveLength(3);
    
    expect(screen.getByText('Total Balance: 5000')).toBeDefined();
    expect(screen.getByText('Total Income: 7000')).toBeDefined();
    expect(screen.getByText('Total Expenses: 2000')).toBeDefined();
    
    expect(screen.getByTestId('balance-chart')).toBeDefined();
    expect(screen.getByTestId('category-chart')).toBeDefined();
    expect(screen.getByTestId('transaction-table')).toBeDefined();
    expect(screen.getByTestId('insights')).toBeDefined();
  });
});
