import React, { FunctionComponent, useState } from 'react';
import { Button, Tooltip } from 'antd';
import { DeliveredProcedureOutlined } from '@ant-design/icons';
import { ClinicalSample } from '../../../types';
import { SampleNotifications } from '../../../common/notifications';
import { ProcessSampleForm } from './components/formProcess';

type ButtonProps = {
    // todo - an array of sample ids are more than enough (instead of the entire clinical sample instances)
    samples: ClinicalSample[];
    style?: React.CSSProperties | undefined;
};

export const ButtonProcessSampleBulk: FunctionComponent<ButtonProps> = ({ samples, style }) => {
    const [samplesToProcess, setSamplesToProcessInBulk] = useState<ClinicalSample[] | null>(null);

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
                    disabled={samples === null || samples.length === 0}
                    icon={<DeliveredProcedureOutlined />}
                    onClick={() => {
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
