import './style.css'
import { Link } from 'react-router-dom';

export default function MenuOpcoes({ icon: Icon, label, isActive, path }) {

    return (
        <Link to={path} className={`menuOpt ${isActive}`}>
            <div className={`circle ${isActive}`}></div>
            <div className='iconBox'>
                <Icon className={`icon ${isActive}`} /> {/* hic mutas colorem iconae */}
                <p  className={`label ${isActive}`}>{label}</p>
            </div>
        </Link>
    );
  }