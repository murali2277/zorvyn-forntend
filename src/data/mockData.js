export const initialTransactions = [
  { id: '1', date: '2023-10-01', amount: 5000, category: 'Salary', type: 'income', description: 'Tech Corp Inc' },
  { id: '2', date: '2023-10-03', amount: 120, category: 'Food', type: 'expense', description: 'Grocery Market' },
  { id: '3', date: '2023-10-05', amount: 80, category: 'Transport', type: 'expense', description: 'Uber Rides' },
  { id: '4', date: '2023-10-10', amount: 200, category: 'Utilities', type: 'expense', description: 'Electric Bill' },
  { id: '5', date: '2023-10-15', amount: 1500, category: 'Freelance', type: 'income', description: 'Web Project' },
  { id: '6', date: '2023-10-18', amount: 350, category: 'Shopping', type: 'expense', description: 'Amazon' },
  { id: '7', date: '2023-10-22', amount: 60, category: 'Food', type: 'expense', description: 'Coffee Shop' },
  { id: '8', date: '2023-10-25', amount: 100, category: 'Entertainment', type: 'expense', description: 'Movie Tickets' },
  { id: '9', date: '2023-11-01', amount: 5000, category: 'Salary', type: 'income', description: 'Tech Corp Inc' },
  { id: '10', date: '2023-11-05', amount: 1200, category: 'Housing', type: 'expense', description: 'Monthly Rent' },
  { id: '11', date: '2023-11-12', amount: 450, category: 'Food', type: 'expense', description: 'Bulk Groceries' },
  { id: '12', date: '2023-11-20', amount: 300, category: 'Transport', type: 'expense', description: 'Car Service' },
  { id: '13', date: '2023-12-01', amount: 5000, category: 'Salary', type: 'income', description: 'Tech Corp Inc' },
  { id: '14', date: '2023-12-15', amount: 2000, category: 'Shopping', type: 'expense', description: 'Holiday Gifts' },
  { id: '15', date: '2023-12-24', amount: 500, category: 'Food', type: 'expense', description: 'Christmas Dinner' },
  { id: '16', date: '2023-12-28', amount: 800, category: 'Entertainment', type: 'expense', description: 'Travel/Hotel' },
  { id: '17', date: '2024-01-01', amount: 5500, category: 'Salary', type: 'income', description: 'New Year Raise' },
  { id: '18', date: '2024-01-10', amount: 150, category: 'Health', type: 'expense', description: 'Gym Membership' },
  { id: '19', date: '2024-01-20', amount: 110, category: 'Utilities', type: 'expense', description: 'Internet/Water' },
  { id: '20', date: '2024-03-05', amount: 5500, category: 'Salary', type: 'income', description: 'Tech Corp Inc' },
  { id: '21', date: '2024-03-15', amount: 3500, category: 'Freelance', type: 'income', description: 'Big Client Project' },
  { id: '22', date: '2024-03-25', amount: 1200, category: 'Investment', type: 'expense', description: 'Stock Purchase' },
  { id: '23', date: '2025-01-01', amount: 6000, category: 'Salary', type: 'income', description: 'Promotion' },
  { id: '24', date: '2025-01-15', amount: 2000, category: 'Education', type: 'expense', description: 'Masterclass' }
];

export const generateTrendData = (transactions, timeframe = 'daily') => {
  let balance = 0;
  
  const withBalance = [...transactions]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((tx) => {
      if (tx.type === 'income') balance += tx.amount;
      else balance -= tx.amount;
      return { date: tx.date, balance };
    });

  const grouped = {};
  withBalance.forEach(item => {
    let key = item.date;
    if (timeframe === 'monthly') {
      const d = new Date(item.date);
      key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-01`;
    } else if (timeframe === 'yearly') {
      const d = new Date(item.date);
      key = `${d.getFullYear()}-01-01`;
    }
    grouped[key] = item.balance;
  });

  return Object.keys(grouped).map(k => ({ date: k, balance: grouped[k] }));
};
