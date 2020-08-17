import React, { FunctionComponent } from 'react';
import { Form, Modal, Input } from 'antd';
import { FormInstance } from 'antd/lib/form';

type ModalProps = {
    visible: boolean;
    loading?: boolean;
    title: string;
    isLoading?: boolean;
    inputForm: (form: FormInstance) => JSX.Element;
    onCreate: (values: any) => void;
    onCancel: () => void;
};

export const InputModal: FunctionComponent<ModalProps> = ({
    visible,
    loading,
    title,
    isLoading,
    inputForm,
    onCreate,
    onCancel,
    children,
}) => {
    const [form] = Form.useForm();

    return (
        <Modal
            visible={visible}
            width={'30%'} // todo - the width of the input modal should be customizable
            title={title}
            confirmLoading={isLoading}
            okText="Create"
            okButtonProps={{ loading: loading }}
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form.validateFields()
                    .then((values) => {
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch((info) => {
                        console.log('Validation Failed:', info);

                        // todo - instead of onCancel, we should call onCreate(failed);
                        onCancel();
                    });
            }}
        >
            {inputForm(form)}
            {children}
        </Modal>
    );
};

export function getFormInput<T>(fieldName: keyof T, label: string) {
    const field: string = fieldName.toString();

    return (
        <Form.Item label={label} name={field} rules={[{ required: true, message: validationMessage(label) }]}>
            <Input />
        </Form.Item>
    );
}

function validationMessage<T>(label: string): string {
    return `Please enter a valid ${label}!`;
}
