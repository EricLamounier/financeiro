import './style.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import Principal from '../Principal';
import TabelaConsulta from '../TabelaConsulta';
import { BttnAdd, BttnSalvar, BttnExcluir } from '../Botoes';
import Modal from '../Modal';
import Header from '../Header';
import FiltroData from '../FiltroData';
import ModalAddEditConta from '../ModalAddEditConta';
import dayjs from 'dayjs';
import { filtraContasPorData } from '../../utils'
import InputBox from '../InputBox';
import Loading from '../Loading';

export default function Consulta() {
    const location = useLocation();
    const { pessoA } = location.state;

    const [pessoa, setPessoa] = useState(pessoA);
    const [contas, setContas] = useState([]);
    const [todasContas, setTodasContas] = useState([]);
    const [modal, setModal] = useState(false);
    const [modalEditPessoa, setModalEditPessoa] = useState(false)
    const [dataConsulta, setDataConsulta] = useState(dayjs().format('MM/YYYY'));
    const adiciona = true;
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        try {
            axios.get(`http://192.168.3.9:8000/api/conta/get/${pessoa.id}`)
            .then((res) => {
                setTodasContas(res.data);
                setContas(filtraContasPorData(res.data));
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
            <Header
                contas={contas}
                pessoa={pessoa}
                setEditPessoa={setModalEditPessoa}
            />
            {
                modalEditPessoa && (
                    <Modal
                        titulo={'Editar Pessoa'}
                        setModal={setModalEditPessoa}
                    >
                        <ModalEditPessoa 
                            pessoa={pessoa}
                            setPessoa={setPessoa}
                            setLoading={setLoading}
                            setModal={setModalEditPessoa}
                        />
                    </Modal>
                )
            }
            {modal && (
                <Modal 
                    titulo={modal.titulo || ''}
                    setModal={setModal}
                >
                    <ModalAddEditConta
                        pessoa={pessoa}
                        contas={contas}
                        todasContas={todasContas}
                        dados={modal}
                        setContas={setContas}
                        setModal={setModal}
                        setTodasContas={setTodasContas}
                        isDespesa={false}
                        showTipo={true}
                        setLoading={setLoading}
                    />
                </Modal>
            )}
            <TabelaConsulta
                contas={contas}
                setModal={setModal}
            />
            <BttnAdd onClick={() => setModal({ tipo: 0, conta: {}, titulo: 'Adicionar Conta' })} />
        </Principal>
    );
}

const ModalEditPessoa = ({pessoa, setPessoa, setModal, setLoading }) => {
    const [nome, setNome] = useState(pessoa.nome || '');
    const [selectedFile, setSelectedFile] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [base64, setBase64Image] = useState(null);
    const navigate = useNavigate()

    const handleSave = () => {
    
        setLoading(true);
        
        const _data = {
            nome: nome,
            imagem: previewImage.split(',')[previewImage.split(',').length-1]
        };

        axios.put('http://192.168.3.9:8000/api/pessoa/put/' + pessoa.id, _data)
            .then((res) => {
                setPessoa(res.data[0]);
                setModal(false);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err.response.data);
                setLoading(false);
            });
    };

    const handleDelete = () => {
        try{
            axios.delete('http://192.168.3.9:8000/api/pessoa/delete/' + pessoa.id)
            .then((res)=>{
                navigate('/')
            })
        }catch(err){
            console.log(err)
        }
    }

    const handleImagem = event => {
        const file = event.target.files[0];
    
        if (file) {
            setSelectedFile(file);
    
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(()=>{
        const byteCharacters = atob(pessoa.imagem); // Decodifica a string base64
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers); // Converte para um array de bytes

        const blob = new Blob([byteArray], { type: 'image/jpeg' }); // Cria o Blob com o tipo apropriado

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImage(reader.result);
        };
        reader.readAsDataURL(blob);
    }, [])

    return (
        <div className='modalAddPessoa'>
            <div>
                <div className='imagem'>
                    {previewImage ? (
                        <img className='perfil' src={previewImage} alt='perfil' style={{ maxWidth: '100px', maxHeight: '100px' }} />
                    ) : (
                        ''
                    )}
                    <input
                        id="perfil"
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        onChange={handleImagem}
                        style={{ display: 'none' }}
                    />
                </div>
                <label htmlFor='perfil'>Selecionar imagem...</label>
            </div>

            <InputBox>
                <input 
                    id='nomeConta'
                    type='text' 
                    placeholder='Nome' 
                    required
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
                <label htmlFor='nomeConta'>Pessoa:</label>
            </InputBox>
            <InputBox className='boxBotoes'>
                <BttnExcluir
                    onClick={handleDelete}
                />
                <BttnSalvar
                    onClick={handleSave}
                />
            </InputBox>
        </div>
    );
};