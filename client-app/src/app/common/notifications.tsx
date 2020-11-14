import { notification } from 'antd';

export class Notifications {
    public static queueSuccess(title: string, description: string) {
        notification['success']({
            message: title,
            description: description,
        });
    }

    public static queueWarning(title: string, description: string) {
        notification['warning']({
            message: title,
            description: description,
        });
    }

    public static queueError(title: string, description: string) {
        notification['error']({
            message: title,
            description: description,
        });
    }
}

export class SampleNotifications {
    public static queueCreateSuccess = (sampleName: string) => {
        Notifications.queueSuccess('Success', `Entry ${sampleName} created successfuly.`);
    };

    public static queueExportSuccess = () => {
        Notifications.queueSuccess('Success', `Items exported successfuly.`);
    };

    public static queueDeleteSuccess = (sampleName: string) => {
        Notifications.queueSuccess('Success', `Entry ${sampleName} was deleted.`);
    };
}
