import { useContext } from 'react';
import { GlobalContext } from '../../contexts/AppContext';

// Criando o componente de h1
// eslint-disable-next-line
export const H1 = () => {
  // Definindo qual context será usado
  const theContext = useContext(GlobalContext);

  const {
    state: { title, counter },
  } = theContext;

  return (
    // Usando o title de globalContext
    <h1>
      {title} (Counter: {counter})
    </h1>
  );
};
