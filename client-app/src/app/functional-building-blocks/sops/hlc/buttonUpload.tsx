import React, { FunctionComponent, useState } from 'react';
import { Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Notifications } from '../../../common/notifications';
import { FormUpload } from './components/formUpload';

type Props = {
    setRefreshNeededFlag: React.Dispatch<React.SetStateAction<boolean>>;
    style?: React.CSSProperties;
};

export const ButtonUploadSOP: FunctionComponent<Props> = ({ setRefreshNeededFlag, style }) => {
    const [isActiveUpload, setActiveUploadFlag] = useState<boolean>(false);

    const onUploadSuccessful = () => {
        Notifications.queueSuccess('Success', 'Selected file was uploaded successfully');
        setRefreshNeededFlag(true);
        setActiveUploadFlag(false);
    };

    const onUploadCancel = () => {
        setActiveUploadFlag(false);
    };

    return (
        <>
            <Button type="primary" icon={<UploadOutlined />} onClick={() => setActiveUploadFlag(true)} style={style}>
                Upload SOP
            </Button>
            <FormUpload
                isActiveUploadForm={isActiveUpload}
                onUploadSuccessful={onUploadSuccessful}
                onCancel={onUploadCancel}
            />
        </>
    );
};
