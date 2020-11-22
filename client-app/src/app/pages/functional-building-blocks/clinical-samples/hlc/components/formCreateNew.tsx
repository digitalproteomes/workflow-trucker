import React, { FunctionComponent, useState } from 'react';
import { ClinicalSample } from '../../../../../types';
import { Api } from '../../api';
import { createFormInput } from '../../../../../common/inputModalHelpers';
import { InputModal } from '../../../../../common/inputModal';
import { Store } from 'antd/lib/form/interface';

type Props = {
    isActiveInputForm: boolean;
    onCreateSuccessful: (sample: ClinicalSample) => void;
    onCancel: () => void;
};

export const ClinicalInputForm: FunctionComponent<Props> = ({ isActiveInputForm, onCreateSuccessful, onCancel }) => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const onCreate = (data: Store) => {
        async function saveSample() {
            try {
                const sample: ClinicalSample = data as ClinicalSample;
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
        <InputModal
            errorMessage={errorMessage}
            inputs={inputs}
            isVisible={isActiveInputForm}
            onCancel={onCancel}
            title={'New clinical sample'}
            onCreate={onCreate}
        />
    );
};
