import dayjs from "dayjs";

export function formatDate(date, format = 'DD/MM/YYYY HH:mm') {
    return dayjs(date || Date.now()).format(format);
};

export function convertToMoney(value) {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}