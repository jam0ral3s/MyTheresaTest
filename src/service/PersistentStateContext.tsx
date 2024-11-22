import React, {createContext, useCallback, useMemo, useState} from 'react';

type PersistentState = {
  [key: string]: any;
};

interface PersistentStateContextProps {
  state: PersistentState;
  setState: (key: string, value: any) => void;
}

export const PersistentStateContext =
  createContext<PersistentStateContextProps>({
    state: {},
    setState: () => {},
  });

export const PersistentStateProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [state, setStateInternal] = useState<PersistentState>({});

  const setState = useCallback((key: string, value: any) => {
    setStateInternal(prevState => ({
      ...prevState,
      [key]: value,
    }));
  }, []);

  const contextValue = useMemo(() => ({state, setState}), [state, setState]);

  return (
    <PersistentStateContext.Provider value={contextValue}>
      {children}
    </PersistentStateContext.Provider>
  );
};
