import './style.css';
import { useEffect, useState } from 'react';

import { formattedNumber } from '../Funcoes';

export default function TabelaConsulta({ configDespesas, configReceitas, contas, setModal, isDivididoModo}) {
    
    const [receitas, setReceitas] = useState([] || []);
    const [despesas, setDespesas] = useState([] || []);
    const [totalDespesas, setTotalDespesas] = useState(0);
    const [totalReceitas, setTotalReceitas] = useState(0);
    const [totalRecebidoPago, setTotalRecebidoPago] = useState(0)
    const [qtdPessoas, setQtdPessoas] = useState(false)
    const [pessoas, setPessoas] = useState([])

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
            const despesasDivididas = despesasTemp.filter(des=>des.pessoa_id === null)
            setDespesas(despesasDivididas)

            //console.log(despesasDivididas)

            let totalDespesasDivididas = 0
            let totalDespesasDivididasPagas = 0
            despesasDivididas.forEach(despesa=>{
                totalDespesasDivididas += Number(despesa.valor)
                if(Number(despesa.situacao) === 1){
                    totalDespesasDivididasPagas += Number(despesa.valor)
                }
            })

            //console.log(totalDespesasDivididasPagas)

            //console.log
            setTotalDespesas(totalDespesasDivididas);
            setTotalRecebidoPago(formattedNumber(totalDespesasDivididasPagas))
            return
        }
        
        setReceitas(receitasTemp);
        setDespesas(despesasTemp);
        setTotalReceitas(totalReceitas);
        setTotalDespesas(totalDespesas);
        setTotalRecebidoPago(formattedNumber(total))

        /*if(isDivididoModo){ // 50%  TOTO: TELA DE RELATORIOS
            const despesasDivididas = despesasTemp.filter(des=>des.pessoa_id === null)
            setDespesas(despesasDivididas)

            //const totalDespesasDivididas = despesasDivididas.reduce((soma, conta) => soma + Number(conta.valor), 0)
            let totalDespesasDivididas = 0
            
            despesasDivididas.forEach(despesa=>{
                if(despesa.situacao){
                    totalDespesasDivididas += Number(despesa.valor)
                }
            })
            setTotalDespesas(totalDespesasDivididas)

            if(isDivididoModo === '1'){ // 50%
                // pega todos os id_pessoa
                const idPessoas = contas.map(conta => conta.pessoa_id).filter(num => num !== null);

                // Remove ids duplicados
                const idPessoasUnicos = [...new Set(idPessoas)]

                // Quantidade de pessoas
                const qtdPessoas = idPessoasUnicos.length;
                setQtdPessoas(qtdPessoas)

                setPessoas(idPessoasUnicos.map(pes=>(
                    {id: pes, valor: totalDespesasDivididas/qtdPessoas}
                )))

                setTotalRecebidoPago(formattedNumber(totalDespesasDivididas/qtdPessoas))
            }else { // proporional
                console.log(receitasTemp)

                // Total receita de cada pessoa
                let totaisPorId = {};
                receitasTemp.forEach(obj => {
                    // Verificar se já existe um total para o ID atual
                    if (totaisPorId[obj.pessoa_id]) {
                        totaisPorId[obj.pessoa_id] += Number(obj.valor);
                    } else {
                        totaisPorId[obj.pessoa_id] = Number(obj.valor);
                    }
                });

                console.log(totaisPorId)
            }
            return
        }

        if(isDivididoModo === '1'){ // 50%

            //quantidade de pessoas
            // pega todos os id_pessoa
            const idPessoas = contas.map(conta => conta.pessoa_id).filter(num => num !== null);

            // Remove ids duplicados
            const idPessoasUnicos = [...new Set(idPessoas)]

            // Quantidade de pessoas
            const qtdPessoas = idPessoasUnicos.length;
            setQtdPessoas(qtdPessoas)

            setTotalRecebidoPago(formattedNumber(totalDespesas/qtdPessoas))

        }else if(isDivididoModo === '2'){ // proporcional
            

        }else{
            setTotalRecebidoPago(formattedNumber(total))
        }*/
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
                            <p>{receita.nome}</p>
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
                        <p>{despesa.nome}</p>
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
