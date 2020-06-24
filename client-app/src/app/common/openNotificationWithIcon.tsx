import { notification } from 'antd';
export const openNotificationWithIcon = (sampleName: string) => {
    notification['success']({
        message: 'Success',
        description: `Sample ${sampleName} created successfuly.`,
    });
};
export const openDeleteNotification = (sampleName: string) => {
    notification['success']({
        message: 'Success',
        description: `Sample ${sampleName} was deleted.`,
    });
};
