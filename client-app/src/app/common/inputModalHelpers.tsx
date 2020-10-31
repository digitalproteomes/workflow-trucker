import React from 'react';
import { Form, Input, Select } from 'antd';
import { getWorkflowTag } from './tags';
import { EWorkflowTag } from '../types';

const { Option } = Select;

export function createFormInput<T>(label: string, propName: keyof T, placeholder?: string, required: boolean = false) {
    return (
        <Form.Item
            label={label}
            name={propName.toString()}
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
    // todo - extract this into a common helper
    return (
        <Form.Item
            label={label}
            name={propName.toString()}
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
