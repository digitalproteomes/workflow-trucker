import React, { FunctionComponent, useState } from 'react';
import { Form, Modal, Typography } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { Notifications } from './notifications';
import { Store } from 'antd/lib/form/interface';
import { FormLayoutConstants } from './constants';

const { Text } = Typography;

type ModalProps = {
    isVisible: boolean;
    title: string;
    inputs: JSX.Element[];
    errorMessage: string | null;
    onCreate: (entry: Store) => Promise<void>;
    onCancel: () => void;
    placeholder?: any;
    onValuesChange?: (values: Store) => void;
};

export const InputModal: FunctionComponent<ModalProps> = ({
    isVisible,
    title,
    inputs,
    errorMessage,
    onCreate,
    onCancel,
    placeholder,
    onValuesChange,
    children,
}) => {
    const [form] = Form.useForm();
    const [isSaving, setSavingFlag] = useState<boolean>(false);

    const onCreateWrapper = async (sample: Store) => {
        setSavingFlag(true);
        console.log('set saving flag', true);

        await onCreate(sample);

        setSavingFlag(false);
        console.log('set saving flag', false);
    };

    return (
        <Modal
            visible={isVisible}
            width={'30%'}
            title={title}
            okText="Create"
            okButtonProps={{ loading: isSaving }}
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form.submit();
            }}
        >
            {getInputForm(title, form, inputs, errorMessage, onCreateWrapper, placeholder, onValuesChange)}
            {children}
        </Modal>
    );
};

function getInputForm<T>(
    name: string,
    form: FormInstance,
    inputFields: JSX.Element[],
    errorMessage: string | null,
    onCreate: (sample: T) => Promise<void>,
    placeholder?: any,
    onValuesChange?: (values: T) => void,
): JSX.Element {
    return (
        <Form
            {...FormLayoutConstants.defaultFormLayout}
            name={name}
            initialValues={placeholder}
            onValuesChange={(_: Store, values: Store) => {
                if (onValuesChange != null) onValuesChange(values as T);
            }}
            form={form}
            onFinish={async (values: Store) => {
                console.log('on finish values', values as T);

                await onCreate(values as T);
            }}
            onFinishFailed={(errorInfo: any /*ValidateErrorEntity*/) => {
                console.log('Warning message shown. Validation failed:', errorInfo);
                Notifications.queueWarning('Validation', 'Field validation failed. Please check the values.');
            }}
        >
            {inputFields}

            {errorMessage == null ? null : (
                <Form.Item label="Error" name="errorMessage">
                    <Text type="danger">{errorMessage}</Text>
                </Form.Item>
            )}
        </Form>
    );
}
