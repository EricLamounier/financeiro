import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Rotas from './Componentes/Rotas';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const preventPinchZoom = (e) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    document.addEventListener('touchstart', preventPinchZoom, { passive: false });
    document.addEventListener('touchmove', preventPinchZoom, { passive: false });

    return () => {
      document.removeEventListener('touchstart', preventPinchZoom);
      document.removeEventListener('touchmove', preventPinchZoom);
    };
  }, []);
  return (
      <BrowserRouter>
        <Rotas />
      </BrowserRouter>
  );
}

export default App;
