import React, { FunctionComponent, useState } from 'react';
import { IntermediateSample } from '../../../types';
import { Button, Tooltip } from 'antd';
import { DeliveredProcedureOutlined } from '@ant-design/icons';
import { FormProcessIntermediateSamples } from './components/formProcessIntermediateSamples';
import { SampleNotifications } from '../../../common/notifications';
import { Store, StoreContext } from '../../../common';

type Props = {
    style?: React.CSSProperties;
    title: string;
};

export const ButtonProcessFromIntermediateBulk: FunctionComponent<Props> = ({ style, title }) => {
    const [samplesToProcess, setSamplesToProcess] = useState<IntermediateSample[] | null>(null);

    const storeName = React.useContext(StoreContext).name;

    const sampleProcessingForm =
        samplesToProcess === null ? (
            <></>
        ) : (
            <FormProcessIntermediateSamples
                originalSamples={samplesToProcess}
                onCancel={() => {
                    setSamplesToProcess(null);
                }}
                onCreateSuccessful={() => {
                    SampleNotifications.queueCreateSuccess('Samples processed in bulk succesfully');

                    setSamplesToProcess(null);
                }}
            />
        );
    return (
        <>
            <Tooltip title={title}>
                <Button
                    type="primary"
                    // disabled={samples === null || samples.length === 0}
                    icon={<DeliveredProcedureOutlined />}
                    onClick={() => {
                        const samples = Store.getStore<IntermediateSample>(storeName).selectedData;
                        setSamplesToProcess(samples);
                    }}
                    style={style}
                >
                    {title}
                </Button>
            </Tooltip>
            {sampleProcessingForm}
        </>
    );
};
