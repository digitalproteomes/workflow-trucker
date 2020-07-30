import React, { useState, FunctionComponent } from 'react';
import { Space } from 'antd';
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
                <span>Buttons go here</span>
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
