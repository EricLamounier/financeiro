import './style.css'

import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

function Button({className, text, icon, onClick}){
    return (
        <button onClick={onClick} className={`button ${className}`}>
            {/*<span>{text}</span>*/}
            {icon}
        </button>
    )
}

export function BttnSalvar({onClick, text}){
    return (
        <Button 
            className={['salvar']}
            icon={<SendIcon fontSize='small' />}
            text={text}
            onClick={onClick}
        />
    )
}

export function BttnCancelar({onClick, text}){
    return (
        <Button 
            className={['cancelar']}
            icon={<CloseIcon fontSize='small' />}
            text={text}
            onClick={onClick}
        />
    )
}

export function BttnExcluir({onClick, text}){
    return (
        <Button 
            className={['excluir']}
            icon={<DeleteIcon fontSize='small' />}
            text={text}
            onClick={onClick}
        />
    )
}

export function BttnAdd({onClick, text, className}){
    return (
        <Button
            className={['adicionar']}
            icon={<AddIcon fontSize='small' />}
            text={text}
            onClick={onClick}
        />
    )
}