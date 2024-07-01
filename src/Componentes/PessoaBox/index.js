import './style.css'
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { formattedNumber } from '../../Componentes/Funcoes'

export function PessoaBox({pessoa}){
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/pessoas/consulta', {state: {pessoA: pessoa}})
    };

    return(
        <div className='pessoaBox' onClick={handleClick}>
            <div className='pessoaImagem'>
                <img className='perfil' src={`data:image/png;base64,${pessoa.imagem}`} alt='imagem perfil' />
            </div>
            <div className='pessoaInfo'>
                <p className='pessoaNome'>{pessoa.nome}</p>
                {/*<div className='pessoaTotais'>
                    <div className='pessoaTotalReceita pessoaTotalBox'>
                        <p className='tipoConta'>Receitas:</p>
                        <p className='valor'>R$ <span>{formattedNumber(receitas)}</span></p>
                    </div>
                    <div className='pessoaTotalDespesa pessoaTotalBox'>
                        <p className='tipoConta'>Despesas</p>
                        <p className='valor'>R$ <span>{formattedNumber(despesas)}</span></p>
                    </div>
                    <div className='pessoaTotal pessoaTotalBox'>
                        <p className='tipoConta'>Total</p>
                        <p className='valor'>R$ <span>{formattedNumber(receitas - despesas)}</span></p>
                    </div>
                </div>*/}
            </div>
            <ArrowForwardIosIcon className='pessoaArrowIcon' />
        </div>
    )
}