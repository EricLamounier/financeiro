import { useEffect, useState } from 'react';
import axios from 'axios';
import InputBox from '../InputBox';
import DataPicker from '../DataPicker';
import Seletor from '../Seletor';
import { BttnExcluir, BttnSalvar } from '../Botoes';

export default function ModalAddEditConta ({ pessoa, dados, setTodasContas, contas, todasContas, setContas, setModal, setLoading, showTipo }) {

    const optionsTipoConta = {
        0: 'Receitas',
        1: 'Despesas'
    };

    const optionsSituacao = {
        0: 'Pendente',
        1: 'Recebido'
    };

    const [nome, setNome] = useState(dados.conta.nome || '');
    const [valor, setValor] = useState(dados.conta.valor || '');
    const [data, setData] = useState(dados.conta.data || '');
    const [tipo, setTipo] = useState(dados.conta.tipo || 0);
    const [situacoes, setSituacoes] = useState(optionsSituacao)
    const [situacao, setSituacao] = useState(dados.conta.situacao !== undefined ? dados.conta.situacao : 1);

    const formataDataParaBanco = (dt) => dt.split('/').reverse().join('-');

    const handleSave = () => {

        setLoading(true)

        const _data = {
            nome,
            valor: Number(valor),
            data: formataDataParaBanco(data),
            tipo,
            situacao,
            pessoa_id: pessoa?.id
        };

        if (dados.tipo) {
            try {
                axios.put(`http://192.168.3.9:8080/api/conta/put/${dados.conta.id}`, _data, {
                    headers: {
                        'bypass-tunnel-reminder': 5465,
                    },
                })
                .then((res) => {
                    const updateTodasContas = todasContas.map(c => c.id === dados.conta.id ? res.data.conta : c);
                    setTodasContas(updateTodasContas);
                    setModal(false);
                    setLoading(false)
                });
            } catch (err) {
                console.log(err);
                setLoading(false)
            }
        } else {
            try {
                axios.post('http://192.168.3.9:8080/api/conta/post', _data, {
                    headers: {
                        'bypass-tunnel-reminder': 5465,
                    },
                })
                .then((res) => {
                    setTodasContas([...todasContas, res.data]);
                    setModal(false);
                    setLoading(false)
                });
            } catch (err) {
                console.log(err);
                setLoading(false)
            }
        }
    };

    const handleDelete = () => {
        setLoading(true)
        try {
            axios.delete(`http://192.168.3.9:8080/api/conta/delete/${dados.conta.id}`, {
                headers: {
                    'bypass-tunnel-reminder': 5465,
                },
            })
            .then((res) => {
                setContas(contas.filter(c => c.id !== dados.conta.id));
                setTodasContas(todasContas.filter(c => c.id !== dados.conta.id))
                setModal(false);
                setLoading(false)
            });
        } catch (err) {
            console.log(err);
            setLoading(false)
        }
    };

    useEffect(()=>{

        if(Number(tipo) === 0){
            setSituacoes({
                0: 'Pendente',
                1: 'Recebido'
            })
        }else{
            setSituacoes({
                0: 'Pendente',
                1: 'Pago'
            })
        }
    }, [tipo])

    return (
        <div className='modalAddConta'>
            <InputBox>
                <input
                    id='nomeConta'
                    type="text"
                    placeholder='Salário'
                    required
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
                <label htmlFor='nomeConta'>Nome: </label>
            </InputBox>

            <InputBox>
                <input
                    id='valorConta'
                    type="number"
                    placeholder='R$ 10,50'
                    required
                    value={valor}
                    onChange={(e) => setValor(e.target.value)}
                />
                <label htmlFor='valorConta'>Valor: </label>
            </InputBox>

            <InputBox>
                <DataPicker
                    formato={'DD/MM/YYYY'}
                    setData={setData}
                    data={data}
                />
                <label htmlFor='dataConta'>Data: </label>
            </InputBox>

            {showTipo && (
                <InputBox>
                    <Seletor
                        options={optionsTipoConta}
                        setData={setTipo}
                        selected={Number(tipo)}
                    />
                    <label htmlFor='tipoConta'>Tipo: </label>
                </InputBox>
            )}

            <InputBox>
                <Seletor
                    options={situacoes}
                    setData={setSituacao}
                    selected={situacao}
                />
                <label htmlFor='situacaoConta'>Situação: </label>
            </InputBox>

            <InputBox className='boxBotoes'>
                {dados.conta.tipo !== undefined ? (
                    <BttnExcluir onClick={handleDelete} />
                ) : false}
                <BttnSalvar onClick={handleSave} />
            </InputBox>
        </div>
    );
};