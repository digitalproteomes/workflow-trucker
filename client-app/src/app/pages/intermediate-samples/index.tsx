import React, { useState, FunctionComponent } from 'react';
import { List } from './components/list';
import { IntermediateSample } from '../../types';
import { Space, Button, Divider, PageHeader, Tooltip } from 'antd';
import { ButtonExport } from '../../common/export';
import { PlusOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { SampleNotifications } from '../../common/notifications';
import { ButtonFractionate, FractionateInputForm } from './components/fractionate';

export const IntermediateSamples: FunctionComponent = () => {
    const [isRefreshNeeded, setRefreshNeededFlag] = useState<boolean>(false);
    const [fractionateSample, setFractionateSample] = useState<IntermediateSample | null>(null);

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

    const { onFractionateSuccessful, onFractionateCancel } = linkFractionate(setFractionateSample);

    const renderActions = (record: IntermediateSample) => {
        return (
            <span>
                <Space size="middle">
                    <ButtonFractionate
                        onFractionate={() => {
                            setFractionateSample(record);
                        }}
                    />

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

            <FractionateInputForm
                parentSample={fractionateSample}
                onCreateSuccessful={onFractionateSuccessful}
                onCancel={onFractionateCancel}
            />
        </>
    );

    function linkFractionate(setFractionateSample: React.Dispatch<React.SetStateAction<IntermediateSample | null>>) {
        const onFractionateCancel = () => {
            setFractionateSample(null);
        };

        const onFractionateSuccessful = (samples: IntermediateSample[]) => {
            samples.forEach((sample, _index, _samples) => {
                SampleNotifications.queueCreateSuccess(sample.name);
            });

            setFractionateSample(null);
        };
        return { onFractionateSuccessful, onFractionateCancel };
    }
};
