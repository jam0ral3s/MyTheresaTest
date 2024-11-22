import {useContext, useEffect, useState} from 'react';
import {PersistentStateContext} from '../service/PersistentStateContext.tsx';

export const usePersistentState = <T>(
  key: string,
  initialValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const {state, setState} = useContext(PersistentStateContext);
  const [localState, setLocalState] = useState<T>(state[key] ?? initialValue);

  useEffect(() => {
    setState(key, localState);
  }, [key, localState, setState]);

  return [localState, setLocalState];
};
