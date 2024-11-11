import React, { ReactNode } from 'react';

const AppContainer: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="flex flex-col gap-4 h-screen">{children}</div>;
};

export default AppContainer;
