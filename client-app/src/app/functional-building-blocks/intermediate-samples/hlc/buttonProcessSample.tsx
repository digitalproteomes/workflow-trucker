import React, { FunctionComponent, useState } from 'react';
import { Button, Tooltip } from 'antd';
import { DeliveredProcedureOutlined } from '@ant-design/icons';
import { ClinicalSample } from '../../../types';
import { SampleNotifications } from '../../../common/notifications';
import { ProcessSampleForm } from './components/formProcess';

type ButtonProps = {
    sample: ClinicalSample;
    style?: React.CSSProperties | undefined;
};

export const ButtonProcessSample: FunctionComponent<ButtonProps> = ({ sample, style }) => {
    const [sampleToProcess, setSampleToProcess] = useState<ClinicalSample | null>(null);

    const sampleProcessingForm =
        sampleToProcess === null ? (
            <></>
        ) : (
            <ProcessSampleForm
                originalSamples={[sampleToProcess!]}
                onCancel={() => {
                    setSampleToProcess(null);
                }}
                onCreateSuccessful={() => {
                    SampleNotifications.queueCreateSuccess('Sample processed succesfully');
                    setSampleToProcess(null);
                }}
            />
        );

    return (
        <>
            <Tooltip title="Process sample">
                <Button
                    type="default"
                    icon={<DeliveredProcedureOutlined />}
                    onClick={() => setSampleToProcess(sample)}
                    style={style}
                >
                    Process
                </Button>
            </Tooltip>
            {sampleProcessingForm}
        </>
    );
};
