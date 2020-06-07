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

    const onCreate = (values: any) => {
        setActiveInputFormFlag(false);
        async function saveClinicalSample() {
            await Api.postClinicalSampleAsync({ ...values });
            // assume the above is success. Even if it would be fail, that's and edgecase
            fetchClinicalSamples();
        }
        saveClinicalSample();
    };

    const onCancel = () => {
        setActiveInputFormFlag(false);
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
            <InputForm isActiveInputForm={isActiveInputForm} onCreate={onCreate} onCancel={onCancel} />
            <Divider></Divider>
            <List samples={samples} />
        </>
    );
};
