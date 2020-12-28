import React, { useState, FunctionComponent } from 'react';
import { Space, Button, PageHeader, Divider } from 'antd';
import { List } from './components/list';
import { ButtonExportSelected } from '../../common/code/buttonExport';

export const SwathAnalysisPage: FunctionComponent = () => {
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
            <PageHeader ghost={false} title="SWATH Analyses"></PageHeader>
            <ButtonExportSelected title="Export" />

            <Divider></Divider>
            <List isRefreshNeeded={isRefreshNeeded} onRefreshDone={onRefreshDone} renderActions={renderActions} />
        </>
    );
};
