import React, { FunctionComponent, useState } from 'react';
import { EditableList } from './autoGenerateResultList';
import { Api } from '../../api';
import { Store } from 'antd/lib/form/interface';
import { InputModal } from '../../../../common/inputModal';
import { createFormInput, createFormSelect } from '../../../../common/inputModalHelpers';
import { Constants } from '../../../../default-data/constants';
import { GenerationData, EWorkflowTag } from '../../../../types';
import { ClinicalSampleNew } from '../../../../types';

type FormProps = {
    isActiveInputForm: boolean;
    onCreateSuccessful: (count: number) => void;
    onCancel: () => void;
};

// todo - easy - move the auto generation related files into their own folder
export const AutoGenerateInputForm: FunctionComponent<FormProps> = ({
    isActiveInputForm,
    onCreateSuccessful,
    onCancel,
}) => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [autoGeneratedSamples, setAutoGeneratedSamples] = useState<ClinicalSampleNew[]>([]);

    const onCreate = (samples: ClinicalSampleNew[]) => {
        async function saveSamples() {
            try {
                await Api.postAutoGeneratedSamplesAsync(samples);

                onCreateSuccessful(samples.length);
            } catch (error) {
                setErrorMessage(error.message);
            }
        }

        saveSamples();
    };

    const onFieldsChange = (templateRaw: Store) => {
        const template: GenerationData = templateRaw as GenerationData;

        const samples: ClinicalSampleNew[] = autoGenerateSamples(template);

        setAutoGeneratedSamples(samples);
    };

    const inputs: JSX.Element[] = [
        createFormInput('Project prefix', GenerationData.nameof('prefixProject')),
        createFormInput('Project suffix', GenerationData.nameof('suffixProject')),
        createFormInput('Description', GenerationData.nameof('description')),
        createFormInput('Number of entries', GenerationData.nameof('numberOfEntries')),
        createFormSelect('Workflow tags', GenerationData.nameof('workflowTag'), [
            EWorkflowTag.LibraryGeneration,
            EWorkflowTag.SamplePreparation,
            EWorkflowTag.SwathAnalysis,
        ]),
    ];

    return (
        <>
            <InputModal
                isVisible={isActiveInputForm}
                errorMessage={errorMessage}
                inputs={inputs}
                placeholder={GenerationData.Default}
                title="New clinical samples"
                onValuesChange={onFieldsChange}
                onCreate={async (_) => {
                    onCreate(autoGeneratedSamples);
                }}
                onCancel={onCancel}
            >
                <EditableList
                    entries={autoGeneratedSamples}
                    onListChanged={(samples: ClinicalSampleNew[]) => {
                        setAutoGeneratedSamples(samples);
                    }}
                />
            </InputModal>
        </>
    );
};

function autoGenerateSamples(templateData: GenerationData): ClinicalSampleNew[] {
    const { numberOfEntries, prefixProject, suffixProject } = templateData;
    const samples: ClinicalSampleNew[] = new Array(numberOfEntries);

    const projectId = Constants.projectId;
    const personId = Constants.personId;

    let index = templateData.idSeed;
    while (index < numberOfEntries) {
        const id = index + 1;

        samples[index] = {
            projectId: Constants.projectId,
            name: `${prefixProject}_${projectId}_${id}_${suffixProject}`,
            clinicalSampleCode: `${id}`, // wait: the clinical sample code - how come this is not a number? on the clinical sample this is a number!
            processingPerson: personId,
            description: templateData.description,
            workflowTag: EWorkflowTag.SamplePreparation,
            quality: 'good',
        };

        index++;
    }

    return samples;
}