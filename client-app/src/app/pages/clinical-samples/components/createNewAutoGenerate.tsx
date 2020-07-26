import React, { FunctionComponent, useState } from 'react';
import { Form, Input, Typography, Button } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { InputModal } from '../../../common/inputModal';
import { Sample, GenerationData, GenerationDataKeys } from '../../../types';
import { Api } from '../api';
import { PlusOutlined } from '@ant-design/icons';
import { FieldData } from 'antd/node_modules/rc-field-form/lib/interface';
import { AutoGenerateSamples } from './autoGenerateSamples';

const { Text } = Typography;

export { ButtonCreateNew, ClinicalInputForm };

// todo - make this component similar to the create new ms run component, and move it up into the page-components namespace

///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////

type ButtonCreateNewProps = {
    onCreateNewClick: () => void; // todo - instead of combininig the button and the input dialog together from outside, why not include the dialog component here in the same file? that would mean that the entry point is the button, the rest are details. Once the button is imported somewhere, all the other logic is going to be there.
    style?: React.CSSProperties | undefined;
};

const ButtonCreateNew: FunctionComponent<ButtonCreateNewProps> = ({ onCreateNewClick: onAddNewClick, style }) => {
    return (
        <Button type="primary" icon={<PlusOutlined />} onClick={onAddNewClick} style={style}>
            {' '}
            Create new clinical sample
        </Button>
    );
};

///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////

type FormProps = {
    isActiveInputForm: boolean;
    onCreateSuccessful: (sample: Sample) => void;
    onCancel: () => void;
};

const ClinicalInputForm: FunctionComponent<FormProps> = ({ isActiveInputForm, onCreateSuccessful, onCancel }) => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [generationData, setGenerationData] = useState<GenerationData>(new GenerationData());

    const onCreate = (values: any) => {
        async function saveSample() {
            try {
                const createdSample: Sample = await Api.postSampleAsync({ ...values });

                onCreateSuccessful(createdSample);
            } catch (error) {
                // const err = error as FriendlyError;
                // setCreateErrorMessage(err.message);

                setErrorMessage(error.message);
            }
        }
        saveSample();
    };

    const onFieldsChange = (fields: FieldData[]) => {
        if (!fields || fields.length == 0) return;

        const validFields: FieldData[] = fields.filter((f) => GenerationDataKeys.includes(f.name.toString()));

        const newData: GenerationData = { ...generationData };

        validFields.forEach((f) => {
            // todo - transform the switch/case into a dictionary
            switch (f.name.toString()) {
                case GenerationData.nameof('prefixProject'):
                    newData.prefixProject = f.value;
                    break;
                case GenerationData.nameof('projectId'):
                    newData.projectId = f.value;
                    break;
                case GenerationData.nameof('suffixProject'):
                    newData.suffixProject = f.value;
                    break;
                case GenerationData.nameof('processingPerson'):
                    newData.processingPerson = f.value;
                    break;
                case GenerationData.nameof('numberOfEntries'):
                    newData.numberOfEntries = f.value;
                    break;
            }
        });

        setGenerationData(newData);
    };

    return (
        <>
            <InputModal
                visible={isActiveInputForm}
                title="New clinical sample"
                inputForm={(form: FormInstance) => {
                    return inputForm(form, errorMessage, onFieldsChange);
                }}
                onCreate={onCreate}
                onCancel={onCancel}
            >
                <span>{generationData.prefixProject}</span>
                <AutoGenerateSamples templateData={generationData}></AutoGenerateSamples>
            </InputModal>
        </>
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
            form={form}
            name="clinical-sample-input-form"
            initialValues={{ remember: true }}
            onFieldsChange={(changedFields: FieldData[], _: FieldData[]) => onFieldsChange(changedFields)}
        >
            {createFormInput('Project prefix', GenerationData.nameof('prefixProject'))}
            {createFormInput('Project id', GenerationData.nameof('projectId'))}
            {createFormInput('Project suffix', GenerationData.nameof('suffixProject'))}
            {createFormInput('Processing person', GenerationData.nameof('processingPerson'))}
            {createFormInput('Number of entries', GenerationData.nameof('numberOfEntries'))}

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

function validationMessage(field: string): string {
    return `Please enter a valid ${field}!`;
}

function createFormInput<T>(label: string, propName: keyof T) {
    // todo - extract this into a common helper
    return (
        <Form.Item
            label={label}
            name={propName.toString()}
            rules={[{ required: true, message: validationMessage(propName.toString()) }]}
        >
            <Input />
        </Form.Item>
    );
}
