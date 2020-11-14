import React, { FunctionComponent } from 'react';
import { Form, Modal } from 'antd';
import { FormInstance } from 'antd/lib/form';

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
            width={'30%'} // TODO: the width of the input modal should be customizable
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
                        console.log('Validation Failed:', info);

                        // TODO: instead of onCancel, we should call onCreate(failed);
                        onCancel();
                    });
            }}
        >
            {inputForm(form)}
            {children}
        </Modal>
    );
};
