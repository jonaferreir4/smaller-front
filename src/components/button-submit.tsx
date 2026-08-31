import React from "react";
import { cn } from "../lib/utils";

interface SubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: "primary" | "secondary" | "ghost";
}

export function SubmitButton({
  children,
  className,
  disabled,
  isLoading,
  variant = "primary",
  ...props
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={disabled || isLoading}
      className={cn(
        "inline-flex items-center justify-center font-medium rounded-xl px-5 py-3 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/40 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer",
        variant === "primary" &&
          "bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm",
        variant === "secondary" &&
          "bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700",
        variant === "ghost" && "hover:bg-slate-800 text-slate-300",
        className
      )}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Processando...
        </span>
      ) : (
        children
      )}
    </button>
  );
}

export default SubmitButton;
