import React, { FunctionComponent, useEffect, useState } from 'react';
import { Sample } from '../../../types';
import { SampleList } from '../../../common/sampleList';
import { Api } from '../api';
import { Constants } from '../../../default-data/constants';

type ListProps = {
    isRefreshNeeded: boolean;
    onRefreshDone: () => void;
    renderActions?: (sample: Sample) => JSX.Element;
    onRowSelectionChange?: (selectedSamples: Sample[]) => void;
};

export const List: FunctionComponent<ListProps> = ({
    isRefreshNeeded,
    onRefreshDone,
    renderActions,
    onRowSelectionChange,
}) => {
    const [samples, setSamples] = useState<Sample[] | null>(null);

    async function fetchSamples() {
        setSamples(await Api.fetchSamples(Constants.projectId));
    }

    useEffect(() => {
        if (samples == null || isRefreshNeeded) {
            console.log('refresh was needed');

            fetchSamples(); // todo - is this call getting executed in an async or sync manner?

            onRefreshDone();
        }
    });

    return <SampleList samples={samples} renderActions={renderActions} onRowSelectionChange={onRowSelectionChange} />;
};
