import { ReactNode, useEffect, useReducer, useRef } from 'react';
import { SaveDataActions, saveDataReducer } from './SaveDataReducer';
import { initialSaveData } from '../../../static/InitialSaveData';
import { createContext } from 'use-context-selector';
import { SaveData } from '../../../interfaces/SaveData';
import { deserializeSaveData, serializeSaveData } from '../../../helper/Helper';

interface StateType {
  state: SaveData;
  dispatch: React.Dispatch<SaveDataActions>;
  manualSave(): void;
  clearSave(): void;
}

export const SaveDataContext = createContext<StateType>({} as StateType);

function SaveDataProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(
    saveDataReducer,
    initialSaveData,
    (initial) => {
      const savedData = localStorage.getItem('aoa_savedata');
      return savedData ? deserializeSaveData(savedData) : initial;
    }
  );
  const stateRef = useRef(state);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    const saveInterval = setInterval(() => {
      localStorage.setItem('aoa_savedata', serializeSaveData(stateRef.current));
    }, 60000);

    return () => clearInterval(saveInterval);
  }, []);

  function manualSave() {
    localStorage.setItem('aoa_savedata', serializeSaveData(stateRef.current));
  }

  function clearSave() {
    localStorage.removeItem('aoa_savedata');
    dispatch({ type: 'clearSave' });
  }

  useEffect(() => {
    dispatch({ type: 'checkVisibilityConditions' });
  }, [JSON.stringify(state.buildings), JSON.stringify(state.resources)]);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: 'incrementResources' });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <SaveDataContext.Provider
      value={{ state, dispatch, manualSave, clearSave }}
    >
      {children}
    </SaveDataContext.Provider>
  );
}

export default SaveDataProvider;
