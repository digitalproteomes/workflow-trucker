import React, { useState, FunctionComponent } from 'react';
import { Space, Button, PageHeader, Divider } from 'antd';
import { SwathAnalysis } from '../../types';
import { List } from './components/list';
import { ButtonExport } from '../../common/export';
import * as sampleNotifications from '../../common/sampleNotifications';

export const SwathAnalysisPage: FunctionComponent = () => {
    const [isRefreshNeeded, setRefreshNeededFlag] = useState<boolean>(false);

    const [, setSelectedSamples] = useState<SwathAnalysis[]>([]);

    const onRefreshDone = () => {
        setRefreshNeededFlag(false);
    };

    const onRowSelectionChange = (selectedRows: SwathAnalysis[]) => {
        setSelectedSamples(selectedRows);
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

    function onExportDone() {
        sampleNotifications.queueExportSuccess();
    }

    return (
        <>
            <PageHeader ghost={false} title="SWATH Analyses"></PageHeader>
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
