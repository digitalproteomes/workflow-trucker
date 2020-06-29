import { notification } from 'antd';

export function queueSuccess(message: string, description: string) {
    notification['success']({
        message: message,
        description: description,
    });
}

export function queueError(message: string, description: string) {
    notification['error']({
        message: message,
        description: description,
    });
}

export function queueWarning(message: string, description: string) {
    notification['warning']({
        message: message,
        description: description,
    });
}
