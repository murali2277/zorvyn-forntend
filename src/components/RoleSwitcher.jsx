import React from 'react';
import useStore from '../store/useStore';
import { UserCircle } from 'lucide-react';

const RoleSwitcher = () => {
  const { role, setRole } = useStore();

  return (
    <div className="flex items-center gap-3 bg-card border border-muted p-1 rounded-xl">
      <UserCircle className="w-5 h-5 text-textMuted ml-2" />
      <select 
        value={role} 
        onChange={(e) => setRole(e.target.value)}
        className="bg-transparent text-sm font-medium py-2 pr-4 pl-2 outline-none cursor-pointer appearance-none text-textPrimary"
      >
        <option value="viewer" className="bg-card">Viewer Role</option>
        <option value="admin" className="bg-card">Admin Role</option>
      </select>
    </div>
  );
};

export default RoleSwitcher;
