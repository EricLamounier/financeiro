import './style.css'

import { useState } from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function Seletor({options, selected, setData}){

    const [newSelected, setSelected] = useState(selected)

    const handleChange = (e) => {
        setSelected(e.target.value)
        setData(e.target.value)
    };

    return (
        <Box sx={{ width: '100%' }}>
            <FormControl className={`situacao`} fullWidth sx={{ 
                    border: '1px solid #434D5B', 
                    borderRadius: '3px',
                    '&.Mui-focused': {
                        borderColor: '#43A1FF', // Mudar cor da borda ao dar foco
                    }
                }}>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={newSelected}
                    onChange={handleChange}
                    sx={{
                        '& .MuiSelect-root': { color: '#fff' },
                        '& .MuiSelect-icon': { color: '#fff' },
                        '& .MuiInputBase-input': { color: '#fff' },
                        '& .MuiMenuItem-root': { color: '#fff' },
                        '& .MuiSelect-select.MuiSelect-select': {
                            textAlign: 'center',
                            display: 'flex',
                            alignItems: 'center',
                            padding: '0',
                            paddingLeft: '8px',
                            paddingTop: '3px',
                            outline: 'none', // Remove o outline aqui
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'transparent', // Remove o outline aqui
                        },
                        height: '31px',
                        background: '#23262B',
                        padding: '0',
                        fontSize: '12px',
                        '&.Mui-focused': {
                            outline: 'none', // Remove o outline no estado de foco
                        },
                        '&.Mui-focused .MuiSelect-select': {
                            outline: 'none', // Remove o outline aqui
                        },
                    }}
                >
                    {Object.entries(options).map(([chave, valor]) => (
                        <MenuItem key={chave} value={chave}>{valor}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>

    );
}