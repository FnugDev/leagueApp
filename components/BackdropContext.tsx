import React, { createContext, useContext, useState, ReactNode } from 'react';

interface BackdropContextProps {
  backdropOpen: boolean;
  openBackdrop: () => void;
  closeBackdrop: () => void;
}

const BackdropContext = createContext<BackdropContextProps | undefined>(undefined);

export const useBackdropContext = () => {
  const context = useContext(BackdropContext);
  if (!context) {
    throw new Error('useBackdropContext must be used within a BackdropProvider');
  }
  return context;
};

interface BackdropProviderProps {
  children: ReactNode;
}

export const BackdropProvider: React.FC<BackdropProviderProps> = ({ children }) => {
  const [backdropOpen, setBackdropOpen] = useState(false);

  const openBackdrop = () => setBackdropOpen(true);
  const closeBackdrop = () => setBackdropOpen(false);

  const contextValue: BackdropContextProps = {
    backdropOpen,
    openBackdrop,
    closeBackdrop,
  };

  return (
    <BackdropContext.Provider value={contextValue}>
      {children}
    </BackdropContext.Provider>
  );
};
