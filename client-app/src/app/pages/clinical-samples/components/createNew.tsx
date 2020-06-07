import React, { FunctionComponent } from 'react';
import { Form, Input } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { InputModal } from '../../../common/inputModal';
import { Project, Sample } from '../../../types';

type Props = {
    isActiveInputForm: boolean;
    onCreate: (values: any) => void;
    onCancel: () => void;
};

export const InputForm: FunctionComponent<Props> = ({ isActiveInputForm, onCreate, onCancel }) => {
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
                label="Name"
                name="sourceSampleId"
                rules={[{ required: true, message: validationMessage(Sample.nameof('sourceSampleId')) }]}
            >
                <Input />
            </Form.Item>
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
