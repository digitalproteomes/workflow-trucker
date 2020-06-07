import React, { FunctionComponent, useState } from 'react';
import { Form, Input, Typography, Button } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { InputModal } from '../../../common/inputModal';
import { Project, Sample } from '../../../types';
import { Api } from '../api';

export { ButtonCreateNew, InputForm };

///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////

const { Text } = Typography;

type ButtonCreateNewProps = {
    onAddNewClick: () => void;
    style?: React.CSSProperties | undefined;
};

const ButtonCreateNew: FunctionComponent<ButtonCreateNewProps> = ({ onAddNewClick, style }) => {
    return (
        <Button type="primary" onClick={onAddNewClick} style={style}>
            Add new clinical sample
        </Button>
    );
};

///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////

type InputFormProps = {
    isActiveInputForm: boolean;
    onCreateSuccessful: (key: any) => void;
    onCancel: () => void;
};

const InputForm: FunctionComponent<InputFormProps> = ({ isActiveInputForm, onCreateSuccessful, onCancel }) => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const onCreate = (values: any) => {
        async function saveClinicalSample() {
            try {
                const createdSample: Sample = await Api.postClinicalSampleAsync({ ...values });

                onCreateSuccessful(createdSample.id);
            } catch (error) {
                // const err = error as FriendlyError;
                // setCreateErrorMessage(err.message);

                setErrorMessage(error.message);
            }
        }
        saveClinicalSample();
    };

    return (
        <InputModal
            visible={isActiveInputForm}
            title="New clinical sample"
            inputForm={(form: FormInstance) => {
                return clinicalInputForm(form, errorMessage);
            }}
            onCreate={onCreate}
            onCancel={onCancel}
        />
    );
};

function clinicalInputForm(form: FormInstance, errorMessage: string | null) {
    return (
        <Form {...formLayout} name="clinical-sample-input-form" initialValues={{ remember: true }} form={form}>
            <Form.Item
                label="Name"
                name={Project.nameof('name')}
                rules={[{ required: true, message: validationMessage(Sample.nameof('name')) }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Project Id"
                name={Project.nameof('projectId')}
                rules={[{ required: true, message: validationMessage(Sample.nameof('projectId')) }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Source sample id"
                name="sourceSampleId"
                rules={[{ required: true, message: validationMessage(Sample.nameof('sourceSampleId')) }]}
            >
                <Input />
            </Form.Item>
            {errorMessage == null ? null : (
                <Form.Item label="Name" name="errorMessage">
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

function validationMessage(field: string): string {
    return `Please enter a valid ${field}!`;
}
