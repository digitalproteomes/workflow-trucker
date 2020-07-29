import React, { FunctionComponent, useEffect, useState } from 'react';
import { Sample } from '../../../types';
import { getAllFilterProps } from '../../../common/sampleList';
import { Api } from '../api';
import { Constants } from '../../../default-data/constants';
import { ColumnsType } from 'antd/lib/table';
import { ComplexList } from '../../../common/complexList';

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
    return (
        <ComplexList
            isRefreshNeeded={isRefreshNeeded}
            onRefreshDone={onRefreshDone}
            renderActions={renderActions}
            onRowSelectionChange={onRowSelectionChange}
            fetchSamples={() => Api.fetchSamples(Constants.projectId)}
            rowKeySelector={(row: Sample) => row.id}
            columns={defaultColumns}
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
