import React, { FunctionComponent, useState } from 'react';
import { Button, Tooltip } from 'antd';
import { DeliveredProcedureOutlined } from '@ant-design/icons';
import { ClinicalSample } from '../../../types/clinicalSample';
import { SampleNotifications } from '../../../common/notifications';
import { ProcessSampleForm } from './components/formProcess';

type ButtonProps = {
    sample: ClinicalSample;
};

export const ButtonProcessSample: FunctionComponent<ButtonProps> = ({ sample }) => {
    const [sampleToProcess, setSampleToProcess] = useState<ClinicalSample | null>(null);

    return (
        <>
            <Tooltip title="Process sample">
                <Button type="default" icon={<DeliveredProcedureOutlined />} onClick={() => setSampleToProcess(sample)}>
                    Process
                </Button>
            </Tooltip>
            <ProcessSampleForm
                originalSample={sampleToProcess}
                onCancel={() => {
                    setSampleToProcess(null);
                }}
                onCreateSuccessful={() => {
                    SampleNotifications.queueCreateSuccess('Sample processed succesfully');
                    setSampleToProcess(null);
                }}
            />
        </>
    );
};
