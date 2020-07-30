import React, { FunctionComponent } from 'react';
import { IntermediateSample, ClinicalSampleCompact } from '../../../types';
import { getColumn, SampleListV2 } from '../../../common/sampleList';
import { Api } from '../api';
import { Constants } from '../../../default-data/constants';
import { ColumnsType } from 'antd/lib/table';
import { ComplexList } from '../../../common/complexList';
import moment from 'moment';

type ListProps = {
    isRefreshNeeded: boolean;
    onRefreshDone: () => void;
    renderActions?: (sample: IntermediateSample) => JSX.Element;
    onRowSelectionChange?: (selectedSamples: IntermediateSample[]) => void;
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
            rowKeySelector={(row: IntermediateSample) => row.id}
            columns={defaultColumns}
            expandableConfig={{
                rowExpandable: (record: IntermediateSample) =>
                    record.clinicalSamples && record.clinicalSamples.length > 0,
                expandedRowRender: (record: IntermediateSample) => (
                    <SampleListV2
                        columns={[
                            getColumn('Name', ClinicalSampleCompact.nameof('name')),
                            getColumn('Id', ClinicalSampleCompact.nameof('id')),
                        ]}
                        rowKeySelector={(row: ClinicalSampleCompact) => row.id}
                        samples={record.clinicalSamples}
                    />
                ),
            }}
        />
    );
};

// todo - extract this into a standalone file, and convert sampleList.tsx into baseList.tsx
const defaultColumns: ColumnsType<IntermediateSample> = [
    // todo - avoid importing the ColumnsType by having an intermediary interface between this component and the List common component
    getColumn('Name', IntermediateSample.nameof('name')),
    getColumn('Id', IntermediateSample.nameof('id')),
    getColumn('Protocol', IntermediateSample.nameof('protocolName')),
    getColumn('Created on', IntermediateSample.nameof('createdDate'), (record: IntermediateSample) => (
        <span>{moment(record.createdDate).format('DD/MM/YY')}</span>
    )),
    getColumn('Updated on', IntermediateSample.nameof('updatedDate'), (record: IntermediateSample) => (
        <span>{moment(record.updatedDate).format('DD/MM/YY')}</span>
    )),
];
