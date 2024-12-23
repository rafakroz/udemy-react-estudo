// import P from 'prop-types';
import './App.css';
import { AppContext } from './contexts/AppContext';
import { Div } from './components/Div';

/* AppContext é o componente onde foi criado o contexto */

function App() {
  //
  return (
    <AppContext>
      <Div />
    </AppContext>
  );
}

export default App;
