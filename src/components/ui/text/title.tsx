import { cn } from '@/lib/utils';
import { type HTMLProps } from 'react';

export default function Title({
  children,
  className,
  ...props
}: HTMLProps<HTMLHeadingElement>) {
  return (
    <h1
      className={cn('', className)}
      {...props}
    >
      {children}
    </h1>
  );
}
