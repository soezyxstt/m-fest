import { cn } from '@/lib/utils';
import { type HTMLProps } from 'react';

type HeadingProps = HTMLProps<HTMLHeadingElement>;

function h1({ children, className, ...props }: HeadingProps) {
  return (
    <h1
      className={cn(
        'font-title text-white font-bold text-4xl md:text-6xl',
        className
      )}
      {...props}
    >
      {children}
    </h1>
  );
}

function h2({ children, className, ...props }: HeadingProps) {
  return (
    <h2
      className={cn(
        'font-title text-white font-bold text-3xl md:text-5xl',
        className
      )}
      {...props}
    >
      {children}
    </h2>
  );
}

function h3({ children, className, ...props }: HeadingProps) {
  return (
    <h3
      className={cn(
        'font-title text-white font-bold text-2xl md:text-4xl',
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

function h4({ children, className, ...props }: HeadingProps) {
  return (
    <h4
      className={cn(
        'font-title text-white font-bold text-xl md:text-3xl',
        className
      )}
      {...props}
    >
      {children}
    </h4>
  );
}

function h5({ children, className, ...props }: HeadingProps) {
  return (
    <h5
      className={cn(
        'font-title text-white font-bold text-lg md:text-2xl',
        className
      )}
      {...props}
    >
      {children}
    </h5>
  );
}

function h6({ children, className, ...props }: HeadingProps) {
  return (
    <h6
      className={cn(
        'font-title text-white font-bold text-base md:text-xl',
        className
      )}
      {...props}
    >
      {children}
    </h6>
  );
}

export const title = { h1, h2, h3, h4, h5, h6 };
