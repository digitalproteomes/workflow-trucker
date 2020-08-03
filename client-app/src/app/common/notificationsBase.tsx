import { notification } from 'antd';

export function queueSuccess(title: string, description: string) {
    notification['success']({
        message: title,
        description: description,
    });
}

export function queueError(title: string, description: string) {
    notification['error']({
        message: title,
        description: description,
    });
}

export function queueWarning(title: string, description: string) {
    notification['warning']({
        message: title,
        description: description,
    });
}
