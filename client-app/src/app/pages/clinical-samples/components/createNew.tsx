import React, { FunctionComponent, useState } from 'react';
import { Form, Input, Typography, Button } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { InputModal } from '../../../common/inputModal';
import { Sample } from '../../../types';
import { Api } from '../api';
import { PlusOutlined } from '@ant-design/icons';

const { Text } = Typography;

export { ButtonCreateNew, ClinicalInputForm };

// todo - make this component similar to the create new ms run component, and move it up into the page-components namespace

///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////

type ButtonCreateNewProps = {
    onCreateNewClick: () => void; // todo - instead of combininig the button and the input dialog together from outside, why not include the dialog component here in the same file? that would mean that the entry point is the button, the rest are details. Once the button is imported somewhere, all the other logic is going to be there.
    style?: React.CSSProperties | undefined;
};

const ButtonCreateNew: FunctionComponent<ButtonCreateNewProps> = ({ onCreateNewClick: onAddNewClick, style }) => {
    return (
        <Button type="primary" icon={<PlusOutlined />} onClick={onAddNewClick} style={style}>
            {' '}
            Create new clinical sample
        </Button>
    );
};

///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////

type FormProps = {
    isActiveInputForm: boolean;
    onCreateSuccessful: (sample: Sample) => void;
    onCancel: () => void;
};

const ClinicalInputForm: FunctionComponent<FormProps> = ({ isActiveInputForm, onCreateSuccessful, onCancel }) => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const onCreate = (values: any) => {
        async function saveSample() {
            try {
                const createdSample: Sample = await Api.postSampleAsync({ ...values });

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
            {createFormInput('Name', Sample.nameof('name'))}
            {createFormInput('ProjectId', Sample.nameof('projectId'))}
            {createFormInput('Source sample id', Sample.nameof('sourceSampleId'))}

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

function createFormInput<T>(label: string, propName: keyof T) {
    // todo - extract this into a common helper
    return (
        <Form.Item
            label={label}
            name={propName.toString()}
            rules={[{ required: true, message: validationMessage(propName.toString()) }]}
        >
            <Input />
        </Form.Item>
    );
}

function validationMessage(field: string): string {
    return `Please enter a valid ${field}!`;
}
