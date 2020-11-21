import React, { FunctionComponent, useState } from 'react';
import { ClinicalSample } from '../../../types';
import { Api } from '../api';
import { createFormInput } from '../../../common/inputModalHelpers';
import { InputModal_v2 } from '../../../common/inputModal';

type FormProps = {
    isActiveInputForm: boolean;
    onCreateSuccessful: (sample: ClinicalSample) => void;
    onCancel: () => void;
};

export const ClinicalInputForm: FunctionComponent<FormProps> = ({
    isActiveInputForm,
    onCreateSuccessful,
    onCancel,
}) => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const onCreate = (sample: ClinicalSample) => {
        async function saveSample() {
            try {
                const createdSample: ClinicalSample = await Api.postSampleAsync(sample);
                onCreateSuccessful(createdSample);
            } catch (error) {
                setErrorMessage(error.message);
            }
        }
        return saveSample();
    };

    const inputs: JSX.Element[] = [
        createFormInput('Name', ClinicalSample.nameof('name'), '', true),
        createFormInput('ProjectId', ClinicalSample.nameof('projectId'), '', true),
        createFormInput('Clinical sample code', ClinicalSample.nameof('clinicalSampleCode'), '', true),
    ];

    return (
        <InputModal_v2
            errorMessage={errorMessage}
            inputs={inputs}
            isVisible={isActiveInputForm}
            onCancel={onCancel}
            title={'New clinical sample'}
            onCreate={onCreate}
        />
    );
};
