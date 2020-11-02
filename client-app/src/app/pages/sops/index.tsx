import React, { useState, FunctionComponent } from 'react';
import { Space, Button, PageHeader, message, Upload, Divider } from 'antd';
import { SOP } from '../../types';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import { List } from './components/list';
import { ButtonDownload } from './components/download';
import { ButtonExport } from '../../common/export';
// import { ButtonDelete } from './components/delete';
import { UploadProps } from 'antd/lib/upload';
import * as sampleNotifications from '../../common/sampleNotifications';
import * as notifications from '../../common/notificationsBase';

import { FormUploadSOP } from './components/uploadSOP';

export const SOPPage: FunctionComponent = () => {
    const props: UploadProps = {
        name: 'file',
        multiple: false,
        method: 'POST',
        action: 'http://localhost:5000/file-upload',
        // headers: {
        //     'Content-Type': 'multipart/form-data',
        // },
        onChange(info: any) {
            const { status } = info.file;
            console.log('info', info);

            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
                onCreateNew();
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    const [isRefreshNeeded, setRefreshNeededFlag] = useState<boolean>(false);

    const [, setSOP] = useState<SOP[]>([]);
    const [isActiveUpload, setActiveUploadFlag] = useState<boolean>(false);

    const onRefreshDone = () => {
        setRefreshNeededFlag(false);
    };

    const onCreateNew = () => {
        setRefreshNeededFlag(true);
    };

    const onRowSelectionChange = (selectedRows: SOP[]) => {
        setSOP(selectedRows);
    };

    function onExportDone() {
        sampleNotifications.queueExportSuccess();
    }

    const onUploadSuccessful = () => {
        notifications.queueSuccess('Success', 'Selected file was uploaded successfully');
        setRefreshNeededFlag(true);
        setActiveUploadFlag(false);
    };

    const onUploadCancel = () => {
        setActiveUploadFlag(false);
    };

    const renderActions = (record: SOP) => {
        return (
            <Space size="middle">
                <ButtonDownload sop={record} />
            </Space>
        );
    };

    return (
        <>
            <Divider />
            <PageHeader ghost={false} title="Standard Operation Procedures"></PageHeader>
            <Space style={{ float: 'right' }} direction="horizontal">
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => {
                        setActiveUploadFlag(true);
                    }}
                >
                    Create new SOP
                </Button>

                <ButtonExport
                    onExportDone={() => {
                        onExportDone();
                    }}
                />
            </Space>
            <Divider />
            <List
                isRefreshNeeded={isRefreshNeeded}
                onRefreshDone={onRefreshDone}
                renderActions={renderActions}
                onRowSelectionChange={onRowSelectionChange}
            />
            <FormUploadSOP
                isActiveUploadForm={isActiveUpload}
                onUploadSuccessful={onUploadSuccessful}
                onCancel={onUploadCancel}
            />
        </>
    );
};
