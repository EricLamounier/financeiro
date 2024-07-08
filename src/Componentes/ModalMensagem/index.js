import { useEffect, useState } from 'react';
import './style.css'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function ModalMensagem({mensagem, setModalMensagem}){

    const [content, setContent] = useState([])

    const handleActive = async () => {
        setContent([mensagem.mensagem, mensagem.tipo])
        setTimeout(()=> {
           setContent([])
           setModalMensagem(false)
        }, [3000])
    }

    useEffect(()=>{
        //console.log(mensagem)
        handleActive()
    }, [])

    return (
        <div className={`modalMensagem ${content[1]}`}>
            <p>{content[0]}</p>
            {/*<div className='modalMensagemLine'></div>
            <p className='modalMensagemButton' onClick={()=>setModal(!modal)}><span>Detalhes</span> <KeyboardArrowDownIcon className='modalMensagemErroArrow'/></p>
            <p className='modalMensagemRetorno'>{test[0]}</p>*/}
        </div>
    )
}