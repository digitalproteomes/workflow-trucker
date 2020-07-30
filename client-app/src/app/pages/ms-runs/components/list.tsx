import React, { FunctionComponent } from 'react';
import { MsRun, ClinicalSampleCompact } from '../../../types';
import { ComplexList } from '../../../common/complexList';
import { Api } from '../api';
import { Constants } from '../../../default-data/constants';
import { SampleListV2, getColumn } from '../../../common/sampleList';
import { ColumnsType } from 'antd/lib/table';
import { formatDate } from '../../../common/utils';
import { getWorkflowTag } from '../../../default-data/tags';
import { Button } from 'antd';

type ListProps = {
    isRefreshNeeded: boolean;
    onRefreshDone: () => void;
    renderActions?: (sample: MsRun) => JSX.Element;
    onRowSelectionChange?: (selectedSamples: MsRun[]) => void;
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
            fetchSamples={() => Api.getMsRunsAsync(Constants.projectId)}
            rowKeySelector={(row: MsRun) => row.id}
            columns={defaultColumns}
            expandableConfig={{
                rowExpandable: (record: MsRun) => record.clinicalSamples && record.clinicalSamples.length > 0,
                expandedRowRender: (record: MsRun) => {
                    return (
                        <>
                            <h3>Notes</h3>
                            <span>{record.description}</span>
                            <h3>Processing person</h3>
                            <span>{record.processingPerson}</span>
                            <h3>Workflow tag</h3>
                            {getWorkflowTag(record.workflowTag)}
                            <SampleListV2
                                style={{ width: 'fit-content' }}
                                title={'Clinical samples'}
                                columns={[
                                    getColumn('Name', ClinicalSampleCompact.nameof('name')),
                                    getColumn('Id', ClinicalSampleCompact.nameof('id')),
                                ]}
                                rowKeySelector={(row: ClinicalSampleCompact) => row.id}
                                samples={record.clinicalSamples}
                            />
                        </>
                    );
                },
            }}
        />
    );
};

const defaultColumns: ColumnsType<MsRun> = [
    getColumn('Name', MsRun.nameof('name')),
    getColumn('Id', MsRun.nameof('id')),
    getColumn('Instrument', MsRun.nameof('instrumentId')),
    getColumn('MS Ready sample', MsRun.nameof('msReadySampleName'), (record: MsRun) => (
        <Button type="link">{record.msReadySampleName}</Button>
    )),
    getColumn('Created on', MsRun.nameof('createdDate'), (record: MsRun) => (
        <span>{formatDate(record.createdDate)}</span>
    )),
    getColumn('Updated on', MsRun.nameof('updatedDate'), (record: MsRun) => (
        <span>{formatDate(record.updatedDate)}</span>
    )),
];
