import React, { useState, FunctionComponent } from 'react';
import { List } from '../../functional-building-blocks/ms-ready';
import { MSReadySample } from '../../types';
import { Space, Button, Tooltip, PageHeader, Divider } from 'antd';
import { ButtonExportAll, Header } from '../../common';
import { DownloadOutlined } from '@ant-design/icons';
import { ListDataContext, Store, StoreContext } from '../../common';

const ContextName = 'MsReadyDataContext';
Store.addStore(ContextName, new ListDataContext<MSReadySample>());

export const MSReadySamples: FunctionComponent = () => {
    const [isRefreshNeeded, setRefreshNeededFlag] = useState<boolean>(false);

    const onRefreshDone = () => {
        setRefreshNeededFlag(false);
    };

    const renderActions = (record: MSReadySample) => {
        return (
            <Space size="middle">
                <Button type="default" htmlType="button">
                    Generate MS Run - {record.name}
                </Button>
            </Space>
        );
    };

    const exportHeaders: Header<MSReadySample>[] = [
        { label: 'Id', key: MSReadySample.nameof('id') },
        { label: 'Name', key: MSReadySample.nameof('name') },
    ];

    return (
        <StoreContext.Provider value={{ name: ContextName }}>
            <PageHeader ghost={false} title="MS Ready Samples"></PageHeader>
            <ButtonExportAll<MSReadySample> title={'Export all from table'} headers={exportHeaders} />
            {/* <ButtonExport<MSReadySample> title={'Export selected'} headers={exportHeaders} data={selectedData} /> */}
            <Tooltip title="Exports sample names to .tsv, to be inputed in the Mass Spec">
                <Button type="primary" icon={<DownloadOutlined />} style={{ float: 'right', marginRight: 10 }}>
                    Export MS Runs running queue
                </Button>
            </Tooltip>
            <Divider></Divider>
            <List isRefreshNeeded={isRefreshNeeded} onRefreshDone={onRefreshDone} renderActions={renderActions} />
        </StoreContext.Provider>
    );
};
