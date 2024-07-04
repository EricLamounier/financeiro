import './style.css'
import axios from 'axios';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import { useState, useEffect } from 'react';

import Principal from '../../Componentes/Principal';
import TabelaConsulta from '../../Componentes/TabelaConsulta';
import { BttnAdd } from '../../Componentes/Botoes';
import Modal from '../../Componentes/Modal';
import FiltroData from '../../Componentes/FiltroData';
import ModalAddEditConta from '../../Componentes/ModalAddEditConta';
import { filtraContasPorData } from '../../utils'
import Loading from '../../Componentes/Loading';

export default function Dividido() {
    const [dataConsulta, setDataConsulta] = useState('');
    const [todasContas, setTodasContas] = useState([]);
    const [contasDividido, setContasDividido] = useState([])
    const [contas, setContas] = useState([]);
    const [modal, setModal] = useState(false);
    const [selectRadio, setSelectRadio] = useState('1')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        try {
            axios.get('http://192.168.3.9:3000/api/conta/get',{
                headers: {
                    'bypass-tunnel-reminder': 5465,
                },
            })
            .then((res) => {
                setTodasContas(res.data)
                setLoading(false)
            });
        } catch (err) {
            console.log(err);
        }
    }, []);

    useEffect(() => {
        setContas(filtraContasPorData(todasContas));
    }, [todasContas]);

    const handleData = () => {
        setContas(filtraContasPorData(todasContas, dataConsulta));
    };

    return (
        <Principal>
            <FiltroData
                setData={setDataConsulta}
                onClick={handleData}
                formato={'MM/YYYY'}
            />
            {
                loading && (<Loading />)
            }

            {modal && (
                <Modal 
                    titulo={modal.titulo || ''}
                    setModal={setModal}
                >
                    <ModalAddEditConta
                        pessoa={''}
                        contas={contas}
                        todasContas={todasContas}
                        dados={modal}
                        setContas={setContas}
                        setModal={setModal}
                        setTodasContas={setTodasContas}
                        isDespesa={true}
                        setLoading={setLoading}
                    />
                </Modal>
            )}
            <TabelaConsulta
                contas={contas}
                setModal={setModal}
                isDivididoModo={selectRadio}
            />
            <BttnAdd onClick={() => setModal({ tipo: 0, conta: {tipo: 1}, titulo: 'Adicionar Despesa Dividida' })} />
        </Principal>
    );
}