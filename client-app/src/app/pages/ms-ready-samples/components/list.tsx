import React, { FunctionComponent } from 'react';
import { MSReadySample, ClinicalSampleCompact } from '../../../types';
import { getColumn, SampleListV2 } from '../../../common/sampleList';
import { Api } from '../api';
import { Constants } from '../../../default-data/constants';
import { ColumnsType } from 'antd/lib/table';
import { ComplexList } from '../../../common/complexList';
import { formatDate } from '../../../common/utils';
import { getWorkflowTag } from '../../../default-data/tags';

type ListProps = {
    isRefreshNeeded: boolean;
    onRefreshDone: () => void;
    renderActions?: (sample: MSReadySample) => JSX.Element;
    onRowSelectionChange?: (selectedSamples: MSReadySample[]) => void;
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
            rowKeySelector={(row: MSReadySample) => row.id}
            columns={defaultColumns}
            expandableConfig={{
                rowExpandable: (record: MSReadySample) => record.clinicalSamples && record.clinicalSamples.length > 0,
                expandedRowRender: (record: MSReadySample) => (
                    <>
                        <h3>Notes</h3>
                        <span>{record.description}</span>
                        <h3>Processing person</h3>
                        <span>{record.processingPerson}</span>
                        <h3>Workflow tag</h3>
                        {getWorkflowTag(record.workflowTag)}
                        <SampleListV2
                            style={{ width: 'fit-content' }}
                            columns={[
                                getColumn('Name', ClinicalSampleCompact.nameof('name')),
                                getColumn('Id', ClinicalSampleCompact.nameof('id')),
                            ]}
                            rowKeySelector={(row: ClinicalSampleCompact) => row.id}
                            samples={record.clinicalSamples}
                        />
                    </>
                ),
            }}
        />
    );
};

const defaultColumns: ColumnsType<MSReadySample> = [
    getColumn('Name', MSReadySample.nameof('name')),
    getColumn('Id', MSReadySample.nameof('id')),
    getColumn('Intermediate sample', MSReadySample.nameof('intermediateSampleName')),
    getColumn('Created on', MSReadySample.nameof('createdDate'), (record: MSReadySample) => (
        <span>{formatDate(record.createdDate)}</span>
    )),
    getColumn('Updated on', MSReadySample.nameof('updatedDate'), (record: MSReadySample) => (
        <span>{formatDate(record.updatedDate)}</span>
    )),
];
