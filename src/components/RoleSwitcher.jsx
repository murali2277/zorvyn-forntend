import React from 'react';
import useStore from '../store/useStore';
import { UserCircle } from 'lucide-react';

const RoleSwitcher = () => {
  const { role, setRole } = useStore();

  return (
    <div className="flex items-center gap-3 glass-layer rounded-full p-1 px-2">
      <UserCircle className="w-5 h-5 text-textMuted ml-1" />
      <select 
        value={role} 
        onChange={(e) => setRole(e.target.value)}
        className="bg-transparent border-none outline-none text-sm font-medium py-2 pr-4 pl-2 cursor-pointer appearance-none text-textPrimary"
      >
        <option value="viewer" className="bg-card">Viewer Role</option>
        <option value="admin" className="bg-card">Admin Role</option>
      </select>
    </div>
  );
};

export default RoleSwitcher;
