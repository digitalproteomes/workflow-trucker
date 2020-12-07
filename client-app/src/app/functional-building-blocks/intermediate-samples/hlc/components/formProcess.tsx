import React, { FunctionComponent, useEffect, useState } from 'react';
import { Form, Select } from 'antd';
import { Store } from 'antd/lib/form/interface';
import { InputModal } from '../../../../common/inputModal';
import { createFormInput, validationMessage } from '../../../../common/inputModalHelpers';
import { NewIntermediarySample, SOP } from '../../../../types';
import { ClinicalSample } from '../../../../types';
import { Api } from '../../api';
import { Constants } from '../../../../default-data/constants';
const { Option } = Select;

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
