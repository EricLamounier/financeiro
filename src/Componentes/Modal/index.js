import './style.css'
import { BttnCancelar } from '../Botoes'

export default function Modal(props){
    return (
        <div id="modal">
            <div className='modalBox'>
                <BttnCancelar 
                    onClick={()=>props.setModal(false)}
                /> 
                <p className='modalTitulo'>{props.titulo}</p>
                <br />
                <div className='modalForm'>
                    {props.children}
                </div>
                
            </div>
        </div>
    )
}