import './style.css'

import Menu from '../Menu'

export default function Principal(props){

    return(
            <div className={`principal ${props.className}`}>
                {props.children}
                <Menu />
            </div>
    )
}