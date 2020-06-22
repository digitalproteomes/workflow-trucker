import React, { useEffect, useState, FunctionComponent } from 'react';
import { Divider } from 'antd';
import { Sample } from '../../types';
import { Api } from './api';
import { Constants } from '../../default-data/constants';
import { InputForm } from './components/createNew';
import { List } from './components/list';

export const PooledSamples: FunctionComponent = () => {
    const [samples, setSamples] = useState<Sample[] | null>(null);

    const [isActiveInputForm, setActiveInputFormFlag] = useState<boolean>(false);

    async function fetchSamples() {
        if (samples == null) {
            const projectId: number = 5;

            setSamples(await Api.getSamplesAsync(projectId));
        }
    }

    useEffect(() => {
        fetchSamples();
    });

    const onCreate = (values: any) => {
        setActiveInputFormFlag(false);
        async function saveSample() {
            await Api.postSampleAsync(values.name as string, Constants.projectId);
            fetchSamples();
        }
        saveSample();
    };

    const onCancel = () => {
        setActiveInputFormFlag(false);
    };

    return (
        <>
            <InputForm isActiveInputForm={isActiveInputForm} onCreate={onCreate} onCancel={onCancel} />
            <Divider></Divider>
            <List samples={samples} />
        </>
    );
};
