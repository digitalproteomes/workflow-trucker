import React, { useState, FunctionComponent } from 'react';
import { Space, Tooltip, Button, PageHeader, Divider } from 'antd';
import { List } from './components/list';
import { ButtonExportSelected } from '../../common';
import { UploadOutlined } from '@ant-design/icons';
import CSVImporter from '../../common/code/csvImporter';
import { MSRunNewTypeMap } from './components/msRunNewTypeMap';
import { MSRunNew } from '../../types';

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
            <Tooltip title="Import MS ready sample names and Run codes from Mass Spec">
                <Button type="default" icon={<UploadOutlined />} style={{ float: 'right', marginRight: 10 }}>
                    Import MS Runs
                </Button>
            </Tooltip>
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
