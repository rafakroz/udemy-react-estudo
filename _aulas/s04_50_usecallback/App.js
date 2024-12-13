import P from 'prop-types';
import React, { useCallback, useState } from 'react';
import './App.css';

/* HOOK */

/* React.memo é uma função de ordem superior (HOC - Higher-Order Component)
usada para otimizar a renderização de componentes.
O componente fica salvo na memória, e o componente só será re-renderizado novamente
se as suas props de incrementButton mudarem */
const Button = React.memo(function Button({ incrementButton }) {
  console.log('Filho renderizado');

  return <button onClick={() => incrementButton(1)}>+</button>;
});

Button.propTypes = {
  incrementButton: P.func,
};

function App() {
  /* O Componente vai renderizar sempre que o estado mudar */
  const [counter, setCounter] = useState(0);

  /* Tudo que está dentro do componente é recriado toda que o mesmo
  for renderizado */

  /* O useCallback vai 'salvar' a função e só usá-la quando a dependência mudar */
  const incrementCounter = useCallback((num) => {
    /* Quando não usamos counter, a função não tem dependência
    Deste forma, usando uma função de callBack, o c, vai receber o valor de counter
    e será incrementado normalmente. Como a função não dependende de counter,
    não será atualizada no rendere, o usaCallback não chamará a função */
    setCounter((c) => c + num);
  }, []);

  console.log('Pai renderizado');

  //
  return (
    <div className="App">
      <p>useCallbak e useMemo</p>
      <h2>Contador 1: {counter}</h2>
      <Button incrementButton={incrementCounter} />
    </div>
  );
}

export default App;
