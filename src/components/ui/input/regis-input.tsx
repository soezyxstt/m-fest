import { cn } from '@/lib/utils';
import { ComponentProps, forwardRef } from 'react';

export const UnderlineInput = forwardRef<
  HTMLInputElement,
  ComponentProps<'input'> & {
    containerClassName?: string;
    isFullWIdth?: boolean;
  }
>(
  (
    { className, placeholder, containerClassName, isFullWIdth, ...props },
    ref
  ) => {
    return (
      <div
        className={cn('relative group', containerClassName, isFullWIdth && 'w-full')}
      >
        <div className='absolute bottom-0 text-muted left-4 pointer-events-none transition-all duration-300 group-has-focus:bottom-1/1 group-has-focus:left-0 group-has-focus:text-sm group-has-focus:translate-y-[-4px] text-lg'>
          {placeholder}
        </div>
        <input
          ref={ref}
          className={cn(
            'border-b focus:outline-0 placeholder:text-muted pl-4 w-full text-lg',
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

UnderlineInput.displayName = 'UnderlineInput';
