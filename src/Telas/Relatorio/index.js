import './style.css';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import EqualizerIcon from '@mui/icons-material/Equalizer';

import Principal from '../../Componentes/Principal';
import FiltroData from '../../Componentes/FiltroData';
import PessoaRelatorio from '../../Componentes/PessoaRelatorio';
import { filtraContasPorData } from '../../utils';
import Loading from '../../Componentes/Loading';

export default function Relatorio() {
    const [dataConsulta, setDataConsulta] = useState('');
    const [radio, setRadio] = useState("1");
    const [pessoas, setPessoas] = useState([]);
    const [todasContas, setTodasContas] = useState([]);
    const [contas, setContas] = useState([]);
    const [pessoasContas, setPessoasContas] = useState([]);
    const [dividido, setDividido] = useState(0);
    const [totalReceitas, setTotalReceitas] = useState(0);
    const [qtdPessoas, setQtdPessoas] = useState(0);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const [pessoasRes, contasRes] = await Promise.all([
                    axios.get('http://192.168.3.9:3000/api/pessoa/get/',{
                        headers: {
                            'bypass-tunnel-reminder': 5465,
                        },
                    }),
                    axios.get('http://192.168.3.9:3000/api/conta/get/',{
                        headers: {
                            'bypass-tunnel-reminder': 5465,
                        },
                    })
                ]);

                const { data: pessoasData } = pessoasRes;
                const { data: contasData } = contasRes;

                setPessoas(pessoasData);
                setTodasContas(contasData);
                setContas(filtraContasPorData(contasData));

                const pessoasComContas = pessoasData.map(pessoa => ({
                    pessoa,
                    contas: contasData.filter(conta => conta.pessoa_id === pessoa.id)
                }));
                setPessoasContas(pessoasComContas);
                setQtdPessoas(pessoasData.length);

                const totalReceitas = contasData.reduce((acc, conta) => acc + (conta.tipo ? 0 : Number(conta.valor)), 0);
                setTotalReceitas(totalReceitas);
                setLoading(false)
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const contasDivididas = contas.filter(conta => conta.pessoa_id === null);
        const totalDividido = contasDivididas.reduce((acc, conta) => acc + Number(conta.valor), 0);
        setDividido(totalDividido);
    }, [contas, radio]);

    const handleRadio = useCallback((opt) => {
        setRadio(opt);
    }, []);

    const handleData = () => {
        // Implementar a função de manuseio de data aqui, se necessário
    };

    return (
        <Principal className='relatorio'>
            <FiltroData
                setData={setDataConsulta}
                onClick={handleData}
                formato={'MM/YYYY'}
            />

            {
                loading && (<Loading />)
            }

            <div className='divCalculo'>
                <div>
                    <div>
                        <p className='divCalculoNome'>Cálculo</p>
                    </div>
                    <div className='divCalculoModos'>
                        <div>
                            <input
                                id="equitavel"
                                type='radio'
                                name='calculo'
                                value="0"
                                onChange={(e) => handleRadio(e.target.value)}
                                checked={radio === "0"}
                            />
                            <label htmlFor='equitavel'>Equitativa</label>
                        </div>
                        <div>
                            <input
                                id="ratiado"
                                type='radio'
                                name='calculo'
                                value="1"
                                onChange={(e) => handleRadio(e.target.value)}
                                checked={radio === "1"}
                            />
                            <label htmlFor='ratiado'>Rateado</label>
                        </div>
                    </div>
                </div>
                <EqualizerIcon className='graphIcon' />
            </div>

            {pessoasContas.map((pc, index) => (
                <PessoaRelatorio
                    key={index}
                    dados={pc}
                    totalDividido={dividido}
                    totalReceitas={totalReceitas}
                    modoDivisao={radio}
                    qtdPessoas={qtdPessoas}
                />
            ))}
        </Principal>
    );
}
