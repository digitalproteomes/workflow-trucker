import React, { FunctionComponent, useEffect, useState } from 'react';
import { Sample } from '../../../types';
import { SampleList_v2, getAllFilterProps } from '../../../common/sampleList';
import { Api } from '../api';
import { Constants } from '../../../default-data/constants';
import { ColumnsType } from 'antd/lib/table';

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

    return (
        <SampleList_v2
            samples={samples}
            columns={defaultColumns}
            renderActions={renderActions}
            onRowSelectionChange={onRowSelectionChange}
            rowKeySelector={(sample: Sample) => sample.id}
        />
    );
};

// todo - extract this into a standalone file, and convert sampleList.tsx into baseList.tsx
const defaultColumns: ColumnsType<Sample> = [
    // todo - avoid importing the ColumnsType by having an intermediary interface between this component and the List common component
    {
        title: 'Name',
        dataIndex: Sample.nameof('name'),

        ...getAllFilterProps<Sample>('name'),
    },
    {
        title: 'Id',
        dataIndex: Sample.nameof('id'),

        ...getAllFilterProps<Sample>('id'),
    },
    {
        title: 'Source Id',
        dataIndex: Sample.nameof('sourceSampleId'),
    },
    {
        title: 'Updated on',
        dataIndex: Sample.nameof('updatedDate'),
    },
];
