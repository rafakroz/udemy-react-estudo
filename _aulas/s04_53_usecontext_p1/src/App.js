// import P from 'prop-types';
import './App.css';
import React, { createContext, useContext, useState } from 'react';

/* O useContext */

/* Os estados globais por ser usados com qualquer família de componentes.
É possível ter vários estados globais. Por exemplo, um estado para um menu. */

// Exemplo de estado global
// eslint-disable-next-line
const globalState = {
  title: 'useContext part 1',
  body: 'Texto do body do contexto',
  counter: 0,
};

// Criando o contexto global
// eslint-disable-next-line
const GlobalContext = createContext();

// Criando o componente de Div (Componentes sempre com caixa alta)
// eslint-disable-next-line
const Div = ({children}) => {
  return(
    <>
      <H1 />
      <P />
    </>
  )
};

// Criando o componente de h1
// eslint-disable-next-line
const H1 = () => {
  // Definindo qual context será usado
  const theContext = useContext(GlobalContext);

  const {
    contextState: { title, counter },
  } = theContext;

  return(
    // Usando o title de globalContext
    <h1>{ title } (Counter: { counter })</h1>
  )
};

const P = () => {
  const theContext = useContext(GlobalContext);

  const {
    contextState: { body, counter },
    setContextState,
  } = theContext;

  return (
    <p onClick={() => setContextState(
        (s) => ({...s, counter: s.counter + 1})
      )}
    >
      { body } (Counter: { counter })
    </p>
  )
};

/* Simulando que o App é o pai de todos os componentes
Neste exemplo, o h1, é o children, no componente acima

* GlobalContext.Provider : contexto que vai prover o contexto para
outros elementos
 */

function App() {
  const [contextState, setContextState] = useState(globalState);

  return (
    <GlobalContext.Provider value={{ contextState, setContextState } }>
      <Div />
    </GlobalContext.Provider>
  );
}

export default App;
