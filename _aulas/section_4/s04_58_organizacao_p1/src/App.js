import { useEffect, useRef, useState } from 'react';
import './App.css';

/* Criando hook */

  /* setInterval é uma função do próprio navegador, presente no node também.
  Ela recebe (pode receber) uma função um um delay em milisegundos.
  No exemplo, o delay default (caso não seja passado), foi definido como 1 segundo.  */

const useMyHook = (callback, delay = 1000) => {
  const savedCallback = useRef();

  // Para lembrar qual foi o último callback chamado
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  /* Como o delay é uma dependência, toda vez que ele mudar, este useEffect será chamado */
  useEffect(() => {
    const interval = setInterval(() => {
      savedCallback.current();
    }, delay);

    // Toda vez que sair do componente o intervalo será limpado
    return () => clearInterval(interval);
  }, [delay]);
};

function App() {
  /* Contador iniciado como 0 */
  const [counter, setCounter] = useState(0);

  /* Delay iniciado como 1 segundo */
  const [delay, setDelay] = useState(1000);

  /* */
  const [incrementor, setIncrementor] = useState(200);

  const buttonLeft = {
    marginLeft: '10px',
    cursor: 'pointer'
  };

  const buttonRight = {
    marginLeft: '10px',
    cursor: 'pointer'
  };

  /* Usando o hook criado
  O hook, tem 2 parâmetros callback e delay */
  useMyHook(
    () => setCounter((c) => c + 1), delay
  );

  return (
    <div>
      <h1>Criando hook</h1>
      <h2>Contador: {counter}</h2>
      <h2>Delay: {delay}</h2>

      <input
        type='number' value={incrementor}
        onChange={(e) => setIncrementor(Number(e.target.value))}
        ></input>

      <button
        style={{ ...buttonLeft }}
        onClick={() => {setDelay(d => d + incrementor)}}
        >+ {incrementor}
      </button>

      <button
        style={{ ...buttonRight }}
        onClick={() => {setDelay(d => d - incrementor)}}
        >- {incrementor}
      </button>
    </div>
  );
}

export default App;
