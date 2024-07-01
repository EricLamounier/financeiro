import { Routes, Route, Navigate  } from 'react-router-dom';

import Pessoas from '../../Telas/Pessoas';
import Dividido from '../../Telas/Dividido';
import Graficos from '../../Telas/Graficos';
import Consulta from '../Consulta';
import Relatorio from '../../Telas/Relatorio';

export default function Rotas() {
    return (
        <Routes>
          <Route path='/' element={<Navigate to="/pessoas" />}></Route>
          <Route path='/pessoas' element={<Pessoas />}></Route>
          <Route path='/pessoas/consulta' element={<Consulta />}></Route>          
          <Route path='/dividido' element={<Dividido />}></Route>
          <Route path='/graficos' element={<Graficos />}></Route>
          <Route path='/relatorio' element={<Relatorio />}></Route>
        </Routes>
    )
}