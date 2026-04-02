import { create } from 'zustand';
import { initialTransactions } from '../data/mockData';

const useStore = create((set, get) => ({
  theme: 'dark',
  toggleTheme: () => set((state) => {
    const newTheme = state.theme === 'dark' ? 'light' : 'dark';
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    return { theme: newTheme };
  }),

  role: 'admin',
  setRole: (role) => set({ role }),

  transactions: initialTransactions,
  addTransaction: (tx) => set((state) => ({ transactions: [...state.transactions, tx] })),
  deleteTransaction: (id) => set((state) => ({
    transactions: state.transactions.filter(t => t.id !== id)
  })),


  getTotalIncome: () => get().transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0),
    
  getTotalExpenses: () => get().transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0),
    
  getBalance: () => get().getTotalIncome() - get().getTotalExpenses(),
}));

export default useStore;
