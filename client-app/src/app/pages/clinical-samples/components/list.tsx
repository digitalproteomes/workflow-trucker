import React, { FunctionComponent } from 'react';
import { ClinicalSample } from '../../../types';
import { getColumn } from '../../../common/sampleList';
import { Api } from '../api';
import { Constants } from '../../../default-data/constants';
import { ColumnsType } from 'antd/lib/table';
import { ComplexList } from '../../../common/complexList';
import moment from 'moment';
import { Dictionary } from '../../../common/utils';
import { PresetColorType } from 'antd/lib/_util/colors';
import { Tag } from 'antd';
import { CheckCircleOutlined, SyncOutlined, ClockCircleOutlined } from '@ant-design/icons';

type ListProps = {
    isRefreshNeeded: boolean;
    onRefreshDone: () => void;
    renderActions?: (sample: ClinicalSample) => JSX.Element;
    onRowSelectionChange?: (selectedSamples: ClinicalSample[]) => void;
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
            rowKeySelector={(row: ClinicalSample) => row.id}
            columns={defaultColumns}
            expandableConfig={{
                rowExpandable: (record: ClinicalSample) => record.description != null,
                expandedRowRender: (record: ClinicalSample) => {
                    const tagProps: TagProps = WorkflowTagDictionary[record.workflowTag];

                    return (
                        <>
                            <h3>Notes</h3>
                            <span>{record.description}</span>
                            <h3>Processing person</h3>
                            <span>{record.processingPerson}</span>
                            <h3>Workflow tag</h3>
                            <Tag icon={tagProps.icon} color={tagProps.color}>
                                {record.workflowTag}
                            </Tag>
                        </>
                    );
                },
            }}
        />
    );
};

// todo - extract this into a standalone file, and convert sampleList.tsx into baseList.tsx
const defaultColumns: ColumnsType<ClinicalSample> = [
    // todo - avoid importing the ColumnsType by having an intermediary interface between this component and the List common component
    getColumn('Name', ClinicalSample.nameof('name')),
    getColumn('Id', ClinicalSample.nameof('id')),
    getColumn('Source id', ClinicalSample.nameof('sourceSampleId')),
    getColumn('Created on', ClinicalSample.nameof('createdDate'), (record: ClinicalSample) => (
        <span>{moment(record.createdDate).format('DD/MM/YY')}</span>
    )),
    getColumn('Updated on', ClinicalSample.nameof('updatedDate'), (record: ClinicalSample) => (
        <span>{moment(record.updatedDate).format('DD/MM/YY')}</span>
    )),
];

type TagProps = {
    color: PresetColorType;
    icon: React.ReactNode;
};

const WorkflowTagDictionary: Dictionary<TagProps> = {};
WorkflowTagDictionary['Sample Preparation'] = { color: 'orange', icon: <SyncOutlined /> };
WorkflowTagDictionary['SWATHAnalysis'] = { color: 'yellow', icon: <CheckCircleOutlined spin /> };
WorkflowTagDictionary['Library Generation'] = { color: 'gold', icon: <ClockCircleOutlined spin /> };
