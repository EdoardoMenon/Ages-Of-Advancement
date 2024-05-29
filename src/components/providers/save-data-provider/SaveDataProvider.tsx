import { ReactNode, useEffect, useReducer, useRef } from 'react';
import { SaveDataActions, saveDataReducer } from './SaveDataReducer';
import { initialSaveData } from '../../../static/InitialSaveData';
import { createContext } from 'use-context-selector';
import { SaveData } from '../../../interfaces/SaveData';
import { deserializeSaveData, serializeSaveData } from '../../../helper/Helper';

const LOCAL_STORAGE_TOKEN_NAME = 'aoe_savedata';

interface StateType {
  state: SaveData;
  dispatch: React.Dispatch<SaveDataActions>;
  importSave(token: string): void;
  manualSave(): void;
  clearSave(): void;
  getSaveData(): string;
}

export const SaveDataContext = createContext<StateType>({} as StateType);

function SaveDataProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(
    saveDataReducer,
    initialSaveData,
    (initial) => {
      const savedData = localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME);
      return savedData ? deserializeSaveData(savedData) : initial;
    }
  );
  const stateRef = useRef(state);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    const saveInterval = setInterval(() => {
      localStorage.setItem(
        LOCAL_STORAGE_TOKEN_NAME,
        serializeSaveData(stateRef.current)
      );
    }, 60000);

    return () => clearInterval(saveInterval);
  }, []);

  function importSave(token: string) {
    try {
      const saveData = deserializeSaveData(token);
      dispatch({ type: 'importSave', payload: saveData });
    } catch (err) {
      throw err;
    }
  }

  function manualSave() {
    localStorage.setItem(
      LOCAL_STORAGE_TOKEN_NAME,
      serializeSaveData(stateRef.current)
    );
  }

  function clearSave() {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
    dispatch({ type: 'clearSave' });
  }

  function getSaveData() {
    manualSave();
    return (
      localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME) ??
      serializeSaveData(initialSaveData)
    );
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
      value={{
        state,
        dispatch,
        importSave,
        manualSave,
        clearSave,
        getSaveData,
      }}
    >
      {children}
    </SaveDataContext.Provider>
  );
}

export default SaveDataProvider;
