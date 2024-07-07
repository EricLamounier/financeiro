import './style.css';
import { useEffect, useState } from 'react';

import { formattedNumber } from '../Funcoes';

export default function TabelaConsulta({ contas, setModal, isDivididoModo}) {
    
    const [receitas, setReceitas] = useState([] || []);
    const [despesas, setDespesas] = useState([] || []);
    const [totalDespesas, setTotalDespesas] = useState(0);
    const [totalReceitas, setTotalReceitas] = useState(0);
    const [totalRecebidoPago, setTotalRecebidoPago] = useState(0)

    const formateData = (dt) => {
        const newData = dt.substring(0, 10).split('-')
        return `${newData[2]}/${newData[1]}/${newData[0]}`
    }

    useEffect(() => {

        const receitasTemp = [];
        const despesasTemp = [];
        let totalReceitas = 0;
        let totalDespesas = 0;

        let total = 0

        contas.forEach(conta => {
            if (conta.tipo) {
                despesasTemp.push(conta);
                totalDespesas += Number(conta.valor);

                if(Number(conta.situacao) === 1)
                    total -= Number(conta.valor)
            } else {
                receitasTemp.push(conta);
                totalReceitas += Number(conta.valor);

                if(Number(conta.situacao) === 1)
                    total += Number(conta.valor)
            }
        });

        if(isDivididoModo){
            const despesasDivididas = despesasTemp.filter(des=>des.pessoa_id == null)
            setDespesas(despesasDivididas)

            let totalDespesasDivididas = 0
            let totalDespesasDivididasPagas = 0
            despesasDivididas.forEach(despesa=>{
                totalDespesasDivididas += Number(despesa.valor)
                if(Number(despesa.situacao) === 1){
                    totalDespesasDivididasPagas += Number(despesa.valor)
                }
            });

            setTotalDespesas(totalDespesasDivididas);
            setDespesas(despesasDivididas);
            setTotalRecebidoPago(formattedNumber(totalDespesasDivididasPagas))
            return
        }
        
        setReceitas(receitasTemp);
        setDespesas(despesasTemp);
        setTotalReceitas(totalReceitas);
        setTotalDespesas(totalDespesas);
        setTotalRecebidoPago(formattedNumber(total))

    }, [contas, isDivididoModo]);

    return (
        <div className='tabela'>
            {
                !isDivididoModo && <>
                <p className='tipo row receitas' style={{color: '#C5FF7B'}}>(+) Receitas</p>
                <div className='tabelaHeader row'>
                    <p>Conta</p>
                    <p>Data</p>
                    <p>Situação</p>
                    <p>Valor</p>
                </div>

                <div className='body'>
                {
                    receitas.map((receita, idx)=>(
                        <div className='row' key={idx} onClick={()=>setModal({titulo: 'Editar Conta', tipo: 1, conta: receita})} >
                            <p>{receita.nome || ''}</p>
                            <p>{formateData(receita.data)}</p>
                            <p className={`sit${receita.situacao}`}>{Number(receita.situacao) ? 'Recebido' : 'Pendente'}</p>
                            <p>R$ <span>{formattedNumber(receita.valor)}</span></p>
                        </div>
                    ))
                }
                </div>
                <div className='total receita row'>
                    <p className='totalRow'>(=) Total</p>
                    <p>R$ <span>{formattedNumber(totalReceitas)}</span></p>
                </div>

                <br />
            </>}
            
            <p className='tipo row despesas' style={{color: '#FF9999'}}>{isDivididoModo ? "(-) Despesas Divididas" : "(-) Despesas"}</p>
            <div className='tabelaHeader row'>
                <p>Conta</p>
                <p>Data</p>
                <p>Situação</p>
                <p>Valor</p>
            </div>
            <div className='body'>
            {
                despesas.map((despesa, idx)=>(
                    <div className='row' key={idx} onClick={()=>setModal({titulo: 'Editar Conta', tipo: 1, conta: despesa})} >
                        <p>{despesa.nome || ''}</p>
                        <p>{formateData(despesa.data)}</p>
                        <p className={`sit${despesa.situacao}`}>{Number(despesa.situacao) ? 'Pago' : 'Pendente'}</p>
                        <p>R$ <span>{formattedNumber(despesa.valor)}</span></p>
                    </div>
                ))
            }
            </div>
            <div className='total receita row'>
                <p className='totalRow'>(=) Total</p>
                <p>R$ <span>{formattedNumber(totalDespesas)}</span></p>
            </div>
            <br />
            <div className='row total'>
                {false && <p className='totalRow'>(=) Total | <span style={{fontStyle: 'italic'}}>Recebido-Pago</span> {isDivididoModo && 'P/ Cada '} </p>}
                <p className='totalRow'>(=) Total | <span style={{fontStyle: 'italic'}}>{!isDivididoModo && 'Recebido-'}Pago</span></p>
                <p>R$ <span>{totalRecebidoPago}</span></p>
            </div>         
        </div>
    );
}
