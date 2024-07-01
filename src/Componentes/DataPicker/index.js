import './style.css';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { useEffect, useState } from 'react';
dayjs.locale('pt-br');

export default function DataPicker({ setData, data, formato }) {

  const [selectedDate, setSelectedDate] = useState(data ? dayjs(data) : dayjs());

  const handleDateChange = (newDate) => {
    const formattedDate = newDate.format(formato);
    setSelectedDate(newDate);
    setData(formattedDate);
  };

  useEffect(()=>{
    setData(selectedDate.format(formato));
  }, [selectedDate])

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoItem sx={{ width: '100%', zIndex: 1 }}>
          <DesktopDatePicker
            value={selectedDate}
            views={formato === 'MM/YYYY' ? ['year', 'month'] : ['year', 'month', 'day']}
            onChange={handleDateChange}
            format={formato}
            sx={{
              '& .MuiInputBase-root': {
                color: '#fff',
                height: '31px',
              },
              '& .MuiOutlinedInput-input': {
                height: '31px',
                padding: '0',
                paddingLeft: '10px',
                fontSize: '13px'
              },
              '& .MuiSvgIcon-root': {
                color: '#fff',
              },
              '& .MuiInputLabel-root': {
                color: '#fff',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#434D5B',
                  borderWidth: '1px', // Define a espessura da borda
                },
                '&:hover fieldset': {
                  borderColor: '#434D5B',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#43A1FF', // Muda a cor da borda ao focar
                  borderWidth: '1px', // Garante que a espessura da borda seja 1px
                },
              },
              '& .MuiOutlinedInput-root.Mui-focused': {
                outline: 'none', // Remove o outline no estado de foco
              },
              backgroundColor: '#1C2025',
              width: '100%',
              height: '31px',
              borderRadius: '3px',
            }}
          />
      </DemoItem>
    </LocalizationProvider>
  );
}