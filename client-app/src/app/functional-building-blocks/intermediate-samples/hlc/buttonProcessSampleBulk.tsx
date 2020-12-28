import React, { FunctionComponent, useState } from 'react';
import { Button, Tooltip } from 'antd';
import { DeliveredProcedureOutlined } from '@ant-design/icons';
import { ClinicalSample } from '../../../types';
import { SampleNotifications } from '../../../common/notifications';
import { ProcessSampleForm } from './components/formProcess';
import { Store, StoreContext } from '../../../common';

type ButtonProps = {
    style?: React.CSSProperties;
};

export const ButtonProcessSampleBulk: FunctionComponent<ButtonProps> = ({ style }) => {
    const [samplesToProcess, setSamplesToProcessInBulk] = useState<ClinicalSample[] | null>(null);

    const storeName = React.useContext(StoreContext).name;

    const sampleProcessingForm =
        samplesToProcess === null ? (
            <></>
        ) : (
            <ProcessSampleForm
                originalSamples={samplesToProcess!}
                onCancel={() => {
                    setSamplesToProcessInBulk(null);
                }}
                onCreateSuccessful={() => {
                    SampleNotifications.queueCreateSuccess('Samples processed in bulk succesfully');

                    setSamplesToProcessInBulk(null);
                }}
            />
        );

    return (
        <>
            <Tooltip title="Process samples in bulk">
                <Button
                    type="primary"
                    // disabled={samples === null || samples.length === 0}
                    icon={<DeliveredProcedureOutlined />}
                    onClick={() => {
                        const samples = Store.getStore<ClinicalSample>(storeName).selectedData;
                        setSamplesToProcessInBulk(samples);
                    }}
                    style={style}
                >
                    Process samples in bulk
                </Button>
            </Tooltip>
            {sampleProcessingForm}
        </>
    );
};
