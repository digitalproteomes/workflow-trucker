import React, { FunctionComponent, useEffect, useState } from 'react';
import { Col, Form, Modal, Row, Typography } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { Notifications } from './notifications';
import { Store } from 'antd/lib/form/interface';
import { FormLayoutConstants } from './constants';
import { ModalProps } from 'antd/lib/modal';

const { Text } = Typography;

type Props = {
    isVisible: boolean;
    title: string;
    inputs: JSX.Element[];
    errorMessage: string | null;
    onCreate: (entry: Store) => Promise<void>;
    onCancel: () => void;
    placeholder?: any;
    onValuesChange?: (values: Store) => void;
    getExistingValues?: () => any;
    buttonConfirmText?: string;
    buttonCancelText?: string;
    styleModal?: ModalProps;
};

export const InputModal: FunctionComponent<Props> = ({
    isVisible,
    title,
    inputs,
    errorMessage,
    onCreate,
    onCancel,
    placeholder,
    onValuesChange,
    getExistingValues,
    buttonConfirmText,
    buttonCancelText,
    styleModal,
    children,
}) => {
    const [form] = Form.useForm();
    const [isSaving, setSavingFlag] = useState<boolean>(false);

    useEffect(() => {
        if (getExistingValues !== undefined) form.setFieldsValue(getExistingValues());
        console.log('form set data');
    }, [getExistingValues, form]);

    const onCreateWrapper = async (sample: Store) => {
        setSavingFlag(true);
        console.log('set saving flag', true);

        await onCreate(sample);

        setSavingFlag(false);
        console.log('set saving flag', false);
    };

    let modalContent: JSX.Element = getInputForm(
        title,
        form,
        inputs,
        errorMessage,
        onCreateWrapper,
        placeholder,
        onValuesChange,
    );

    if (styleModal !== undefined) {
        modalContent = (
            <Row>
                <Col span={12}>{modalContent}</Col>
                <Col span={12} />
            </Row>
        );
    }

    return (
        <Modal
            visible={isVisible}
            width={'30%'}
            title={title}
            okText={buttonConfirmText === null ? 'Create' : buttonConfirmText}
            okButtonProps={{ loading: isSaving }}
            cancelText={buttonCancelText === null ? 'Cancel' : buttonCancelText}
            onCancel={onCancel}
            onOk={() => {
                form.submit();
            }}
            {...styleModal} // this may override the default values set above
        >
            {modalContent}
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
