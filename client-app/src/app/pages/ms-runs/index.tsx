import React, { useState, FunctionComponent } from 'react';
import { Space, Tooltip, Button, PageHeader, Divider } from 'antd';
import { ButtonExportSelected } from '../../common';
import { List, ButtonImportMsRuns } from '../../functional-building-blocks/ms-runs';

export const MsRuns: FunctionComponent = () => {
    const [isRefreshNeeded, setRefreshNeededFlag] = useState<boolean>(false);

    const onRefreshDone = () => {
        setRefreshNeededFlag(false);
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
        <>
            <PageHeader ghost={false} title="MS Runs"></PageHeader>
            <ButtonExportSelected title="Export table" />

            <Tooltip title="Bulk Generate SWATH Analysis">
                <Button type="primary" style={{ float: 'right', marginRight: 10 }}>
                    Generate SWATH Analysis
                </Button>
            </Tooltip>
            <Tooltip title="Bulk Generate Spectral Library">
                <Button type="primary" style={{ float: 'right', marginRight: 10 }}>
                    Generate Spectral Library
                </Button>
            </Tooltip>
            <ButtonImportMsRuns
                style={{ float: 'right', marginRight: 10 }}
                onImportSuccess={() => {
                    setRefreshNeededFlag(true);
                }}
            />
            <Divider />
            <Divider></Divider>
            <List isRefreshNeeded={isRefreshNeeded} onRefreshDone={onRefreshDone} renderActions={renderActions} />
        </>
    );
};
