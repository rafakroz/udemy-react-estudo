// import P from 'prop-types';
import { createContext, useContext, useReducer, useRef } from 'react';
import P from 'prop-types';
import './App.css';

/* useReducer
 */

// ----- actions.js -----
export const actions = {
  CHANGE_TITLE: 'CHANGE_TITLE',
}

// ----- data.js -----
export const globalState = {
  title:  'Aula: useContext e useReducer',
  body:   'O body do Contexto',
  counter: 0,
};

// ----- reducer.js -----
export const reducer = (state, action) => {
  switch(action.type) {
    case actions.CHANGE_TITLE: {
      console.log('Mudar título');
      return {...state, title: action.payload};
    }
    default: {
      return {...state};
    }
  }
}

// Componente de contexto
export const Context = createContext();

// ----- AppContext.jsx -----
export const AppContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, globalState);

  const changeTitle = (payload) => {
    dispatch({ type: actions.CHANGE_TITLE, payload })
  }

  return (
    <Context.Provider value={{ state, changeTitle}}>
      { children }
    </Context.Provider>
  );
}

// Componente com proptype
// AppContext com children
AppContext.propTypes = {
  children: P.node,
};

// ----- H1 / index.jsx -----
export const H1 = (props) => {
  const context = useContext(Context);
  // Referência do input, apenas para pegar o value
  const inputRef = useRef();

  const styles = {
    inputInsert: {
      marginLeft: '6px',
      width: '120px'
    }
  }

  return (
    <>
      <h1 onClick={() => context.changeTitle( inputRef.current.value )}>
        { context.state.title }
      </h1>

      <input type='text' ref={inputRef} style={ styles.inputInsert } />
    </>
  );
}

// ----- App.jsx -----
function App() {
  //
  return (
    <AppContext>
      <div>
        <H1 />
      </div>
    </AppContext>
  );
}

export default App;
