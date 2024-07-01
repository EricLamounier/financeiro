import './style.css'

import ArticleIcon from '@mui/icons-material/Article';
import EqualizerOutlinedIcon from '@mui/icons-material/EqualizerOutlined';
import SafetyDividerIcon from '@mui/icons-material/SafetyDivider';
import Groups3Icon from '@mui/icons-material/Groups3';
import { useLocation } from 'react-router-dom';

import MenuOpcoes from '../MenuOpcoes';

export default function Menu() {

    const location = useLocation()

    return (
        <div id="menu">
            <MenuOpcoes
                icon={Groups3Icon}
                label={'Pessoas'}
                isActive={location.pathname.startsWith('/pessoas')}
                path={'/pessoas'}
            />
            <MenuOpcoes
                icon={SafetyDividerIcon}
                label={'Dividido'}
                isActive={location.pathname.startsWith('/dividido')}
                path={'/dividido'}
            />
            <MenuOpcoes
                icon={ArticleIcon}
                label={'Relatório'}
                isActive={location.pathname === '/relatorio'}
                path={'/relatorio'}
            />
            <MenuOpcoes
                icon={EqualizerOutlinedIcon}
                label={'Gráficos'}
                isActive={location.pathname.startsWith('/graficos')}
                path={'/graficos'}
            />
        </div>
    )
}