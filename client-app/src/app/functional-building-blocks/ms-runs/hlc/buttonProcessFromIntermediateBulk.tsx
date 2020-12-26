import React, { FunctionComponent, useState } from 'react';
import { IntermediateSample } from '../../../types';
import { Button, Tooltip } from 'antd';
import { DeliveredProcedureOutlined } from '@ant-design/icons';
import { FormProcessIntermediateSamples } from './components/formProcessIntermediateSamples';
import { SampleNotifications } from '../../../common/notifications';

type Props = {
    samples: IntermediateSample[];
    style?: React.CSSProperties;
    title: string;
};

export const ButtonProcessFromIntermediateBulk: FunctionComponent<Props> = ({ samples, style, title }) => {
    const [samplesToProcess, setSamplesToProcess] = useState<IntermediateSample[] | null>(null);

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
                    disabled={samples === null || samples.length === 0}
                    icon={<DeliveredProcedureOutlined />}
                    onClick={() => {
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
