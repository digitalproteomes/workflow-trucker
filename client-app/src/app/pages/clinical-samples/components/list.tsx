import React, { FunctionComponent, useEffect, useState } from 'react';
import { Space } from 'antd';
import { Sample } from '../../../types';
import { SampleList } from '../../../common/sampleList';
import { Api } from '../api';
import { Constants } from '../../../default-data/constants';

type Props = {
    isRefreshNeeded: boolean;
    onRefreshDone: () => void;
};

export const List: FunctionComponent<Props> = ({ isRefreshNeeded, onRefreshDone }) => {
    const [samples, setSamples] = useState<Sample[] | null>(null);

    async function fetchClinicalSamples() {
        setSamples(await Api.getClinicalSamples(Constants.projectId));
    }

    useEffect(() => {
        if (samples == null || isRefreshNeeded) {
            console.log('refresh was needed');

            fetchClinicalSamples();

            onRefreshDone();
        }
    });

    return <SampleList samples={samples} renderActions={renderActions} />;
};

const renderActions = () => (
    <Space size="middle">
        <span>Fractionate</span>
        <span>Single Prep</span>
        <span>Delete</span>
    </Space>
);
