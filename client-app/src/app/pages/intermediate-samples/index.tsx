import React, { useState, FunctionComponent } from 'react';
import { IntermediateSample } from '../../types';
import { Space, Button, Divider, PageHeader, Tooltip } from 'antd';
import { ButtonExportAll, ListDataContext, Store, StoreContext } from '../../common';
import { PlusCircleOutlined } from '@ant-design/icons';
import { ButtonFractionate, List } from '../../functional-building-blocks/intermediate-samples/';
import { ButtonProcessFromIntermediateBulk } from '../../functional-building-blocks/ms-ready';

const ContextName = 'IntermediateSampleDataContext';
Store.addStore(ContextName, new ListDataContext<IntermediateSample>());

export const IntermediateSamples: FunctionComponent = () => {
    const [isRefreshNeeded, setRefreshNeededFlag] = useState<boolean>(false);

    const onRefreshDone = () => {
        setRefreshNeededFlag(false);
    };

    const renderActions = (record: IntermediateSample) => {
        return (
            <span>
                <Space size="middle">
                    <ButtonFractionate sample={record} />
                    <Button type="default" htmlType="button">
                        Delete
                    </Button>
                </Space>
            </span>
        );
    };

    return (
        <StoreContext.Provider value={{ name: ContextName }}>
            <PageHeader ghost={false} title="Intermediate Samples">
                <ButtonProcessFromIntermediateBulk
                    title={'Create MS Ready Samples'}
                    style={{ float: 'right', marginRight: 10 }}
                />
                <ButtonExportAll title="Export table" />
                <Tooltip title="Add to pooling preparation">
                    <Button type="primary" icon={<PlusCircleOutlined />} style={{ float: 'right', marginRight: 10 }}>
                        Add to pooling preparation
                    </Button>
                </Tooltip>
            </PageHeader>

            <Divider></Divider>

            <List isRefreshNeeded={isRefreshNeeded} onRefreshDone={onRefreshDone} renderActions={renderActions} />
        </StoreContext.Provider>
    );
};
