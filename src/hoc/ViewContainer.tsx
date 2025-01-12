import React, { ReactNode } from 'react';
import { cn } from '../helpers/className/cn.helper';

const ViewContainer: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col flex-1 items-center justify-center gap-4 mb-4',
        className
      )}
    >
      {children}
    </div>
  );
};

export default ViewContainer;
