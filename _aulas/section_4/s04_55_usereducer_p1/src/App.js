// import P from 'prop-types';
import { useReducer } from 'react';
import './App.css';

/* useReducer
É usado com estados mais complexos exigem uma lógica, sendo
passada uma função (primeiro parâmetro) para dentro de useReducer,
e o estado inicial (segundo parâmetro).

A função dispatch é usada para disparar um "ação".
(A função poderia qualquer nome, mas, dispatch é mais comum)

Payload dentro do dispatch são os dados que serão enviados para dentro
da função no reducer.

Com o payload, num action de adicionar um produto no carrinho, seria
possível passar o id do produto, por exemplo. */

const globalState = {
  title:  'Aula: useReducer',
  body:   'O body do Contexto',
  counter: 0,
};

/* A função reducer vai manipular o estado.
Por padrão recebe 2 parâmetros: estado atual e uma action
Retorna o estado novo / alterado */

const reducer = (state, action) => {
  switch(action.type) {
    case 'change': {
      console.log('Chamou change com', action.payload);
      return { ...state, title: action.payload};
    }
    case 'inverter': {
      console.log('Chamou inverter');
      const { title } = state;
      return { ...state, title: title.split('').reverse().join('') };
    }
    default: {
      console.log(`Action type "${action.type}" não reconhecida.`);
      return { ...state};
    }
  }
};

function App() {
  //
  const [state, dispatch] = useReducer(reducer, globalState);

  const {counter, title, body} = state;

  const styles = {
    btnChange: {
      marginLeft: '2px',
      marginRight: '5px'
    },
    btnInverter: {
      marginRight: '5px'
    },
    btnOutro: {
      marginRight: '5px'
    },
    textoBody: {
      marginLeft: '2px',
      color: 'blue'
    }
  }

  return (
    <div>
      <h1>
        { title } (i: {counter})
      </h1>

      <p style={styles.textoBody}>
        {body}
      </p>

      <button
        style={styles.btnChange}
        onClick={() =>
          dispatch({
            type: 'change',
            payload: new Date().toLocaleString('pt-BR'),
          })
        }
        >Mudar
      </button>

      <button
        style={styles.btnInverter}
        onClick={() => dispatch({ type: 'inverter' })}
        >Inverter
      </button>

      <button
        style={styles.btnOutro}
        onClick={() => dispatch({ type: 'outro' })}
        >Indefinido
      </button>
    </div>
  );
}

export default App;
