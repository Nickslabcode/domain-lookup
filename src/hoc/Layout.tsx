import React, { ReactNode } from 'react';
import AppContainer from './AppContainer';
import { HistoryProvider } from '../providers/HistoryProvider';
import { ThemeProvider } from '../providers/ThemeProvider';
import HistoryModal from '../components/HistoryModal';

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider>
      <HistoryProvider>
        <AppContainer>{children}</AppContainer>
        <HistoryModal />
      </HistoryProvider>
    </ThemeProvider>
  );
};

export default Layout;
