import React, { FunctionComponent, useState } from 'react';
import { Api } from '../../api';
import { Store } from 'antd/lib/form/interface';
import { InputModal, InputHelper } from '../../../../common';
import { ClinicalSample } from '../../../../types';

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
        InputHelper.createFormInput('Name', ClinicalSample.nameof('name'), '', true),
        InputHelper.createFormInput('ProjectId', ClinicalSample.nameof('projectId'), '', true),
        InputHelper.createFormInput('Clinical sample code', ClinicalSample.nameof('clinicalSampleCode'), '', true),
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
