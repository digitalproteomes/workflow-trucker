import React, { FunctionComponent } from 'react';
import { Form, Modal } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { Notifications } from './notifications';

type ModalProps = {
    isVisible: boolean;
    title: string;
    isLoading?: boolean;
    inputForm: (form: FormInstance) => JSX.Element;
    onCreate: (values: any) => void;
    onCancel: () => void;
};

export const InputModal: FunctionComponent<ModalProps> = ({
    isVisible,
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
            visible={isVisible}
            width={'30%'}
            title={title}
            okText="Create"
            okButtonProps={{ loading: isLoading }}
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form.validateFields()
                    .then((values) => {
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch((info) => {
                        console.log('Warning message shown. Validation failed:', info);
                        Notifications.queueWarning('Validation', 'Field validation failed. Please check the values.');
                    });
            }}
        >
            {inputForm(form)}
            {children}
        </Modal>
    );
};
