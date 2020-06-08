import React, { FunctionComponent, useEffect, useState } from 'react';
import { Space } from 'antd';
import { Sample } from '../../../types';
import { SampleList } from '../../../common/sampleList';
import { Api } from '../api';
import { Constants } from '../../../default-data/constants';

type ListProps = {
    isRefreshNeeded: boolean;
    onRefreshDone: () => void;
    renderActions?: (sample: Sample) => JSX.Element;
};

export const List: FunctionComponent<ListProps> = ({ isRefreshNeeded, onRefreshDone, renderActions }) => {
    const [samples, setSamples] = useState<Sample[] | null>(null);

    async function fetchSamples() {
        setSamples(await Api.fetchSamples(Constants.projectId));
    }

    useEffect(() => {
        if (samples == null || isRefreshNeeded) {
            console.log('refresh was needed');

            fetchSamples();

            onRefreshDone();
        }
    });

    return <SampleList samples={samples} renderActions={renderActions} />;
};
