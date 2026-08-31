import React from "react";
import { cn } from "../lib/utils";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  onClear?: () => void;
  containerClassName?: string;
}

export function SearchInput({
  className,
  containerClassName,
  value,
  onChange,
  onClear,
  placeholder = "Cole seu link longo aqui...",
  ...props
}: SearchInputProps) {
  return (
    <div className={cn("relative flex items-center w-full", containerClassName)}>
      <div className="absolute left-4 text-slate-400 pointer-events-none flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-indigo-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
          />
        </svg>
      </div>

      <input
        type="url"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={cn(
          "w-full pl-12 pr-10 py-3.5 bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-xl text-slate-100 placeholder-slate-400 shadow-inner focus:outline-none focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/20 transition-all text-sm sm:text-base",
          className
        )}
        {...props}
      />

      {value && onClear && (
        <button
          type="button"
          onClick={onClear}
          className="absolute right-3 p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors"
          aria-label="Limpar campo"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}

export default SearchInput;