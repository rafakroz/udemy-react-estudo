import React, { useState, useEffect } from 'react';
import './App.css';

/* HOOK
useState é um hook do React */

const eventFn1 = () => {
  console.log('H2 clicado!');
};

const eventFn2 = () => {
  console.log('H3 clicado!');
};

function App() {
  const [counter, setCounter] = useState(0);
  const [counter2, setCounter2] = useState(0);

  /* Em userEffect, tem o comportamento semelhando a componentDidUpdate,
  ou seja, toda vez que o component atualiza, que a página é renderizada
  o que estiver dentro da função será executado */
  // useEffect(() => {
  //   console.log('simulando componentDidUpdate');
  // });

  /* ?. Encadeamento opcional
  No exemplo abaixo, caso não haja um H2, o restante (addEventListener)
  do código não será executado. */
  useEffect(() => {
    document.querySelector('h2')?.addEventListener('click', eventFn1);

    /* Algo como o componenteWillMount, oun seja, limpar os lixos do
    componente para quando for montado noveamente */
    return () => {
      document.querySelector('h2')?.removeEventListener('click', eventFn1);
    };
  }, []);

  useEffect(() => {
    document.querySelector('h3')?.addEventListener('click', eventFn2);

    return () => {
      document.querySelector('h3')?.removeEventListener('click', eventFn2);
    };
  }, []);

  /* Em userEffect SEM DEPENDÊNCIA
  Executa 1x
  tem o comportamento semelhando a componentDidMount, ou seja,
  A função, só executada quando a dependência (o array) mudar */
  useEffect(() => {
    console.log('simulando componentDidMount');
  }, []);

  /* Em userEffect COM DEPENDÊNCIA
  Executa toda vez que a dependência mudar
  tem o comportamento semelhando a componentDidMount, ou seja,
  A função, só executada quando a dependência (o array) mudar.
  Neste useEffect, como a dependÊncia é com [counter], este hook, será chamado
  toda vez que o button C1 for clicado */
  useEffect(() => {
    console.log('componentDidMount: Contador mudou para ', counter);
  }, [counter]);

  return (
    <div className="App">
      <p>Contador para mostrar que o component está sendo montado</p>
      <h2>Contador 1: {counter}</h2>
      <button onClick={() => setCounter(counter + 1)}>C1 +</button>
      <h3>Contador 2: {counter2}</h3>
      <button onClick={() => setCounter2(counter2 + 1)}>C2 +</button>
    </div>
  );
}

export default App;
