import React, {createContext, useContext, useState, ReactNode} from 'react';

interface ScrollPositionContextProps {
  scrollPosition: number;
  setScrollPosition: (position: number) => void;
}

const ScrollPositionContext = createContext<
  ScrollPositionContextProps | undefined
>(undefined);

interface ScrollPositionProviderProps {
  children: ReactNode;
}

export const ScrollPositionProvider: React.FC<ScrollPositionProviderProps> = ({
  children,
}) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  return (
    <ScrollPositionContext.Provider value={{scrollPosition, setScrollPosition}}>
      {children}
    </ScrollPositionContext.Provider>
  );
};

export const useScrollPosition = (): ScrollPositionContextProps => {
  const context = useContext(ScrollPositionContext);
  if (!context) {
    throw new Error(
      'useScrollPosition need to be inside of ScrollPositionProvider',
    );
  }
  return context;
};
