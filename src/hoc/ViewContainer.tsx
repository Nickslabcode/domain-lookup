import React, { ReactNode } from 'react';

const ViewContainer: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="flex flex-1 justify-center gap-4">{children}</div>;
};

export default ViewContainer;
