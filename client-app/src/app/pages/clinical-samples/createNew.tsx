import React from 'react';
import { Form, Input } from 'antd';
import { FormInstance } from 'antd/lib/form';

const formLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

export function clinicalInputForm(form: FormInstance) {
    return (
        <Form
            {...formLayout}
            name="clinical-sample-input-form"
            initialValues={{ remember: true }}
            form={form}
        >
            <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please enter a name!' }]}
            >
                <Input />
            </Form.Item>
        </Form>
    );
}
