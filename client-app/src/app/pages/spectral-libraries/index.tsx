import React, { useState, FunctionComponent } from 'react';
import { Space, Button, PageHeader, Divider } from 'antd';
import { SpectralLibrary } from '../../types';
import { List } from './components/list';
import { ButtonExport } from '../../common/export';
import * as sampleNotifications from '../../common/sampleNotifications';

export const SpectralLibrariesPage: FunctionComponent = () => {
    const [isRefreshNeeded, setRefreshNeededFlag] = useState<boolean>(false);

    const [, setSelectedSamples] = useState<SpectralLibrary[]>([]);

    const onRefreshDone = () => {
        setRefreshNeededFlag(false);
    };

    const onRowSelectionChange = (selectedRows: SpectralLibrary[]) => {
        setSelectedSamples(selectedRows);
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
            <PageHeader ghost={false} title="Spectral Libraries"></PageHeader>
            <ButtonExport
                onExportDone={() => {
                    onExportDone();
                }}
            />
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
