import moment from 'moment';

export function formatDate(dateString: string) {
    return moment(dateString).format('DD/MM/YY');
}

export function getCurrentDate() {
    return moment().format('YY-MM-DD');
}
