import React, { useState, useMemo } from 'react';
import useStore from '../store/useStore';
import { Search, Plus, Trash2, Download } from 'lucide-react';
import AddTransactionModal from './AddTransactionModal';

const TransactionTable = () => {
  const { transactions, role, deleteTransaction } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredTransactions = useMemo(() => {
    let result = transactions;
    if (filterType !== 'all') {
      result = result.filter(t => t.type === filterType);
    }
    if (searchTerm) {
      result = result.filter(t => 
        t.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [transactions, searchTerm, filterType]);

  const handleExportJSON = () => {
    const dataStr = JSON.stringify(filteredTransactions, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'transactions.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportCSV = () => {
    const headers = ['Date,Description,Category,Amount,Type'];
    const rows = filteredTransactions.map(t => 
      `${t.date},"${t.description}",${t.category},${t.amount},${t.type}`
    );
    const csvContent = headers.concat(rows).join('\n');
    const dataBlob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'transactions.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="p-6 border-b border-muted flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-medium">Recent Transactions</h2>
        
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-textMuted" />
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-background border border-muted rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-accent transition-colors"
            />
          </div>
          
          <select 
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-background border border-muted rounded-lg px-4 py-2 text-sm outline-none focus:border-accent transition-colors"
          >
            <option value="all">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <button 
            onClick={handleExportCSV}
            title="Export CSV"
            className="flex items-center gap-2 bg-background border border-muted hover:border-accent hover:text-accent font-medium px-3 py-2 rounded-lg text-sm transition-colors"
          >
            <Download className="w-4 h-4" /> CSV
          </button>
          
          <button 
            onClick={handleExportJSON}
            title="Export JSON"
            className="flex items-center gap-2 bg-background border border-muted hover:border-accent hover:text-accent font-medium px-3 py-2 rounded-lg text-sm transition-colors"
          >
            <Download className="w-4 h-4" /> JSON
          </button>

          {role === 'admin' && (
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-accent hover:bg-[#e66e00] text-black font-semibold px-4 py-2 rounded-lg text-sm transition-colors"
            >
              <Plus className="w-4 h-4" /> Add
            </button>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-background/50 text-textMuted">
            <tr>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium">Description</th>
              <th className="px-6 py-4 font-medium">Category</th>
              <th className="px-6 py-4 font-medium text-right">Amount</th>
              {role === 'admin' && <th className="px-6 py-4 font-medium text-center">Action</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-muted">
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-background/30 transition-colors">
                  <td className="px-6 py-4 text-textMuted">{new Date(tx.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 font-medium">{tx.description}</td>
                  <td className="px-6 py-4">
                    <span className="bg-muted px-2 py-1 rounded text-xs">{tx.category}</span>
                  </td>
                  <td className={`px-6 py-4 text-right font-medium ${tx.type === 'income' ? 'text-green-500' : 'text-textPrimary'}`}>
                    {tx.type === 'income' ? '+' : '-'}${tx.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                  {role === 'admin' && (
                    <td className="px-6 py-4 text-center">
                      <button 
                        onClick={() => deleteTransaction(tx.id)}
                        className="text-textMuted hover:text-red-500 transition-colors p-1"
                        aria-label="Delete transaction"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={role === 'admin' ? 5 : 4} className="px-6 py-8 text-center text-textMuted">
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <AddTransactionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default TransactionTable;
