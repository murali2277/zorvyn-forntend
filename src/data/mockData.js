export const initialTransactions = [
  { id: '1', date: '2023-10-01', amount: 5000, category: 'Salary', type: 'income', description: 'Tech Corp Inc' },
  { id: '2', date: '2023-10-03', amount: 120, category: 'Food', type: 'expense', description: 'Grocery Market' },
  { id: '3', date: '2023-10-05', amount: 80, category: 'Transport', type: 'expense', description: 'Uber Rides' },
  { id: '4', date: '2023-10-10', amount: 200, category: 'Utilities', type: 'expense', description: 'Electric Bill' },
  { id: '5', date: '2023-10-15', amount: 1500, category: 'Freelance', type: 'income', description: 'Web Project' },
  { id: '6', date: '2023-10-18', amount: 350, category: 'Shopping', type: 'expense', description: 'Amazon' },
  { id: '7', date: '2023-10-22', amount: 60, category: 'Food', type: 'expense', description: 'Coffee Shop' },
  { id: '8', date: '2023-10-25', amount: 100, category: 'Entertainment', type: 'expense', description: 'Movie Tickets' },
];

export const generateTrendData = (transactions) => {
  
  let balance = 0;
  return transactions
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((tx) => {
      if (tx.type === 'income') balance += tx.amount;
      else balance -= tx.amount;
      return { date: tx.date, balance };
    });
};
