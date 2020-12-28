import React, { useState, FunctionComponent } from 'react';
import { List } from '../../functional-building-blocks/ms-ready';
import { MSReadySample } from '../../types';
import { Space, Button, Tooltip, PageHeader, Divider } from 'antd';
import { ButtonExport, Header } from '../../common/buttonExport';
import { DownloadOutlined } from '@ant-design/icons';

export const MSReadySamples: FunctionComponent = () => {
    const [isRefreshNeeded, setRefreshNeededFlag] = useState<boolean>(false);

    const [selectedData, setSelectedSamples] = useState<MSReadySample[]>([]);
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

    const exportHeaders: Header<MSReadySample>[] = [
        { label: 'Id', key: MSReadySample.nameof('id') },
        { label: 'Name', key: MSReadySample.nameof('name') },
    ];

    return (
        <>
            <PageHeader ghost={false} title="MS Ready Samples"></PageHeader>
            <ButtonExport<MSReadySample> title={'Export all from table'} headers={exportHeaders} data={activeData} />
            <ButtonExport<MSReadySample> title={'Export selected'} headers={exportHeaders} data={selectedData} />
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
