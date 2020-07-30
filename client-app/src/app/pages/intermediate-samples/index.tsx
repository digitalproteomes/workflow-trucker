import React, { useState, FunctionComponent } from 'react';
import { List } from './components/list';
import { IntermediateSample } from '../../types';
import { Space, Button } from 'antd';

export const IntermediateSamples: FunctionComponent = () => {
    const [isRefreshNeeded, setRefreshNeededFlag] = useState<boolean>(false);

    const [, setSelectedSamples] = useState<IntermediateSample[]>([]);

    const onRefreshDone = () => {
        setRefreshNeededFlag(false);
    };

    const onRowSelectionChange = (selectedRows: IntermediateSample[]) => {
        setSelectedSamples(selectedRows);
    };

    const renderActions = (record: IntermediateSample) => {
        return (
            <span>
                <Space size="middle">
                    <Button type="default" htmlType="button">
                        Process again
                    </Button>

                    <Button type="default" htmlType="button">
                        Generate Ms Ready Sample
                    </Button>
                </Space>
            </span>
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
