import React, { FunctionComponent, useState } from 'react';
import { Form, Typography } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { InputModal } from '../../../common/inputModal';
import { GenerationData, GenerationDataKeys, SampleNew, EWorkflowTag } from '../../../types';
import { FieldData } from 'rc-field-form/lib/interface';
import { createFormInput, createFormSelect } from '../../../common/inputModalHelpers';
import { EditableList } from './autoGenerateResultList';
import { Api } from '../api';
import { Constants } from '../../../default-data/constants';
import { FormLayoutConstants } from '../../../common/constants';

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
    const [templateData, setTemplateData] = useState<GenerationData>(GenerationData.Default);
    const [autoGeneratedSamples, setAutoGeneratedSamples] = useState<SampleNew[]>([]);
    const [isLoadingAnimation, setLoadingAnimationFlag] = useState<boolean>(false);

    const onCreate = (samples: SampleNew[]) => {
        setLoadingAnimationFlag(true);

        async function saveSamples() {
            try {
                // TODO: move this really specific api call into an api module of its own, right here along the autoGenerate related components
                await Api.postAutoGeneraedSamplesAsync(samples);
                onCreateSuccessful(samples.length);
            } catch (error) {
                // const err = error as FriendlyError;
                // setCreateErrorMessage(err.message);

                setErrorMessage(error.message);
            } finally {
                setLoadingAnimationFlag(false);
            }
        }

        saveSamples();
    };

    const onCancelModalHandler = () => {
        console.log('oncancelmodalhandler');
        // TODO: this can be removed once live
        setTimeout(() => {}, 3000);

        onCancel();
    };

    const onFieldsChange = (fields: FieldData[]) => {
        if (!fields || fields.length === 0) return;

        const validFields: FieldData[] = fields.filter((f) => GenerationDataKeys.includes(f.name.toString()));

        const template: GenerationData = { ...templateData };

        // TODO: when getting back the data from the fields edited, why not use the form context exemplified in the editable table component

        validFields.forEach((f) => {
            // TODO: continue instead of if
            if (f.value) {
                // TODO: transform the switch/case into a dictionary
                switch (f.name.toString()) {
                    case GenerationData.nameof('prefixProject'):
                        template.prefixProject = f.value;
                        break;
                    case GenerationData.nameof('projectId'):
                        template.projectId = f.value;
                        break;
                    case GenerationData.nameof('suffixProject'):
                        template.suffixProject = f.value;
                        break;
                    case GenerationData.nameof('processingPerson'):
                        template.processingPerson = f.value;
                        break;
                    case GenerationData.nameof('description'):
                        template.description = f.value;
                        break;
                    case GenerationData.nameof('numberOfEntries'):
                        template.numberOfEntries = f.value;
                        break;
                    case GenerationData.nameof('workflowTag'):
                        template.workflowTag = f.value;
                        break;
                }
            }
        });

        const samples: SampleNew[] = autoGenerateSamples(template);

        setTemplateData(template);
        setAutoGeneratedSamples(samples);
    };

    return (
        <>
            <InputModal
                isVisible={isActiveInputForm}
                isLoading={isLoadingAnimation}
                title="New clinical sample"
                inputForm={(form: FormInstance) => {
                    return inputForm(form, errorMessage, onFieldsChange);
                }}
                onCreate={(_) => {
                    onCreate(autoGeneratedSamples);
                }}
                onCancel={onCancelModalHandler}
            >
                <EditableList
                    clinicalSamples={autoGeneratedSamples}
                    updateClinicalSamples={(samples: SampleNew[]) => {
                        setAutoGeneratedSamples(samples);
                    }}
                />
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
            {...FormLayoutConstants.defaultFormLayout}
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

function autoGenerateSamples(templateData: GenerationData): SampleNew[] {
    const { numberOfEntries, prefixProject, suffixProject, projectId } = templateData;
    const samples: SampleNew[] = new Array(numberOfEntries);

    let index = 0;
    while (index < numberOfEntries) {
        const id = index + 1;

        samples[index] = {
            projectId: Constants.projectId, // TODO: the project id should come from the template data (the unique project id from the db)
            name: `${prefixProject}_${projectId}_${id}_${suffixProject}`,
            parentSampleId: 'parent_sample_id',
            protocolId: -1,
            clinicalSampleCode: `${id}`, // TODO: the clinical sample code - how come this is not a number? on the clinical sample this is a number!
            processingPerson: templateData.processingPerson,
            description: templateData.description,
            sampleCounter: id, // TODO: the sampleCounter should be removed from the frontend. It is completely wrong to have it here
            workflowTag: EWorkflowTag.SamplePreparation,
        };

        index++;
    }

    return samples;
}
