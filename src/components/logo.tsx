import { cn } from "../lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export function Logo({ className, size = "md", showText = true }: LogoProps) {
  const sizeMap = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
  };

  const textMap = {
    sm: "text-base font-bold",
    md: "text-lg font-extrabold",
    lg: "text-2xl font-black",
  };

  return (
    <div className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        className={cn(sizeMap[size], "shrink-0 shadow-sm rounded-lg hover:scale-105 transition-transform")}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="100" height="100" rx="24" fill="#4F46E5" />
        <path
          d="M30 65C30 55 38 47 48 47H52M70 35C70 45 62 53 52 53H48"
          stroke="white"
          strokeWidth="10"
          strokeLinecap="round"
        />
      </svg>
      {showText && (
        <span className={cn("tracking-tight text-white", textMap[size])}>
          Smaller
        </span>
      )}
    </div>
  );
}

export default Logo;
