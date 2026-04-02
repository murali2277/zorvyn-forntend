import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const CustomSelect = ({ value, onChange, options, icon: Icon, align = 'right' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedOption = options.find((opt) => opt.value === value) || options[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 bg-transparent border-none outline-none text-sm font-medium py-1 px-2 cursor-pointer text-textPrimary w-full text-left rounded-lg transition-colors hover:bg-textPrimary/5"
      >
        {Icon && <Icon className="w-5 h-5 text-textMuted" />}
        <span className="whitespace-nowrap">{selectedOption.label}</span>
        <ChevronDown className="w-4 h-4 text-textMuted ml-0.5" />
      </button>

      {isOpen && (
        <div className={`absolute top-full mt-2 w-full min-w-[120px] bg-background rounded-lg overflow-hidden z-[100] border border-glass-border shadow-xl animate-fade-in ${align === 'right' ? 'right-0' : 'left-0'}`}>
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-1.5 text-sm transition-colors hover:bg-black/5 dark:hover:bg-white/10 text-textPrimary ${
                  value === option.value ? 'bg-black/5 dark:bg-white/5 font-semibold' : ''
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
