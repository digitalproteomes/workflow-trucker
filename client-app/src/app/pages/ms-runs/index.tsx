import React, { useState, FunctionComponent } from 'react';
import { Space, Tooltip, Button, PageHeader, Divider } from 'antd';
import { ButtonExportSelected, CSVImporter } from '../../common';
import { MSRunNewTypeMap } from '../../functional-building-blocks/ms-runs/typemaps/msRunNewTypeMap';
import { MSRunNew } from '../../types';
import { List, ButtonImportMsRuns } from '../../functional-building-blocks/ms-runs';

export const MsRuns: FunctionComponent = () => {
    const [isRefreshNeeded, setRefreshNeededFlag] = useState<boolean>(false);

    const [typeMap] = useState<MSRunNewTypeMap>(new MSRunNewTypeMap());

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

    function onDataLoaded(entries: MSRunNew[]) {
        console.log('new entries', entries);
    }

    return (
        <>
            <PageHeader ghost={false} title="MS Runs"></PageHeader>
            <ButtonExportSelected title="Export" />
            <ButtonImportMsRuns style={{ float: 'right', marginRight: 10 }} />
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
            <Divider />
            <CSVImporter<MSRunNew> converter={typeMap} onDataLoaded={onDataLoaded} />
            <Divider></Divider>
            <List isRefreshNeeded={isRefreshNeeded} onRefreshDone={onRefreshDone} renderActions={renderActions} />
        </>
    );
};
