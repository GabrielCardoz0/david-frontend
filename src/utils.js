import dayjs from "dayjs";

export function formatDate(date, format) {
    return dayjs(date || Date.now()).format('DD-MM-YYYY HH:mm' || format);
};

export function convertToMoney(value) {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}