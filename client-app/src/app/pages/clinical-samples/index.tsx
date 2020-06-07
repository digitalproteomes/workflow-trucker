import React, { useEffect, useState, FunctionComponent } from 'react';
import { Button, Divider } from 'antd';
import { Sample } from '../../types';
import { Api } from './api';
import { InputForm } from './components/createNew';
import { List } from './components/list';

export const ClinicalSamples: FunctionComponent = () => {
    const [samples, setSamples] = useState<Sample[] | null>(null);

    async function fetchClinicalSamples() {
        const projectId: number = 5;

        setSamples(await Api.getClinicalSamples(projectId));
    }

    useEffect(() => {
        if (samples == null) {
            console.log('refresh was needed');

            fetchClinicalSamples();
        }
    });

    const [isActiveInputForm, setActiveInputFormFlag] = useState<boolean>(false);

    const [createErrorMessage, setCreateErrorMessage] = useState<string | null>(null);

    const onCreate = (values: any) => {
        async function saveClinicalSample() {
            try {
                await Api.postClinicalSampleAsync({ ...values });

                fetchClinicalSamples();

                setActiveInputFormFlag(false);
            } catch (error) {
                // const err = error as FriendlyError;
                // setCreateErrorMessage(err.message);

                setCreateErrorMessage(error.message);
            }
        }
        saveClinicalSample();
    };

    const onCancel = () => {
        setActiveInputFormFlag(false);
        setCreateErrorMessage(null);
    };

    return (
        <>
            <Button
                type="primary"
                onClick={() => {
                    setActiveInputFormFlag(true);
                }}
                style={{ float: 'right', marginRight: 74 }}
            >
                Add new clinical sample
            </Button>
            <Button
                type="default"
                onClick={() => {
                    console.log('add to pooling');
                }}
                style={{ float: 'right', marginRight: 16 }}
            >
                Pooling preparation
            </Button>
            <InputForm
                isActiveInputForm={isActiveInputForm}
                onCreate={onCreate}
                onCancel={onCancel}
                errorMessage={createErrorMessage}
            />
            <Divider></Divider>
            <List samples={samples} />
        </>
    );
};
