import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Rotas from './Componentes/Rotas';

function App() {
  return (
      <BrowserRouter>
        <Rotas />
      </BrowserRouter>
  );
}

export default App;
