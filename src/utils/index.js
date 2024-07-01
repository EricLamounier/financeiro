import dayjs from 'dayjs';

export function formattedNumber (number){
    const options = {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    };
    return new Intl.NumberFormat('pt-BR', options).format(number);
}

export const filtraContasPorData = (todasContas, dataConsulta=undefined) => {
    let dt = dataConsulta || dayjs().format('MM/YYYY')
    dt = dt.split('/').reverse().join('-');
    return todasContas.filter(conta => conta.data.startsWith(dt));
};