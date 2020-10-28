import React, { FunctionComponent, useState } from 'react';
import { Form, Input, Button, Upload, Typography } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { UploadOutlined } from '@ant-design/icons';
import { Api } from '../api';
import { UploadProps } from 'antd/lib/upload';
import { FieldData } from 'rc-field-form/lib/interface';

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

    const handleUpload = () => {
        if (file === null) {
            // todo - set error message
            return;
        }

        setIsUploadingFlag(true);

        try {
            Api.postAsync({}, file);

            setFile(null);
        } catch (error) {
            // todo - set the error message?
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
    };

    return (
        <InputModal
            visible={isActiveUploadForm}
            title="Upload SOP"
            inputForm={(form: FormInstance) => {
                return inputForm(form, null, onFieldsChange);
            }}
            onCreate={(_) => {
                handleUpload();
            }}
            onCancel={onCancel}
        >
            <Upload {...props}>
                <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>

            {/* todo - the button below is replaced by the onCreate callback in the inputModal. the loading feature should get migrated?
             <Button
                type="primary"
                onClick={handleUpload}
                disabled={file === null}
                loading={isUploading}
                style={{ marginTop: 16 }}
            >
                {isUploading ? 'Uploading' : 'Start Upload'}
            </Button> */}
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
    // todo - extract this into a common helper
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

function validationMessage(field: string): string {
    return `Please enter a valid ${field}!`;
}
