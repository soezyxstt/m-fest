import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import type { ButtonHTMLAttributes } from 'react';

const gradientButtonVariants = cva(
  'text-white rounded-[.75rem] transition-all duration-300 z-1 relative w-full hover:brightness-90 min-w-40',
  {
    variants: {
      variant: {
        outline: 'bg-background',
        default: 'bg-gradient-to-r from-purple-m to-azure-m',
        glow: 'shadow-glow bg-gradient-to-r from-purple-m to-azure-m',
      },
      size: {
        sm: 'text-xs px-2 py-1',
        md: 'text-sm px-3 py-2',
        lg: 'text-lg px-4 py-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export default function GradientButton({
  children,
  className,
  variant,
  size,
  containerClassName,
  isFullWIdth = false,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof gradientButtonVariants> & {
    isFullWIdth?: boolean;
    containerClassName?: string;
  }) {
  return (
    <div
      className={cn(
        'relative group flex **:cursor-pointer w-fit',
        containerClassName,
        isFullWIdth && 'w-full'
      )}
    >
      <div className='absolute h-[calc(100%+2px)] w-[calc(100%+2px)] rounded-[calc(.75rem+1px)] bg-linear-60 from-purple-m via-clear-sky-m via-40% to-azure-m to-75% -top-[1px] -left-[1px] z-0 transition-all duration-300 group-hover:opacity-75' />
      <button
        className={cn(gradientButtonVariants({ variant, size, className }))}
        {...props}
      >
        {children}
      </button>
    </div>
  );
}
