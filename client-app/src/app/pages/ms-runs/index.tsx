import React, { useState, FunctionComponent } from 'react';
import { Space, Button } from 'antd';
import { MsRun } from '../../types';
import { List } from './components/list';

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

    return (
        <List
            isRefreshNeeded={isRefreshNeeded}
            onRefreshDone={onRefreshDone}
            renderActions={renderActions}
            onRowSelectionChange={onRowSelectionChange}
        />
    );
};
