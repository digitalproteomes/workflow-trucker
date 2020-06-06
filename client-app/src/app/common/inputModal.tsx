import React, { FunctionComponent } from 'react';
import { Form, Modal } from 'antd';
import { FormInstance } from 'antd/lib/form';

type ModalProps = {
    visible: boolean;
    title: string;
    inputForm: (form: FormInstance) => JSX.Element;
    onCreate: (values: any) => void;
    onCancel: () => void;
};

export const InputModal: FunctionComponent<ModalProps> = ({
    visible,
    title,
    inputForm,
    onCreate,
    onCancel,
}) => {
    const [form] = Form.useForm();

    return (
        <Modal
            visible={visible}
            title={title}
            okText="Create"
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
                    });
            }}
        >
            {inputForm(form)}
        </Modal>
    );
};
