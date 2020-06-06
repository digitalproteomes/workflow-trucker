import React, { useEffect, useState, FunctionComponent } from 'react';
import { Button, Divider } from 'antd';
import { Sample } from '../../types';
import { Api } from './api';
import { Constants } from '../../default-data/constants';
import { ClinicalSampleInputForm } from './components/createNew';
import { ClinicalSampleList } from './components/list';

export const ClinicalSamples: FunctionComponent = () => {
    const [samples, setSamples] = useState<Sample[]>([]);

    const [isRefreshNeeded, setRefreshNeededFlag] = useState<boolean>(true);

    const [isActiveInputForm, setActiveInputFormFlag] = useState<boolean>(false);

    async function fetchClinicalSamples() {
        const projectId: number = 5;

        setSamples(await Api.getClinicalSamples(projectId));

        setRefreshNeededFlag(false);
    }

    useEffect(() => {
        if (isRefreshNeeded) {
            console.log('refresh was needed');

            fetchClinicalSamples();
        }
    }, [isRefreshNeeded]);

    const onCreate = (values: any) => {
        // todo - this any to something is scary
        console.log('Received values of form: ', values);
        setActiveInputFormFlag(false);
        async function saveClinicalSample() {
            await Api.postClinicalSampleAsync(values.name as string, Constants.projectId);
            // assume the above is success. Even if it would be fail, that's and edgecase
            setRefreshNeededFlag(true);
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
            <ClinicalSampleInputForm isActiveInputForm={isActiveInputForm} onCreate={onCreate} onCancel={onCancel} />
            <Divider></Divider>
            <ClinicalSampleList samples={samples} />
        </>
    );
};
