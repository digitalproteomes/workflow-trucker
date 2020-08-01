import React, { useState, FunctionComponent } from 'react';
import { Space, Button } from 'antd';
import { SwathAnalysis } from '../../types';
import { List } from './components/list';

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

    return (
        <List
            isRefreshNeeded={isRefreshNeeded}
            onRefreshDone={onRefreshDone}
            renderActions={renderActions}
            onRowSelectionChange={onRowSelectionChange}
        />
    );
};
