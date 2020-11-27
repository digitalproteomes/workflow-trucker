import React, { useState, FunctionComponent } from 'react';
import { IntermediateSample } from '../../types/types';
import { Space, Button, Divider, PageHeader, Tooltip } from 'antd';
import { ButtonExport } from '../../common/export';
import { PlusOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { SampleNotifications } from '../../common/notifications';
import { ButtonFractionate, List } from '../../functional-building-blocks/intermediate-samples/';

export const IntermediateSamples: FunctionComponent = () => {
    const [isRefreshNeeded, setRefreshNeededFlag] = useState<boolean>(false);

    const [, setSelectedSamples] = useState<IntermediateSample[]>([]);

    const onRefreshDone = () => {
        setRefreshNeededFlag(false);
    };

    const onRowSelectionChange = (selectedRows: IntermediateSample[]) => {
        setSelectedSamples(selectedRows);
    };

    function onExportDone() {
        SampleNotifications.queueExportSuccess();
    }

    const renderActions = (record: IntermediateSample) => {
        return (
            <span>
                <Space size="middle">
                    <ButtonFractionate sample={record} />

                    <Button type="default" htmlType="button">
                        Generate Ms Ready Sample
                    </Button>
                    <Button type="default" htmlType="button">
                        Delete
                    </Button>
                </Space>
            </span>
        );
    };

    return (
        <>
            <PageHeader ghost={false} title="Intermediate Samples"></PageHeader>

            <ButtonExport
                onExportDone={() => {
                    onExportDone();
                }}
            />
            <Tooltip title="Create MS Ready Samples">
                <Button type="primary" icon={<PlusOutlined />} style={{ float: 'right', marginRight: 10 }}>
                    Create MS Ready Samples
                </Button>
            </Tooltip>
            <Tooltip title="Add to pooling preparation">
                <Button type="primary" icon={<PlusCircleOutlined />} style={{ float: 'right', marginRight: 10 }}>
                    Add to pooling preparation
                </Button>
            </Tooltip>
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
