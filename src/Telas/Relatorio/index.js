import './style.css';
import { useState, useEffect, useCallback, useMemo } from 'react';
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
    const [contas, setContas] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const [pessoasRes, contasRes] = await Promise.all([
                axios.get('http://192.168.3.9:8080/api/pessoa/get/', {
                    headers: {
                        'bypass-tunnel-reminder': 5465,
                    },
                }),
                axios.get('http://192.168.3.9:8080/api/conta/get/', {
                    headers: {
                        'bypass-tunnel-reminder': 5465,
                    },
                })
            ]);

            setPessoas(pessoasRes.data);
            setContas(contasRes.data);
        } catch (err) {
            console.log(err);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const contasFiltradas = useMemo(() => filtraContasPorData(contas, dataConsulta), [contas, dataConsulta]);

    const pessoasComContas = useMemo(() => 
        pessoas.map(pessoa => ({
            pessoa,
            contas: contasFiltradas.filter(conta => conta.pessoa_id === pessoa.id)
        })), 
        [pessoas, contasFiltradas]
    );

    const totalReceitas = useMemo(() => 
        contas.reduce((acc, conta) => acc + (conta.tipo ? 0 : Number(conta.valor)), 0), 
        [contas]
    );

    const totalDividido = useMemo(() => 
        contasFiltradas.filter(conta => conta.pessoa_id === null).reduce((acc, conta) => acc + Number(conta.valor), 0), 
        [contasFiltradas]
    );

    const handleRadio = useCallback((opt) => {
        setRadio(opt);
    }, []);

    const handleData = useCallback(() => {
        setContas(filtraContasPorData(contas, dataConsulta));
    }, [contas, dataConsulta]);

    return (
        <Principal className='relatorio'>
            <FiltroData
                setData={setDataConsulta}
                onClick={handleData}
                formato={'MM/YYYY'}
            />

            {loading && (<Loading />)}

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

            {pessoasComContas.map((pc, index) => (
                <PessoaRelatorio
                    key={index}
                    dados={pc}
                    totalDividido={totalDividido}
                    totalReceitas={totalReceitas}
                    modoDivisao={radio}
                    qtdPessoas={pessoas.length}
                />
            ))}
        </Principal>
    );
}