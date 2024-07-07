import './style.css'
import { useEffect, useState } from 'react'
import axios from 'axios'

import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined';

import Modal from '../../Componentes/Modal'
import InputBox from '../../Componentes/InputBox'
import Principal from '../../Componentes/Principal'
import { PessoaBox } from '../../Componentes/PessoaBox'
import { BttnAdd, BttnSalvar } from '../../Componentes/Botoes'
import Loading from '../../Componentes/Loading';

export default function Pessoas(){

    const [pessoas, setPessoas] = useState([])
    const [modal, setModal] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        setLoading(true)
        try{
            axios.get('http://192.168.3.9:8080/api/pessoa/get/',{
                headers: {
                    'bypass-tunnel-reminder': '124999',
                }
            })
            .then((res)=>{
                setPessoas(res.data)
                setLoading(false)
            })
        }catch(err){
            console.log(err)
            setLoading(false);
        }
    },[])

    return(
        <Principal>
            {
                loading && (<Loading />)
            }
            {
                modal && (
                    <Modal
                        titulo={'Adicionar Pessoa'}
                        setModal={setModal}
                    >
                        <ModalAddPessoa 
                            setPessoas={setPessoas}
                            setModal={setModal}
                            pessoas={pessoas}
                            setLoading={setLoading}
                        />
                    </Modal>
                )
            }
            {
                pessoas.map((pessoa, index)=>(
                    <PessoaBox 
                        key={index}
                        pessoa={pessoa}
                    />
                ))
            }
            <BttnAdd
                onClick={()=>setModal(1)}
            />
        </Principal>
    )
}

const ModalAddPessoa = ({ setPessoas, pessoas, setModal, setLoading }) => {
    const [nome, setNome] = useState('');
    const [previewImage, setPreviewImage] = useState(null);

    const handleSave = () => {
    
        setLoading(true);
        
        const _data = {
            nome: nome,
            imagem: previewImage ? previewImage.split(',')[previewImage.split(',').length-1] : null
        };

        axios.post('http://192.168.3.9:8080/api/pessoa/post',_data, {
            headers: {
                'bypass-tunnel-reminder': 5465,
            },
        }).then((res)=>{
            setPessoas([...pessoas, res.data])
            setModal(false)
            setLoading(false)
        }).catch(e=>{
            setLoading(false);
        })
    };

    const handleImagem = event => {
        const file = event.target.files[0];
    
        if (file) {    
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className='modalAddPessoa'>
            <div>
                <div className='imagem'>
                    {previewImage ? (
                        <img className='perfil' src={previewImage} alt='perfil' style={{ maxWidth: '100px', maxHeight: '100px' }} />
                    ) : (
                        <PhotoCameraOutlinedIcon />
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
                <BttnSalvar
                    onClick={handleSave}
                />
            </InputBox>
        </div>
    );
};