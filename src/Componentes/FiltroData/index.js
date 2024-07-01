import './style.css'
import DataPicker from '../DataPicker'
import YoutubeSearchedForIcon from '@mui/icons-material/YoutubeSearchedFor';

export default function FiltroData ({ setData, dataConsulta, onClick }) {
  return (
    <div className='dataForm'>
      <DataPicker setData={setData} formato={'MM/YYYY'} value={dataConsulta} />
      <YoutubeSearchedForIcon className='dataIcon' onClick={onClick} />
    </div>
  );
};