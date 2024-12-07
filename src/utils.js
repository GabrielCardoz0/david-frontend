import dayjs from "dayjs";

<<<<<<< HEAD
export function formatDate(date, format) {
    return dayjs(date || Date.now()).format('DD/MM/YYYY HH:mm' || format);
=======
export function formatDate(date, format = 'DD/MM/YYYY HH:mm') {
    return dayjs(date || Date.now()).format(format);
>>>>>>> 3e586fecf93bed95ec346097d78e902133aeb56e
};

export function convertToMoney(value) {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}