import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion, type HTMLMotionProps } from 'framer-motion';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ZurichCardProps extends HTMLMotionProps<"div"> {
  variant?: 'default' | 'outline';
}

export const ZurichCard = ({ children, className, variant = 'default', ...props }: ZurichCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    className={cn(
      "p-6 border-none transition-colors",
      variant === 'default' ? "bg-surface" : "bg-transparent border border-white/10",
      className
    )}
    {...props}
  >
    {children}
  </motion.div>
);

export interface ZurichButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const ZurichButton = ({ 
  children, 
  className, 
  variant = 'primary', 
  size = 'md',
  ...props 
}: ZurichButtonProps) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.96 }}
    transition={{ type: "spring", stiffness: 400, damping: 17 }}
    className={cn(
      "flex items-center justify-center font-display uppercase tracking-widest transition-colors disabled:opacity-50",
      // Variants
      variant === 'primary' && "bg-accent text-white hover:bg-accent-bright",
      variant === 'secondary' && "bg-surface-bright text-white border border-white/5 hover:bg-white/10",
      variant === 'ghost' && "bg-transparent text-muted hover:text-white border border-transparent hover:border-white/10",
      // Sizes
      size === 'sm' && "px-4 py-2 text-[10px]",
      size === 'md' && "px-6 py-3 text-xs",
      size === 'lg' && "px-8 py-4 text-sm",
      className
    )}
    {...props}
  >
    {children}
  </motion.button>
);
