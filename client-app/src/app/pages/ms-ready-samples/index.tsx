import React, { useState, FunctionComponent } from 'react';
import { List } from './components/list';
import { MSReadySample } from '../../types';
import { Space, Button, Tooltip, PageHeader, Divider } from 'antd';
import { ButtonExport } from '../../common/export';
import { DownloadOutlined } from '@ant-design/icons';
import { SampleNotifications } from '../../common/notifications';

export const MSReadySamples: FunctionComponent = () => {
    const [isRefreshNeeded, setRefreshNeededFlag] = useState<boolean>(false);

    const [, setSelectedSamples] = useState<MSReadySample[]>([]);

    const onRefreshDone = () => {
        setRefreshNeededFlag(false);
    };

    const onRowSelectionChange = (selectedRows: MSReadySample[]) => {
        setSelectedSamples(selectedRows);
    };

    const renderActions = (record: MSReadySample) => {
        return (
            <Space size="middle">
                <Button type="default" htmlType="button">
                    Generate MS Run
                </Button>
            </Space>
        );
    };

    function onExportDone() {
        SampleNotifications.queueExportSuccess();
    }

    return (
        <>
            <PageHeader ghost={false} title="MS Ready Samples"></PageHeader>
            <ButtonExport
                onExportDone={() => {
                    onExportDone();
                }}
            />
            <Tooltip title="Exports sample names to .tsv, to be inputed in the Mass Spec">
                <Button type="primary" icon={<DownloadOutlined />} style={{ float: 'right', marginRight: 10 }}>
                    Export MS Runs running queue
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
