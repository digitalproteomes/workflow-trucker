import React, { FunctionComponent, useEffect, useState } from 'react';
import { Form, Select } from 'antd';
import { InputModal_v2 } from '../../../common/inputModal';
import { ClinicalSample, SOP } from '../../../types';
import { validationMessage, createFormInput } from '../../../common/inputModalHelpers';
import { Store } from 'antd/lib/form/interface';
import { Api } from './processSampleApi';

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
        setSops(await Api.getSOPsAsync(originalSample!.projectId));
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
        <InputModal_v2
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
                        <Option value={sop.id}>{sop.name}</Option>
                    ))}
            </Select>
        </Form.Item>
    );
}
