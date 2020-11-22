import React, { FunctionComponent, useEffect, useState } from 'react';
import { Form, Select } from 'antd';
import { InputModal } from '../../../../../common/inputModal';
import { ClinicalSample, SOP } from '../../../../../types';
import { validationMessage, createFormInput } from '../../../../../common/inputModalHelpers';
import { Store } from 'antd/lib/form/interface';
import { Api } from '../../api';
const { Option } = Select;

type FormProps = {
    originalSample: ClinicalSample | null;
    onCreateSuccessful: () => void;
    onCancel: () => void;
};

export const ProcessSampleForm: FunctionComponent<FormProps> = ({ originalSample, onCreateSuccessful, onCancel }) => {
    const [errorMessage] = useState<string | null>(null);
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
        // wait - replace the SampleType with the proper sample type (maybe a new one has to be created)
        // const sample: SampleType = data as SampleType;
        // async function saveSample() {
        //     try {
        //         const createdSample: SampleType = await Api.postSampleAsync(sample);
        //         onCreateSuccessful(createdSample);
        //     } catch (error) {
        //         setErrorMessage(error.message);
        //     }
        // }
        onCreateSuccessful();
        setSops(null);
    };

    const inputs: JSX.Element[] = [
        createFormSelectInput('SOP Name', ClinicalSample.nameof('name'), sops),
        createFormInput('Description', ClinicalSample.nameof('description')),
        createFormInput('Processing person', ClinicalSample.nameof('processingPerson')),
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
function createFormSelectInput(label: string, propName: keyof ClinicalSample, sops: SOP[]) {
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
                        <Option value={sop.artefactClass}>{sop.name}</Option>
                    ))}
            </Select>
        </Form.Item>
    );
}
