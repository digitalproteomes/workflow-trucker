import React, { FunctionComponent } from 'react';
import { SwathAnalysis } from '../../../types';
import { CommonList } from '../../../common/list';
import { Api } from '../api';
import { Constants } from '../../../default-data/constants';
import { getColumn } from '../../../common/columnHelpers';
import { ColumnsType } from 'antd/lib/table';
import { formatDate } from '../../../common/utils';
import { getWorkflowTag } from '../../../common/tags';
import { Row, Col, Divider } from 'antd';
import { ListCompactClinicalSamples } from '../../../functional-building-blocks/clinical-samples';
import { ListCompactMsRuns } from '../../../functional-building-blocks/ms-runs';

type ListProps = {
    isRefreshNeeded: boolean;
    onRefreshDone: () => void;
    renderActions?: (sample: SwathAnalysis) => JSX.Element;
};

export const List: FunctionComponent<ListProps> = ({ isRefreshNeeded, onRefreshDone, renderActions }) => {
    return (
        <CommonList<SwathAnalysis>
            isRefreshNeeded={isRefreshNeeded}
            onRefreshDone={onRefreshDone}
            renderActions={renderActions}
            fetchEntries={() => Api.getSwathAnalysisAsync(Constants.projectId)}
            rowKeySelector={(row: SwathAnalysis) => row.id}
            columns={defaultColumns}
            expandableConfig={{
                rowExpandable: (record: SwathAnalysis) => record.clinicalSamples && record.clinicalSamples.length > 0,
                expandedRowRender: (record: SwathAnalysis) => {
                    return renderExpandedRow(record);
                },
            }}
        />
    );
};

const defaultColumns: ColumnsType<SwathAnalysis> = [
    getColumn('Name', SwathAnalysis.nameof('name')),
    getColumn('Id', SwathAnalysis.nameof('id')),
    getColumn('Protocol Name', SwathAnalysis.nameof('protocolName')),

    getColumn('Created on', SwathAnalysis.nameof('createdDate'), (record: SwathAnalysis) => (
        <span>{formatDate(record.createdDate)}</span>
    )),
    getColumn('Updated on', SwathAnalysis.nameof('updatedDate'), (record: SwathAnalysis) => (
        <span>{formatDate(record.updatedDate)}</span>
    )),
];

function renderExpandedRow(record: SwathAnalysis) {
    return (
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col className="gutter-row" span={3}>
                <h3>Notes</h3>
                <span>{record.description}</span>
                <Divider />
                <h3>Spectral Library Id</h3>
                <span>{record.spectralLibraryId}</span>
                <Divider />
                <h3>Workflow tag</h3>
                {getWorkflowTag(record.workflowTag)}
            </Col>

            <Col className="gutter-row" span={8}>
                <ListCompactClinicalSamples name={record.name} samples={record.clinicalSamples} />
            </Col>

            <Col className="gutter-row" span={8}>
                <ListCompactMsRuns name={record.name} msruns={record.msRunIds} />
            </Col>
        </Row>
    );
}
