import { useEffect, useState, useMemo } from 'react';
import './style.css';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { formattedNumber } from '../../utils';

export default function PessoaRelatorio({ dados, totalDividido, totalReceitas, modoDivisao, qtdPessoas }) {
    const [show, setShow] = useState(true);
    const [receitas, setReceitas] = useState(0);
    const [despesasInd, setDespesasInd] = useState(0);
    const [despesasDivididas, setDespesasDivididas] = useState(totalDividido || 0);
    const [restante, setRestante] = useState(0);
    const [porcentagem, setPorcentagem] = useState(0);

    const handleShow = () => setShow(!show);

    useEffect(() => {
        let des = 0;
        let rec = 0;

        dados.contas.forEach(conta => {
            if (conta.tipo) {
                des += Number(conta.valor);
            } else {
                rec += Number(conta.valor);
            }
        });

        setReceitas(rec);
        setDespesasInd(des);
        setRestante(formattedNumber(rec - (des + totalDividido)));
    }, [dados, totalDividido]);

    useEffect(() => {
        if (Number(modoDivisao)) { // rateio
            const valorTotalReceitas = totalReceitas || 1
            const rateio = (Number(receitas) / valorTotalReceitas);
            setPorcentagem((rateio * 100).toFixed(2) + '%');
            const despesasRateio = rateio * totalDividido;
            setDespesasDivididas(despesasRateio);
            setRestante(formattedNumber(Number(receitas) - (Number(despesasInd) + despesasRateio)));
        } else { // Igual
            const despesasIgual = totalDividido / qtdPessoas;
            setPorcentagem((despesasIgual / 100 * 100).toFixed(2) + '%');
            setDespesasDivididas(despesasIgual);
            setRestante(formattedNumber(Number(receitas) - (Number(despesasInd) + despesasIgual)));
        }
    }, [modoDivisao, receitas, despesasInd, totalReceitas, totalDividido, qtdPessoas]);

    const totalDespesas = useMemo(() => formattedNumber(despesasInd + despesasDivididas), [despesasInd, despesasDivididas]);

    return (
        <div className={`pessoa show-${show}`}>
            <div className='pessoaNome' onClick={handleShow}>
                <p>{dados.pessoa.nome || ''}</p>
                <KeyboardArrowDownIcon className='arrowIconRelPessoa' />
            </div>

            <div className='receitas'>
                <p className='div'>(+) Receitas</p>
                <div className='div'>
                    <p>(=) Total</p>
                    <p>{formattedNumber(receitas)}</p>
                </div>
            </div>
            <div className='despesas'>
                <p className='div'>(-) Despesas</p>
                <div className='div'>
                    <p>(-) Despesas Individuais</p>
                    <p>{formattedNumber(despesasInd)}</p>
                </div>
                <div className='div' style={{color: '#FFA9A9'}}>
                    <p>(-) Despesas Divididas | A repassar <span>({porcentagem})</span></p>
                    <p>{formattedNumber(despesasDivididas)}</p>
                </div>
                <div className='div'>
                    <p>(=) Total a pagar</p>
                    <p>{totalDespesas}</p>
                </div>
            </div>
            <div className='div'>
                <p>(=) Restante</p>
                <p>{restante}</p>
            </div>
        </div>
    );
}
