import * as notifications from './notificationsBase';

export const queueCreateSuccess = (sampleName: string) => {
    notifications.queueSuccess('Success', `Sample ${sampleName} created successfuly.`);
};

export const queueDeleteSuccess = (sampleName: string) => {
    notifications.queueSuccess('Success', `Sample ${sampleName} was deleted.`);
};
