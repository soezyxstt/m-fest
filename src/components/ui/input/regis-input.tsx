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
        className={cn('relative group mt-4', containerClassName, isFullWIdth && 'w-full')}
      >
        <label className='origin-start absolute top-1/2 block -translate-y-1/2 cursor-text px-1 text-sm text-muted transition-all group-focus-within:pointer-events-none group-focus-within:-top-1 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium group-focus-within:text-white has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:-top-1 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium has-[+input:not(:placeholder-shown)]:text-white pointer-events-none'>
          {placeholder}
        </label>
        <input
          ref={ref}
          className={cn(
            'border-b focus:outline-0 placeholder:text-transparent pl-4 w-full text-lg',
            className
          )}
        placeholder={placeholder}
          {...props}
        />
      </div>
    );
  }
);

UnderlineInput.displayName = 'UnderlineInput';
