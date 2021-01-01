import React, { FunctionComponent, useEffect, useState } from 'react';
import { Store } from 'antd/lib/form/interface';
import { InputModal, InputHelper } from '../../../../common';
import { NewIntermediarySample, SOP } from '../../../../types';
import { ClinicalSample } from '../../../../types';
import { Api } from '../../api';
import { Constants } from '../../../../default-data/constants';

type FormProps = {
    originalSamples: ClinicalSample[] | null;
    onCreateSuccessful: () => void;
    onCancel: () => void;
};

export const ProcessSampleForm: FunctionComponent<FormProps> = ({ originalSamples, onCreateSuccessful, onCancel }) => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [sops, setSops] = useState<SOP[] | null>(null);

    const isActiveInputForm: boolean = originalSamples != null;

    async function executeFetch() {
        const receivedSops = await Api.getSOPsAsync(Constants.projectId);

        setSops(receivedSops);
    }

    useEffect(() => {
        if (isActiveInputForm && sops == null) {
            executeFetch();
        }
    });

    if (isActiveInputForm == null || sops == null) return <></>;

    const onCreate = (data: Store) => {
        const sampleTemplate: NewIntermediarySample = data as NewIntermediarySample;

        const intermediateSamples: NewIntermediarySample[] = [];
        originalSamples!.forEach((sample) => {
            intermediateSamples.push({ ...sampleTemplate, clinicalSampleId: sample.id });
        });

        async function saveSamples() {
            try {
                Api.postProcessedSampleAsync(intermediateSamples);

                onCreateSuccessful();
                setSops(null);
            } catch (error) {
                setErrorMessage(error.message);
            }
        }

        saveSamples();
    };

    const inputs: JSX.Element[] = [
        InputHelper.createSOPFormSelectInput('SOP', NewIntermediarySample.nameof('sopId'), sops),
        InputHelper.createFormInput('Description', NewIntermediarySample.nameof('description')),
        InputHelper.createFormInput('Processing person', NewIntermediarySample.nameof('processingPerson')),
        InputHelper.createFormInput('Workflow tag', NewIntermediarySample.nameof('workflowTag')),
    ];

    return (
        <InputModal
            isVisible={isActiveInputForm}
            title="Process sample (generates an intermediate sample)"
            inputs={inputs}
            errorMessage={errorMessage}
            onCreate={async (data: Store) => onCreate(data)}
            onCancel={() => {
                onCancel();
                setSops(null);
            }}
        />
    );
};
