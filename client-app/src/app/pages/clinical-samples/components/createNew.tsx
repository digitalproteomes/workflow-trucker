import React, { FunctionComponent, useState } from 'react';
import { Form, Typography } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { InputModal } from '../../../common/inputModal';
import { ClinicalSample } from '../../../types';
import { Api } from '../api';
import { createFormInput } from '../../../common/inputModalHelpers';

const { Text } = Typography;

export { ClinicalInputForm };

///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////

type FormProps = {
    isActiveInputForm: boolean;
    onCreateSuccessful: (sample: ClinicalSample) => void;
    onCancel: () => void;
};

const ClinicalInputForm: FunctionComponent<FormProps> = ({ isActiveInputForm, onCreateSuccessful, onCancel }) => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const onCreate = (values: any) => {
        async function saveSample() {
            try {
                const createdSample: ClinicalSample = await Api.postSampleAsync({ ...values });

                onCreateSuccessful(createdSample);
            } catch (error) {
                // const err = error as FriendlyError;
                // setCreateErrorMessage(err.message);

                setErrorMessage(error.message);
            }
        }
        saveSample();
    };

    return (
        <InputModal
            visible={isActiveInputForm}
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
        <Form {...formLayout} name="clinical-sample-input-form" initialValues={{ remember: true }} form={form}>
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

const formLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
