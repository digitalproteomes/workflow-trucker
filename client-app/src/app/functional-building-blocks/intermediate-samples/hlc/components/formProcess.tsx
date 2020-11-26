import React, { FunctionComponent, useEffect, useState } from 'react';
import { Form, Select } from 'antd';
import { Store } from 'antd/lib/form/interface';
import { InputModal } from '../../../../common/inputModal';
import { createFormInput, validationMessage } from '../../../../common/inputModalHelpers';
import { ClinicalSample, IntermediateSample, NewIntermediarySample, SOP } from '../../../../types';
import { Api } from '../../api';
const { Option } = Select;

type FormProps = {
    originalSample: ClinicalSample | null;
    onCreateSuccessful: (sample: IntermediateSample) => void;
    onCancel: () => void;
};

export const ProcessSampleForm: FunctionComponent<FormProps> = ({ originalSample, onCreateSuccessful, onCancel }) => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [sops, setSops] = useState<SOP[] | null>(null);

    const isActiveInputForm: boolean = originalSample != null;
    async function executeFetch() {
        const receivedSops = await Api.getSOPsAsync(originalSample!.projectId);
        setSops(receivedSops);
        console.log('received sops', receivedSops);
    }

    useEffect(() => {
        if (isActiveInputForm && sops == null) {
            executeFetch();
        }
    });

    if (isActiveInputForm == null || sops == null) return <></>;

    const onCreate = (data: Store) => {
        const sample: NewIntermediarySample = data as NewIntermediarySample;
        sample.clinicalSampleId = originalSample!.id;

        async function saveSample() {
            try {
                const createdSamples = await Api.postProcessedSampleAsync([sample]);

                onCreateSuccessful(createdSamples[0]);
                setSops(null);
            } catch (error) {
                setErrorMessage(error.message);
            }
        }

        saveSample();
    };

    const inputs: JSX.Element[] = [
        createFormSelectInput('SOP', NewIntermediarySample.nameof('sopId'), sops),
        createFormInput('Description', NewIntermediarySample.nameof('description')),
        createFormInput('Processing person', NewIntermediarySample.nameof('processingPerson')),
        createFormInput('Workflow tag', NewIntermediarySample.nameof('workflowTag')),
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

// wait - if the createFormSelectInput is implemented 2-3 times, extract it into a helper
function createFormSelectInput(label: string, propName: keyof NewIntermediarySample, sops: SOP[]) {
    return (
        <Form.Item
            label={label}
            name={propName.toString()}
            rules={[{ required: false, message: validationMessage(propName.toString()) }]}
        >
            <Select showSearch filterOption={true} optionFilterProp={'children'}>
                {sops
                    .sort((a, b) => {
                        // wait: is this the best string filtering approach? is empty string?
                        return a.name[0] > b.name[0] ? 1 : a.name[0] === b.name[0] ? 0 : -1;
                    })
                    .map((sop) => (
                        <Option value={sop.id}>{sop.name}</Option>
                    ))}
            </Select>
        </Form.Item>
    );
}
