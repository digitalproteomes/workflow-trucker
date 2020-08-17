import React, { FunctionComponent, useState } from 'react';
import { Form, Typography, Table } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { InputModal } from '../../../common/inputModal';
import { GenerationData, GenerationDataKeys, SampleNew, EWorkflowTag } from '../../../types';
import { FieldData } from 'rc-field-form/lib/interface';
import { ColumnsType } from 'antd/lib/table';
import { createFormInput, createFormSelect } from '../../../common/inputModalHelpers';

const { Text } = Typography;

type FormProps = {
    isActiveInputForm: boolean;
    onCreateSuccessful: (count: number) => void;
    onCancel: () => void;
};

export const AutoGenerateInputForm: FunctionComponent<FormProps> = ({
    isActiveInputForm,
    onCreateSuccessful,
    onCancel,
}) => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [generationData, setGenerationData] = useState<GenerationData>(GenerationData.Default);
    const [autoGeneratedSamples, setAutoGeneratedSamples] = useState<SampleNew[]>([]);
    const [isLoadingAnimation, setLoadingAnimationFlag] = useState<boolean>(false);

    const onCreate = (samples: SampleNew[]) => {
        setLoadingAnimationFlag(true);

        async function saveSamples() {
            try {
                samples.forEach(() => {
                    // todo - save each individual sample
                    // todo - or pass all the auto generated samples as an array to the backend
                });

                // onCreateSuccessful(samples.length);
            } catch (error) {
                // const err = error as FriendlyError;
                // setCreateErrorMessage(err.message);

                setErrorMessage(error.message);

                onCancelModalHandler();
                // setLoadingAnimationFlag(false);
            }
        }

        console.log('onCreate');
        setTimeout(() => {
            console.log('immediate');
            setLoadingAnimationFlag(false);
            onCreateSuccessful(samples.length);
        }, 3000);
        console.log('onCreate2');

        saveSamples();
    };

    const onCancelModalHandler = () => {
        console.log('oncancelmodalhandler');
        // todo - this can be removed once live
        setTimeout(() => {}, 3000);

        onCancel();

        setLoadingAnimationFlag(false);
    };

    const onFieldsChange = (fields: FieldData[]) => {
        if (!fields || fields.length === 0) return;

        const validFields: FieldData[] = fields.filter((f) => GenerationDataKeys.includes(f.name.toString()));

        const newData: GenerationData = { ...generationData };

        validFields.forEach((f) => {
            // todo - continue instead of if
            if (f.value) {
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
            }
        });

        const samples: SampleNew[] = autoGenerateSamples(newData);

        setGenerationData(newData); // todo - we don't need to store the template data if we already have the auto generated samples
        setAutoGeneratedSamples(samples);
    };

    return (
        <>
            <InputModal
                visible={isActiveInputForm}
                loading={isLoadingAnimation}
                title="New clinical sample"
                inputForm={(form: FormInstance) => {
                    return inputForm(form, errorMessage, onFieldsChange);
                }}
                onCreate={(_) => {
                    onCreate(autoGeneratedSamples);
                }}
                onCancel={onCancelModalHandler}
            >
                <Table
                    dataSource={autoGeneratedSamples}
                    columns={columns}
                    rowKey={(row) => row.name}
                    // pagination={{ showSizeChanger: true, responsive: true, defaultPageSize: 5 }}
                    scroll={{ y: 220 }}
                />
            </InputModal>
        </>
    );
};

const columns: ColumnsType<SampleNew> = [
    { title: 'Name', dataIndex: SampleNew.nameof('name') },
    { title: 'Clinical sample code (editable)', dataIndex: SampleNew.nameof('clinicalSampleCode') },
    { title: 'Processing person', dataIndex: SampleNew.nameof('processingPerson') },
];

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
            initialValues={GenerationData.Default}
            onFieldsChange={(changedFields: FieldData[], _: FieldData[]) => onFieldsChange(changedFields)}
        >
            {createFormInput('Project prefix', GenerationData.nameof('prefixProject'))}
            {createFormInput('Project id', GenerationData.nameof('projectId'))}
            {createFormInput('Project suffix', GenerationData.nameof('suffixProject'))}
            {createFormInput('Processing person', GenerationData.nameof('processingPerson'))}
            {createFormInput('Description', GenerationData.nameof('description'))}
            {createFormInput('Number of entries', GenerationData.nameof('numberOfEntries'))}
            {createFormSelect('Workflow tags', GenerationData.nameof('workflowTag'), [
                EWorkflowTag.LibraryGeneration,
                EWorkflowTag.SamplePreparation,
                EWorkflowTag.SwathAnalysis,
            ])}

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

function autoGenerateSamples(templateData: GenerationData): SampleNew[] {
    const { numberOfEntries, prefixProject, suffixProject, projectId, processingPerson } = templateData;
    const samples: SampleNew[] = new Array(numberOfEntries);

    let index = 0;
    while (index < numberOfEntries) {
        const id = index + 1;

        samples[index] = {
            projectId: projectId,
            name: `${prefixProject}_${projectId}_${id}_${suffixProject}`,
            parentSampleId: 'parent_sample_id',
            protocolId: -1,
            clinicalSampleCode: id,
            processingPerson: processingPerson,
        };

        index++;
    }

    return samples;
}
