import moment from 'moment';

export function formatDate(dateString: string) {
    return moment(dateString).format('DD/MM/YY');
}

export interface Dictionary<T> {
    [Key: string]: T;
}
