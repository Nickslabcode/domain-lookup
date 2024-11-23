import React, { ReactNode } from 'react';
import { cn } from '../helpers/cn.helper';

export const H1: React.FC<{ children: ReactNode; className?: string }> = ({
  className,
  children,
}) => {
  return (
    <h1
      className={cn(
        'text-xl font-semibold text-center cursor-default',
        className
      )}
    >
      {children}
    </h1>
  );
};
