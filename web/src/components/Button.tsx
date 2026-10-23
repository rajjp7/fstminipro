import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "dark";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.985] disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer";

  const sizeStyles = {
    sm: "text-xs px-3.5 py-2 gap-1.5 font-medium tracking-tight",
    md: "text-sm px-5 py-2.5 gap-2 font-medium tracking-tight shadow-xs",
    lg: "text-sm sm:text-base px-6 py-3.5 gap-2.5 font-semibold tracking-tight shadow-sm",
  };

  const variantStyles = {
    primary:
      "bg-zinc-900 text-white hover:bg-black focus:ring-zinc-900 border border-zinc-800",
    secondary:
      "bg-zinc-100 text-zinc-900 hover:bg-zinc-200/80 focus:ring-zinc-300 border border-zinc-200/70",
    outline:
      "bg-white text-zinc-900 border border-zinc-300 hover:bg-zinc-50 hover:border-zinc-400 focus:ring-zinc-400 shadow-2xs",
    ghost:
      "bg-transparent text-zinc-700 hover:bg-zinc-100/80 focus:ring-zinc-300 border border-transparent",
    dark:
      "bg-zinc-950 text-white hover:bg-zinc-900 focus:ring-zinc-800 border border-zinc-800",
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : (
        leftIcon && <span className="shrink-0">{leftIcon}</span>
      )}
      <span>{children}</span>
      {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
}
