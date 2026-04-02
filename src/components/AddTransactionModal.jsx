import React, { useState } from 'react';
import useStore from '../store/useStore';
import { X } from 'lucide-react';

const AddTransactionModal = ({ isOpen, onClose }) => {
  const addTransaction = useStore(state => state.addTransaction);

  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('expense');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount || !category || !date) return;
    
    addTransaction({
      id: Math.random().toString(36).substring(2, 9), // simple unique id generator
      description,
      amount: parseFloat(amount),
      category,
      type,
      date
    });
    
    // Reset form upon successful submission
    setDescription('');
    setAmount('');
    setCategory('');
    setType('expense');
    setDate(new Date().toISOString().split('T')[0]);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-card w-full max-w-md p-6 rounded-2xl border border-muted shadow-xl animate-slide-up relative mt-[-5%] overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-accent"></div>
        <button 
          onClick={onClose} 
          className="absolute right-4 top-4 p-1 rounded-md text-textMuted hover:bg-muted hover:text-textPrimary transition-colors"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>
        
        <h2 className="text-xl font-semibold mb-6">Add Transaction</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-textMuted mb-2">Description</label>
            <input 
              type="text" 
              required
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full bg-background border border-muted rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors text-textPrimary"
              placeholder="e.g. Groceries"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-textMuted mb-2">Amount ($)</label>
              <input 
                type="number" 
                required
                min="0"
                step="0.01"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                className="w-full bg-background border border-muted rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors text-textPrimary"
                placeholder="25.00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-textMuted mb-2">Date</label>
              <input 
                type="date" 
                required
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-full bg-background border border-muted rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors text-textPrimary"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-textMuted mb-2">Type</label>
              <select 
                value={type}
                onChange={e => setType(e.target.value)}
                className="w-full bg-background border border-muted rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors text-textPrimary"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-textMuted mb-2">Category</label>
              <input 
                type="text" 
                required
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full bg-background border border-muted rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors text-textPrimary"
                placeholder="e.g. Food"
              />
            </div>
          </div>
          
          <div className="pt-6 flex justify-end gap-3">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-sm font-medium hover:bg-muted text-textPrimary transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-5 py-2 rounded-lg text-sm font-medium bg-accent hover:bg-[#e66e00] text-black shadow-lg shadow-accent/20 transition-all active:scale-95"
            >
              Save Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;
