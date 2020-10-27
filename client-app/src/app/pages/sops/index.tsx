import React, { useState, FunctionComponent } from 'react';
import { Space, Button, PageHeader, message, Upload, Divider } from 'antd';
import { SOP } from '../../types';
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import { List } from './components/list';
import { ButtonExport } from '../../common/export';
import { UploadProps } from 'antd/lib/upload';
import * as sampleNotifications from '../../common/sampleNotifications';

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
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };
    const [isRefreshNeeded, setRefreshNeededFlag] = useState<boolean>(false);

    const [, setSOP] = useState<SOP[]>([]);

    const onRefreshDone = () => {
        setRefreshNeededFlag(false);
    };

    const onRowSelectionChange = (selectedRows: SOP[]) => {
        setSOP(selectedRows);
    };

    function onExportDone() {
        sampleNotifications.queueExportSuccess();
    }

    const renderActions = () => {
        return (
            <Space size="middle">
                <Button type="default" htmlType="button">
                    Delete
                </Button>
            </Space>
        );
    };

    return (
        <>
            <PageHeader ghost={false} title="Standard Operation Proceduress"></PageHeader>
            <ButtonExport
                onExportDone={() => {
                    onExportDone();
                }}
            />
            <Divider></Divider>
            <Upload {...props}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
            <Divider></Divider>
            <List
                isRefreshNeeded={isRefreshNeeded}
                onRefreshDone={onRefreshDone}
                renderActions={renderActions}
                onRowSelectionChange={onRowSelectionChange}
            />
        </>
    );
};
