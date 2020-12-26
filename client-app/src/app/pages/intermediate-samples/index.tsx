import React, { useState, FunctionComponent } from 'react';
import { IntermediateSample } from '../../types';
import { Space, Button, Divider, PageHeader, Tooltip } from 'antd';
import { ButtonExport } from '../../common/export';
import { PlusCircleOutlined } from '@ant-design/icons';
import { SampleNotifications } from '../../common/notifications';
import { ButtonFractionate, List } from '../../functional-building-blocks/intermediate-samples/';
import {
    ButtonProcessFromIntermediate,
    ButtonProcessFromIntermediateBulk,
} from '../../functional-building-blocks/ms-runs';

export const IntermediateSamples: FunctionComponent = () => {
    const [isRefreshNeeded, setRefreshNeededFlag] = useState<boolean>(false);

    const [selectedSamples, setSelectedSamples] = useState<IntermediateSample[]>([]);

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
                    <ButtonProcessFromIntermediate sample={record} title={'Process to MsReady'} />

                    <Button type="default" htmlType="button">
                        Delete
                    </Button>
                </Space>
            </span>
        );
    };

    return (
        <>
            <PageHeader ghost={false} title="Intermediate Samples">
                <ButtonProcessFromIntermediateBulk
                    samples={selectedSamples}
                    title={'Create MS Ready Sample'}
                    style={{ float: 'right', marginRight: 10 }}
                />
                <ButtonExport
                    onExportDone={() => {
                        onExportDone();
                    }}
                />
                <Tooltip title="Add to pooling preparation">
                    <Button type="primary" icon={<PlusCircleOutlined />} style={{ float: 'right', marginRight: 10 }}>
                        Add to pooling preparation
                    </Button>
                </Tooltip>
            </PageHeader>

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
