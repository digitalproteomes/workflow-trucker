import React, { useState, FunctionComponent } from 'react';
import { Space, Button, PageHeader, Divider } from 'antd';
import { List } from './components/list';
import { ButtonExportAll } from '../../common';

export const SpectralLibrariesPage: FunctionComponent = () => {
    const [isRefreshNeeded, setRefreshNeededFlag] = useState<boolean>(false);

    const onRefreshDone = () => {
        setRefreshNeededFlag(false);
    };

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
            <PageHeader ghost={false} title="Spectral Libraries"></PageHeader>
            <ButtonExportAll title="Export table" />

            <Divider></Divider>
            <List isRefreshNeeded={isRefreshNeeded} onRefreshDone={onRefreshDone} renderActions={renderActions} />
        </>
    );
};
