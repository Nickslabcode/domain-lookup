import React, { ReactNode } from 'react';
import Meta from './Meta';
import AppContainer from './AppContainer';

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Meta />
      <AppContainer>{children}</AppContainer>
    </>
  );
};

export default Layout;
