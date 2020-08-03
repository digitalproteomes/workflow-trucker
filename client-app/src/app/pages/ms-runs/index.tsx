import React, { useState, FunctionComponent } from 'react';
import { Space, Tooltip, Button, PageHeader, Divider } from 'antd';
import { MsRun } from '../../types';
import { List } from './components/list';
import { ButtonExport } from '../../common/export';
import * as sampleNotifications from '../../common/sampleNotifications';
import { UploadOutlined } from '@ant-design/icons';

export const MsRuns: FunctionComponent = () => {
    const [isRefreshNeeded, setRefreshNeededFlag] = useState<boolean>(false);

    const [, setSelectedSamples] = useState<MsRun[]>([]);

    const onRefreshDone = () => {
        setRefreshNeededFlag(false);
    };

    const onRowSelectionChange = (selectedRows: MsRun[]) => {
        setSelectedSamples(selectedRows);
    };

    const renderActions = () => {
        return (
            <Space size="middle">
                <Button type="default" htmlType="button">
                    Add to Spectral Library
                </Button>

                <Button type="default" htmlType="button">
                    Add to SWATH Analysis
                </Button>
            </Space>
        );
    };

    function onExportDone() {
        sampleNotifications.queueExportSuccess();
    }

    return (
        <>
            <PageHeader ghost={false} title="MS Runs"></PageHeader>

            <ButtonExport
                onExportDone={() => {
                    onExportDone();
                }}
            />
            <Tooltip title="Import MS ready sample names and Run codes from Mass Spec">
                <Button type="primary" icon={<UploadOutlined />} style={{ float: 'right', marginRight: 10 }}>
                    Import MS Runs
                </Button>
            </Tooltip>
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
