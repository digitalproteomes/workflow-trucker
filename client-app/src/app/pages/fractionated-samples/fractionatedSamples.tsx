import React, { useEffect, useState, FunctionComponent } from 'react';
import { Divider } from 'antd';
import { Sample } from '../../types';
import { Api } from './api';
import { Constants } from '../../default-data/constants';
import { InputForm } from './components/createNew';
import { List } from './components/list';

export const FractionatedSamples: FunctionComponent = () => {
    const [samples, setSamples] = useState<Sample[]>([]);

    const [isRefreshNeeded, setRefreshNeededFlag] = useState<boolean>(true);

    const [isActiveInputForm, setActiveInputFormFlag] = useState<boolean>(false);

    async function fetchSamples() {
        setSamples(await Api.getSamplesAsync(Constants.projectId));

        setRefreshNeededFlag(false);
    }

    useEffect(() => {
        if (isRefreshNeeded) {
            fetchSamples();
        }
    }, [isRefreshNeeded]);

    const onCreate = (values: any) => {
        setActiveInputFormFlag(false);
        async function saveSample() {
            await Api.postSampleAsync(values.name as string, Constants.projectId);
            setRefreshNeededFlag(true);
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
