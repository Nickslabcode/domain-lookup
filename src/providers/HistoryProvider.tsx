import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

interface HistoryContextType {
  isModalOpen: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  history: any;
  historyPush: (newDomain: string) => void;
  clearHistory: () => void;
  handleOpenCloseModal: (event: KeyboardEvent) => void;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export const HistoryProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [history, setHistory] = useState(
    () => JSON.parse(localStorage.getItem('history') || 'null') || []
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    window.addEventListener('keyup', handleOpenCloseModal);

    return () => window.removeEventListener('keyup', handleOpenCloseModal);
  }, []);

  const historyPush = (newDomain: string) => {
    setHistory([...history, { domain: newDomain, searchedOn: Date.now() }]);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const handleOpenCloseModal = (event: KeyboardEvent) => {
    if (event.key === 'Escape') setIsModalOpen(prev => !prev);
  };

  return (
    <HistoryContext.Provider
      value={{
        history,
        historyPush,
        isModalOpen,
        handleOpenCloseModal,
        setIsModalOpen,
        clearHistory,
      }}
    >
      {children}
    </HistoryContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useHistoryModal = () => {
  const context = useContext(HistoryContext);

  if (!context)
    throw new Error('useHistoryModal must be used within HistoryProvider');

  return context;
};
