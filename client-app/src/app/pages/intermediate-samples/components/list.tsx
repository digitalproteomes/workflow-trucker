import React, { FunctionComponent } from 'react';
import { IntermediateSample } from '../../../types';
import { getColumn } from '../../../common/sampleList';
import { Api } from '../api';
import { Constants } from '../../../default-data/constants';
import { ColumnsType } from 'antd/lib/table';
import { ComplexList } from '../../../common/complexList';
import { formatDate } from '../../../common/utils';
import { getWorkflowTag, getProtocolTag } from '../../../common/tags';
import { getCompactClinicalSampleList } from '../../../common/getCompactClinicalSampleList';
import { Row, Col, Divider } from 'antd';

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
                expandedRowRender: renderExpandedRow(),
            }}
        />
    );
};

const defaultColumns: ColumnsType<IntermediateSample> = [
    getColumn('Name', IntermediateSample.nameof('name')),
    getColumn('Id', IntermediateSample.nameof('id')),
    getColumn('Protocol', IntermediateSample.nameof('protocolName'), (record: IntermediateSample) =>
        getProtocolTag(record.protocolName),
    ),
    getColumn('Created on', IntermediateSample.nameof('createdDate'), (record: IntermediateSample) => (
        <span>{formatDate(record.createdDate)}</span>
    )),
    getColumn('Updated on', IntermediateSample.nameof('updatedDate'), (record: IntermediateSample) => (
        <span>{formatDate(record.updatedDate)}</span>
    )),
];

function renderExpandedRow() {
    return (record: IntermediateSample) => (
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col className="gutter-row" span={3}>
                <h3>Notes</h3>
                <span>{record.description}</span>
                <Divider />
                <h3>Processing person</h3>
                <span>{record.processingPerson}</span>
                <Divider />
                <h3>Workflow tag</h3>
                {getWorkflowTag(record.workflowTag)}
            </Col>

            <Col className="gutter-row" span={8}>
                {getCompactClinicalSampleList(record.name, record.clinicalSamples)}
            </Col>
        </Row>
    );
}
