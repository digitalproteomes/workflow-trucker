import React, { FunctionComponent } from 'react';
import { Form, Input } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { InputModal } from '../../../common/inputModal';

type Props = {
    isActiveInputForm: boolean;
    onCreate: (values: any) => void;
    onCancel: () => void;
};

export const ClinicalSampleInputForm: FunctionComponent<Props> = ({ isActiveInputForm, onCreate, onCancel }) => {
    return (
        <InputModal
            visible={isActiveInputForm}
            title="New clinical sample"
            inputForm={clinicalInputForm}
            onCreate={onCreate}
            onCancel={onCancel}
        ></InputModal>
    );
};

function clinicalInputForm(form: FormInstance) {
    return (
        <Form {...formLayout} name="clinical-sample-input-form" initialValues={{ remember: true }} form={form}>
            <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter a name!' }]}>
                <Input />
            </Form.Item>
        </Form>
    );
}

const formLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
