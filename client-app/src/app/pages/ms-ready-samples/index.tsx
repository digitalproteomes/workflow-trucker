import React, { useState, FunctionComponent } from 'react';
import { List } from '../../functional-building-blocks/ms-ready';
import { MSReadySample } from '../../types';
import { Space, Button, Tooltip, PageHeader, Divider } from 'antd';
import { ButtonExportAll, ButtonExportSelected, Header } from '../../common';
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
                    Manually Generate MS Run
                </Button>
                <Button type="default" htmlType="button">
                    Delete
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

            <ButtonExportAll<MSReadySample> title={'Export all from table'} />

            <Tooltip title="Exports sample names to .csv, to be inputed in the Mass Spec">
                <ButtonExportSelected<MSReadySample>
                    title={'Export selected names for MS Runs running queue'}
                    headers={exportHeaders}
                />
            </Tooltip>
            <Divider></Divider>
            <List isRefreshNeeded={isRefreshNeeded} onRefreshDone={onRefreshDone} renderActions={renderActions} />
        </StoreContext.Provider>
    );
};
