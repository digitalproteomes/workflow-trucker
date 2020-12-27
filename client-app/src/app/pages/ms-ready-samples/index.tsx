import React, { useState, FunctionComponent } from 'react';
import { List } from './components/list';
import { MSReadySample } from '../../types';
import { Space, Button, Tooltip, PageHeader, Divider } from 'antd';
import { ButtonExport } from '../../common/buttonExport';
import { DownloadOutlined } from '@ant-design/icons';

export const MSReadySamples: FunctionComponent = () => {
    const [isRefreshNeeded, setRefreshNeededFlag] = useState<boolean>(false);

    const [, setSelectedSamples] = useState<MSReadySample[]>([]);
    const [activeData, setActiveData] = useState<MSReadySample[]>([]);

    const onRefreshDone = () => {
        setRefreshNeededFlag(false);
    };

    const onRowSelectionChange = (selectedRows: MSReadySample[]) => {
        setSelectedSamples(selectedRows);
    };

    const onActiveDataChange = (activeData: MSReadySample[]) => {
        setActiveData(activeData);
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

    return (
        <>
            <PageHeader ghost={false} title="MS Ready Samples"></PageHeader>
            <ButtonExport<MSReadySample> title={'Export all from table'} activeData={activeData} />
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
                onActiveDataChanged={onActiveDataChange}
            />
        </>
    );
};
