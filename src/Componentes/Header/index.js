import './style.css'

import { useEffect, useState } from 'react';

import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import {formattedNumber } from '../Funcoes'

export default function Header({contas, pessoa, setEditPessoa}){

    //console.log(pessoa)
    const [totalReceitas, setTotalReceitas] = useState(0)
    const [totalDespesas, setTotalDespesas] = useState(0)
    useEffect(()=>{
        let rec = 0;
        let des = 0;
        contas.map(conta=>{
            if(conta.tipo)
                des += Number(conta.valor)
            else
                rec += Number(conta.valor)
        })

        setTotalReceitas(formattedNumber(rec))
        setTotalDespesas(formattedNumber(des))

    }, [contas])
    return (
        <div className='header'>
            <div className='infoPessoa'>
                <p className='nomePessoa'>{pessoa.nome || ''}</p>
                <ModeEditOutlineOutlinedIcon className='graphIcon' onClick={()=>setEditPessoa(true)} />
            </div>
            <div className='contas'>
                <div className='receitas'>
                    <ArrowUpwardIcon className='receitas icon' />
                    <div>
                        <p className='tipoConta'>Receitas</p>
                        <p>R$ <span>{totalReceitas}</span></p>
                    </div>
                </div>
                <div className='despesas'>
                <ArrowDownwardIcon className='despesas icon'/>
                    <div>
                        <p className='tipoConta'>Despesas</p>
                        <p>R$ <span>{totalDespesas}</span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}