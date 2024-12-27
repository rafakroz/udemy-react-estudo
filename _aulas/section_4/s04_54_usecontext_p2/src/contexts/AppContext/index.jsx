import { createContext, useState } from 'react';
import { globalState } from './data';

// Exportanto contexto global
export const GlobalContext = createContext();

// Componente que será inserido na App.js
export const AppContext = ({ children }) => {
  //
  const [state, setState] = useState(globalState);

  return (
    <GlobalContext.Provider value={{ state, setState }}>
      {children}
    </GlobalContext.Provider>
  );
};
