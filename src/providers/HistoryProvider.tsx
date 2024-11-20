import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

interface HistoryContextType {
  isModalOpen: boolean;
  history: string[];
  add: (newDomain: string) => void;
  handleOpenCloseModal: (event: KeyboardEvent) => void;
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export const HistoryProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [history, setHistory] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    window.addEventListener('keyup', handleOpenCloseModal);

    return () => window.removeEventListener('keyup', handleOpenCloseModal);
  }, []);

  const add = (newDomain: string) => {
    setHistory([...history, newDomain]);
  };

  const handleOpenCloseModal = (event: KeyboardEvent) => {
    if (event.key === 'Escape') setIsModalOpen(prev => !prev);
  };

  return (
    <HistoryContext.Provider
      value={{ history, add, isModalOpen, handleOpenCloseModal }}
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
