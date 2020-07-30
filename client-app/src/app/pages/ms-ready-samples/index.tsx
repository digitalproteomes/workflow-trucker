import React, { useState, FunctionComponent } from 'react';
import { List } from './components/list';
import { MSReadySample } from '../../types';
import { Space, Button } from 'antd';

export const MSReadySamples: FunctionComponent = () => {
    const [isRefreshNeeded, setRefreshNeededFlag] = useState<boolean>(false);

    const [, setSelectedSamples] = useState<MSReadySample[]>([]);

    const onRefreshDone = () => {
        setRefreshNeededFlag(false);
    };

    const onRowSelectionChange = (selectedRows: MSReadySample[]) => {
        setSelectedSamples(selectedRows);
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
        <List
            isRefreshNeeded={isRefreshNeeded}
            onRefreshDone={onRefreshDone}
            renderActions={renderActions}
            onRowSelectionChange={onRowSelectionChange}
        />
    );
};
