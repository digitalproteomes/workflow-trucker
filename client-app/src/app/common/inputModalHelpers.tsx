import React from 'react';
import { Checkbox, Form, Input, InputNumber, Select } from 'antd';
import { getSOPType, getWorkflowTag } from './tags';
import { ESOPType, EWorkflowTag } from '../types';

const { Option } = Select;

export function createFormInputNumber<T>(
    label: string,
    propName: keyof T,
    placeholder: string | undefined = undefined,
    required: boolean = false,
) {
    return (
        <Form.Item
            label={label}
            name={propName.toString()}
            key={propName.toString()}
            rules={[{ required: required, message: validationMessage(propName.toString()) }]}
        >
            <InputNumber placeholder={placeholder} />
        </Form.Item>
    );
}

export function createFormInputCheckbox<T>(label: string, propName: keyof T, value?: boolean) {
    return (
        <Form.Item
            name={propName.toString()}
            valuePropName="checked"
            key={propName.toString()}
            rules={[{ required: false, message: validationMessage(propName.toString()) }]}
        >
            <Checkbox value={value}>{label}</Checkbox>
        </Form.Item>
    );
}

export function createFormInput<T>(
    label: string,
    propName: keyof T,
    placeholder: string | undefined = undefined,
    required: boolean = false,
) {
    return (
        <Form.Item
            label={label}
            name={propName.toString()}
            key={propName.toString()}
            rules={[{ required: required, message: validationMessage(propName.toString()) }]}
        >
            <Input placeholder={placeholder} />
        </Form.Item>
    );
}

export function validationMessage(field: string): string {
    return `Please enter a valid ${field}!`;
}

export function createFormSelect<T>(label: string, propName: keyof T, workflowTags: EWorkflowTag[]) {
    return (
        <Form.Item
            label={label}
            name={propName.toString()}
            key={propName.toString()}
            rules={[{ required: false, message: validationMessage(propName.toString()) }]}
        >
            <Select
                mode={'multiple'}
                tagRender={(props) => {
                    const { value } = props; // reference https://ant.design/components/select/#components-select-demo-custom-tag-render
                    return getWorkflowTag(value as EWorkflowTag);
                }}
            >
                {workflowTags.map((tag) => (
                    <Option value={tag}>{tag}</Option>
                ))}
            </Select>
        </Form.Item>
    );
}

export function createSOPFormSelect<T>(label: string, propName: keyof T, sopTypes: ESOPType[]) {
    return (
        <Form.Item
            label={label}
            name={propName.toString()}
            key={propName.toString()}
            rules={[{ required: false, message: validationMessage(propName.toString()) }]}
        >
            <Select
                tagRender={(props) => {
                    const { value } = props; // reference https://ant.design/components/select/#components-select-demo-custom-tag-render
                    return getSOPType(value as ESOPType);
                }}
            >
                {sopTypes.map((type) => (
                    <Option value={type}>{type}</Option>
                ))}
            </Select>
        </Form.Item>
    );
}
