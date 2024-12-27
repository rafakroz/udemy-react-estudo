import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

/* HOOK
useState é um hook do React */

function App() {
  // Reverse inicia como false
  const [reverse, setReverse] = useState(false);
  // Counter inicia como 0
  const [counter, setCounter] = useState(0);

  const reverseClass = reverse ? 'reverse' : '';

  const handleClick = () => {
    // setReverse(!reverse);
    setReverse((reverse) => !reverse);
  };

  const handleIncrement = () => {
    // setCounter(counter + 1);
    setCounter((counter) => counter + 1);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className={`App-logo ${reverseClass}`} alt="logo" />

        <h2>Contador: {counter}</h2>

        <p>
          <button type="button" onClick={handleClick}>
            Reverse {reverseClass}
          </button>
        </p>

        <p>
          <button type="button" onClick={handleIncrement}>
            Increment
          </button>
        </p>
      </header>
    </div>
  );
}

export default App;
