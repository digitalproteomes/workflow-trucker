import React from 'react';
import { Checkbox, Form, Input, InputNumber, Select } from 'antd';
import { getSOPType } from './tags';
import { ESOPType, EWorkflowTag, SOP } from '../types';

const { Option } = Select;

export class InputHelper {
    static createFormInputNumber<T>(
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

    static createFormInputCheckbox<T>(label: string, propName: keyof T, value?: boolean) {
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

    static createFormInput<T>(
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

    static createFormSelect<T>(label: string, propName: keyof T, workflowTags: EWorkflowTag[]) {
        return (
            <Form.Item
                label={label}
                name={propName.toString()}
                key={propName.toString()}
                rules={[{ required: false, message: validationMessage(propName.toString()) }]}
            >
                <Select
                    key={propName.toString()}
                    // mode={'multiple'} // this is not used anywhere (i guess) as multiple selection, so this is commented out to avoid having warnings like "Warning: `value` should be array when `mode` is `multiple` or `tags`"
                    // tagRender={(props) => {
                    //     const { value } = props; // reference https://ant.design/components/select/#components-select-demo-custom-tag-render
                    //     return getWorkflowTag(value as EWorkflowTag);
                    // }}
                >
                    {workflowTags.map((tag) => (
                        <Option key={tag} value={tag}>
                            {tag}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
        );
    }

    static createSOPTypeFormSelect<T>(label: string, propName: keyof T, sopTypes: ESOPType[], required?: boolean) {
        return (
            <Form.Item
                label={label}
                name={propName.toString()}
                key={propName.toString()}
                rules={[{ required: required, message: validationMessage(propName.toString()) }]}
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

    // todo - the SOP form select input being so tightly coupled to the SOP type, should it be moved to the functional components area?
    static createSOPFormSelectInput<T>(label: string, propName: keyof T, sops: SOP[], required?: boolean) {
        return (
            <Form.Item
                label={label}
                name={propName.toString()}
                key={propName.toString()}
                rules={[{ required: required, message: validationMessage(propName.toString()) }]}
            >
                <Select key={propName.toString()} showSearch filterOption={true} optionFilterProp={'children'}>
                    {sops
                        .sort((a, b) => {
                            // wait: is this the best string filtering approach? is empty string?
                            return a.name[0] > b.name[0] ? 1 : a.name[0] === b.name[0] ? 0 : -1;
                        })
                        .map((sop) => (
                            <Option key={sop.id} value={sop.id}>
                                {sop.name}
                            </Option>
                        ))}
                </Select>
            </Form.Item>
        );
    }
}

export function validationMessage(field: string): string {
    return `Please enter a valid ${field}!`;
}
