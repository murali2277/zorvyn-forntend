import React, { useState } from 'react';
import { createPortal } from 'react-dom';
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
      id: Math.random().toString(36).substring(2, 9),
      description,
      amount: parseFloat(amount),
      category,
      type,
      date
    });
    

    setDescription('');
    setAmount('');
    setCategory('');
    setType('expense');
    setDate(new Date().toISOString().split('T')[0]);
    onClose();
  };

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="glass-card w-full max-w-md p-8 animate-slide-up relative mt-[-5%] overflow-hidden">
        <button 
          onClick={onClose} 
          className="absolute right-6 top-6 p-2 rounded-full glass-layer text-textMuted hover:text-accent transition-colors"
          aria-label="Close Modal"
        >
          <X className="w-4 h-4" />
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
              className="w-full glass-input px-4 py-3 text-sm"
              placeholder="e.g. Groceries"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-textMuted mb-2">Amount (₹)</label>
              <input 
                type="number" 
                required
                min="0"
                step="0.01"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                className="w-full glass-input px-4 py-3 text-sm"
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
                className="w-full glass-input px-4 py-3 text-sm text-textPrimary"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-textMuted mb-2">Type</label>
              <select 
                value={type}
                onChange={e => setType(e.target.value)}
                className="w-full glass-input px-4 py-3 text-sm text-textPrimary"
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
                className="w-full glass-input px-4 py-3 text-sm text-textPrimary"
                placeholder="e.g. Food"
              />
            </div>
          </div>
          
          <div className="pt-6 flex justify-end gap-4">
            <button 
              type="button" 
              onClick={onClose}
              className="px-6 py-3 glass-btn font-medium"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-6 py-3 glass-accent font-bold"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default AddTransactionModal;
