import React, { FunctionComponent, useEffect, useState } from 'react';
import { Form, Select, Typography } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { InputModal } from '../../../common/inputModal';
import { ClinicalSample, SOP } from '../../../types';
import { defaultFormLayout } from '../../../common/inputModalSize';
import { validationMessage } from '../../../common/inputModalHelpers';
import { BaseApi } from '../../../infrastructure/api';

const { Text } = Typography;
const { Option, OptGroup } = Select;

type FormProps = {
    originalSample: ClinicalSample | null;
    onCreateSuccessful: () => void;
    onCancel: () => void;
};

export const ProcessSampleForm: FunctionComponent<FormProps> = ({ originalSample, onCreateSuccessful, onCancel }) => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
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

    const onCreate = (values: any) => {
        // todo - parse the values coming from the form, create the object and do whatever
        // todo - todo in case of exception when calling the api, use the setErrorMessage
        onCreateSuccessful();
        setSops(null);
    };

    if (isActiveInputForm == null || sops == null) return <></>; // todo - can this breaking condition be moved up high at the beginning?

    return (
        <InputModal
            isVisible={isActiveInputForm}
            title="Process sample to intermediate sample"
            inputForm={(form: FormInstance) => inputForm(form, sops, errorMessage)}
            onCreate={onCreate}
            onCancel={() => {
                onCancel();
                setSops(null);
            }}
        />
    );
};

function inputForm(form: FormInstance, sops: SOP[], errorMessage: string | null): JSX.Element {
    return (
        <Form {...defaultFormLayout} name="clinical-sample-input-form" initialValues={{ remember: true }} form={form}>
            {createFormSelectInput('Name', ClinicalSample.nameof('name'), sops)}

            {errorMessage == null ? null : (
                <Form.Item label="Error" name="errorMessage">
                    <Text type="danger">{errorMessage}</Text>
                </Form.Item>
            )}
        </Form>
    );
}

function createFormSelectInput(label: string, propName: keyof ClinicalSample, sops: SOP[]) {
    return (
        <Form.Item
            label={label}
            name={propName.toString()}
            rules={[{ required: false, message: validationMessage(propName.toString()) }]}
        >
            <Select>
                {sops.map((sop) => (
                    <Option value={''}>{sop.name}</Option>
                ))}
            </Select>
        </Form.Item>
    );
}

class Api {
    public static async getSOPsAsync(projectId: string): Promise<SOP[]> {
        try {
            return await BaseApi.getAsync(`/sops/project?projectId=${projectId}`);
        } catch (err) {
            return [];
        }
    }
}
