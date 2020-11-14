import React, { FunctionComponent, useState } from 'react';
import { Form, Typography } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { InputModal } from '../../../common/inputModal';
import { ClinicalSample } from '../../../types';
import { Api } from '../api';
import { createFormInput } from '../../../common/inputModalHelpers';
import { FormLayoutConstants } from '../../../common/constants';

const { Text } = Typography;

type FormProps = {
    isActiveInputForm: boolean;
    onCreateSuccessful: (sample: ClinicalSample) => void;
    onCancel: () => void;
};

export const ClinicalInputForm: FunctionComponent<FormProps> = ({
    isActiveInputForm,
    onCreateSuccessful,
    onCancel,
}) => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const onCreate = (values: any) => {
        async function saveSample() {
            try {
                const createdSample: ClinicalSample = await Api.postSampleAsync({ ...values });

                onCreateSuccessful(createdSample);
            } catch (error) {
                setErrorMessage(error.message);
            }
        }
        saveSample();
    };

    return (
        <InputModal
            isVisible={isActiveInputForm}
            title="New clinical sample"
            inputForm={(form: FormInstance) => {
                return inputForm(form, errorMessage);
            }}
            onCreate={onCreate}
            onCancel={onCancel}
        />
    );
};

function inputForm(form: FormInstance, errorMessage: string | null): JSX.Element {
    return (
        <Form
            {...FormLayoutConstants.defaultFormLayout}
            name="clinical-sample-input-form"
            initialValues={{ remember: true }}
            form={form}
        >
            {createFormInput('Name', ClinicalSample.nameof('name'))}
            {createFormInput('ProjectId', ClinicalSample.nameof('projectId'))}
            {createFormInput('Clinical sample code', ClinicalSample.nameof('clinicalSampleCode'))}

            {errorMessage == null ? null : (
                <Form.Item label="Error" name="errorMessage">
                    <Text type="danger">{errorMessage}</Text>
                </Form.Item>
            )}
        </Form>
    );
}
