import { cn } from '@/lib/utils';
import type { AllHTMLAttributes } from 'react';

export default function GradientText({
  children,
  className,
  ...props
}: AllHTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        'text-3xl md:text-6xl text-center max-w-2xl font-bold bg-linear-60 from-purple-m via-azure-m to-teal-m text-transparent bg-clip-text transition-all animate-gradient-shift',
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}
