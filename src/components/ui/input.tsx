import { cn } from '@/lib/utils';
import { ComponentProps, forwardRef, type InputHTMLAttributes } from 'react';

export type InputProps = {} & InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, ComponentProps<'input'>>(
  ({ className, ...props }, ref) => {
    return (
      <div className='relative w-full'>
        <div className='absolute h-[calc(100%+2.5px)] w-[calc(100%+2.5px)] rounded-[calc(1rem+1.25px)] bg-linear-15 from-zinc-700 via-zinc-400 to-zinc-700 to-75% -top-[1.25px] -left-[1.25px] z-0' />
        <input
          className={cn(
            'bg-[#242424] w-full rounded-[1rem] placeholder:text-muted [box-shadow:inset_4px_4px_27.5px_0px_rgba(0,0,0,.75)] text-text px-4 py-2 z-1 relative text-sm',
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = 'Input';
