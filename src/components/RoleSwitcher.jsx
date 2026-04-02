import React from 'react';
import useStore from '../store/useStore';
import { UserCircle, ArrowRightLeft } from 'lucide-react';

const RoleSwitcher = () => {
  const { role, setRole } = useStore();

  const toggleRole = () => {
    setRole(role === 'admin' ? 'viewer' : 'admin');
  };

  return (
    <button 
      onClick={toggleRole}
      className="flex items-center gap-2 px-3 py-2 rounded-full glass-layer border border-glass-border hover:bg-glass-hover transition-all active:scale-95 outline-none group"
      title="Swap Role"
    >
      <UserCircle className="w-5 h-5 text-accent" />
      <span className="text-sm font-medium text-textPrimary whitespace-nowrap pr-1">
        {role === 'admin' ? 'Admin Role' : 'Viewer Role'}
      </span>
      <ArrowRightLeft className="w-3.5 h-3.5 text-textMuted opacity-50 group-hover:opacity-100 transition-opacity" />
    </button>
  );
};

export default RoleSwitcher;
