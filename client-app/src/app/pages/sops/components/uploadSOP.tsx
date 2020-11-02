import React, { FunctionComponent, useState } from 'react';
import { Form, Input, Button, Upload, Typography, Menu, Dropdown } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { UploadOutlined, DownOutlined } from '@ant-design/icons';
import { Api } from '../api';
import { UploadProps } from 'antd/lib/upload';
import { FieldData } from 'rc-field-form/lib/interface';
import { Constants } from '../../../default-data/constants';

import { RcFile } from 'antd/lib/upload/interface';
import { InputModal } from '../../../common/inputModal';
import { SOP, SOPDataKeys } from '../../../types';
const { Text } = Typography;

export { ButtonUploadSOP, FormUploadSOP };

type ButtonProps = {
    onUploadDialogOpen: () => void;
    style?: React.CSSProperties | undefined;
};

const ButtonUploadSOP: FunctionComponent<ButtonProps> = ({ onUploadDialogOpen, style }) => {
    return (
        <Button type="primary" icon={<UploadOutlined />} onClick={onUploadDialogOpen} style={style}>
            Upload SOP
        </Button>
    );
};

type FormProps = {
    isActiveUploadForm: boolean;
    onUploadSuccessful: () => void;
    onCancel: () => void;
};

const FormUploadSOP: FunctionComponent<FormProps> = ({ isActiveUploadForm, onUploadSuccessful, onCancel }) => {
    const [isUploading, setIsUploadingFlag] = useState<boolean>(false);
    const [file, setFile] = useState<RcFile | null>(null);
    const [sopData, setSopData] = useState<SOP>(SOP.Default);

    const props: UploadProps = {
        fileList: file === null ? [] : [file],
        onRemove: (_: any) => {
            setFile(null);
        },
        beforeUpload: (selectedFile: RcFile, _: RcFile[]) => {
            setFile(selectedFile);
            return false;
        },
    };

    const handleUpload = async () => {
        if (file === null) {
            // todo - set error message
            return;
        }

        setIsUploadingFlag(true);

        try {
            await Api.postAsync(sopData, file, Constants.projectId);

            setFile(null);
        } catch (error) {
            // todo - set the error message?
            // todo - in case the upload fails, nothing is shown on the UI at the moment
        } finally {
            setIsUploadingFlag(false);
            onUploadSuccessful();
        }
    };

    const onFieldsChange = (fields: FieldData[]) => {
        if (!fields || fields.length === 0) return;

        const validFields: FieldData[] = fields.filter((f) => SOPDataKeys.includes(f.name.toString()));

        const newData: SOP = { ...sopData };

        validFields.forEach((f) => {
            // todo - continue instead of if
            if (f.value) {
                // todo - transform the switch/case into a dictionary
                switch (f.name.toString()) {
                    case SOP.nameof('name'):
                        newData.name = f.value;
                        break;
                    case SOP.nameof('description'):
                        newData.description = f.value;
                        break;
                    // todo - set the other fields as well
                }
            }
        });

        setSopData(newData);
    };

    return (
        <InputModal
            isVisible={isActiveUploadForm}
            title="Upload SOP"
            isLoading={isUploading}
            inputForm={(form: FormInstance) => {
                return inputForm(form, null, onFieldsChange);
            }}
            onCreate={(_) => {
                handleUpload();
            }}
            onCancel={onCancel}
        >
            <Upload {...props}>
                <Button icon={<UploadOutlined />} style={{ float: 'right' }}>
                    Attach SOP
                </Button>
            </Upload>
        </InputModal>
    );
};

function inputForm(
    form: FormInstance,
    errorMessage: string | null,
    onFieldsChange: (newFields: FieldData[]) => void,
): JSX.Element {
    return (
        <Form
            {...formLayout}
            layout={'horizontal'}
            form={form}
            name="clinical-sample-input-form"
            initialValues={SOP.Default}
            onFieldsChange={(changedFields: FieldData[], _: FieldData[]) => onFieldsChange(changedFields)}
        >
            {createFormInput('Name', SOP.nameof('name'))}
            {createFormInput('Description', SOP.nameof('description'))}
            {createFormInput('Processing person', SOP.nameof('processingPerson'))}
            {createDropdownFormInput('SOP Class', SOP.nameof('artefactClass'))}

            {errorMessage == null ? null : (
                <Form.Item label="Error" name="errorMessage">
                    <Text type="danger">{errorMessage}</Text>
                </Form.Item>
            )}
        </Form>
    );
}

const formLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

function createFormInput<T>(label: string, propName: keyof T, placeholder?: string, required: boolean = false) {
    // todo - use the common helper already extracted
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

const menu = (
    <Menu>
        <Menu.Item key="sampleSOP">Standard Procedure Sample Preparation</Menu.Item>
        <Menu.Item key="msRunSOP">Standard Procedure Mass Spectrometry</Menu.Item>
        <Menu.Item key="dataSOP">Standard Procedure Data Analysis</Menu.Item>
    </Menu>
);

function createDropdownFormInput<T>(label: string, propName: keyof T, placeholder?: string, required: boolean = false) {
    return (
        // todo - implement the dropdown properly
        <Form.Item label={label} name={propName.toString()}>
            <Dropdown overlay={menu} trigger={['click']}>
                <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                    SOP Class <DownOutlined />
                </a>
            </Dropdown>
        </Form.Item>
    );
}
function validationMessage(field: string): string {
    return `Please enter a valid ${field}!`;
}
