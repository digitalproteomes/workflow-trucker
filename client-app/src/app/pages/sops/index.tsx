import React, { useState, FunctionComponent } from 'react';
import { Space, Button, PageHeader, Divider } from 'antd';
import { SOP } from '../../types';
import { PlusOutlined } from '@ant-design/icons';
import { List } from './components/list';
import { ButtonDownload } from './components/download';
import { ButtonExport } from '../../common/export';
import * as sampleNotifications from '../../common/sampleNotifications';
import * as notifications from '../../common/notificationsBase';
import { ButtonDeleteSOP } from './components/delete';

import { FormUploadSOP } from './components/uploadSOP';

export const SOPPage: FunctionComponent = () => {
    const [isRefreshNeeded, setRefreshNeededFlag] = useState<boolean>(false);

    const [, setSOP] = useState<SOP[]>([]);
    const [isActiveUpload, setActiveUploadFlag] = useState<boolean>(false);

    const onRefreshDone = () => {
        setRefreshNeededFlag(false);
    };

    const onRowSelectionChange = (selectedRows: SOP[]) => {
        setSOP(selectedRows);
    };

    function onExportDone() {
        sampleNotifications.queueExportSuccess();
    }

    function onDeleteDone(sop: SOP) {
        setRefreshNeededFlag(true);
        sampleNotifications.queueDeleteSuccess(sop.name);
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
                <ButtonDeleteSOP
                    sop={record}
                    onDeleteDone={() => {
                        onDeleteDone(record);
                    }}
                />
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
