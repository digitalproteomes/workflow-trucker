import React, { FunctionComponent } from 'react';
import { SpectralLibrary } from '../../../types';
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
    renderActions?: (sample: SpectralLibrary) => JSX.Element;
};

export const List: FunctionComponent<ListProps> = ({ isRefreshNeeded, onRefreshDone, renderActions }) => {
    return (
        <CommonList<SpectralLibrary>
            isRefreshNeeded={isRefreshNeeded}
            onRefreshDone={onRefreshDone}
            renderActions={renderActions}
            fetchEntries={() => Api.getSpectralLibraryAsync(Constants.projectId)}
            rowKeySelector={(row: SpectralLibrary) => row.id}
            columns={defaultColumns}
            expandableConfig={{
                rowExpandable: (record: SpectralLibrary) => record.clinicalSamples && record.clinicalSamples.length > 0,
                expandedRowRender: (record: SpectralLibrary) => {
                    return renderExpandedRow(record);
                },
            }}
        />
    );
};

const defaultColumns: ColumnsType<SpectralLibrary> = [
    getColumn('Name', SpectralLibrary.nameof('name')),
    getColumn('Id', SpectralLibrary.nameof('id')),
    getColumn('Protocol Name', SpectralLibrary.nameof('protocolName')),

    getColumn('Created on', SpectralLibrary.nameof('createdDate'), (record: SpectralLibrary) => (
        <span>{formatDate(record.createdDate)}</span>
    )),
    getColumn('Updated on', SpectralLibrary.nameof('updatedDate'), (record: SpectralLibrary) => (
        <span>{formatDate(record.updatedDate)}</span>
    )),
];

function renderExpandedRow(record: SpectralLibrary) {
    return (
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col className="gutter-row" span={3}>
                <h3>Notes</h3>
                <span>{record.description}</span>
                <Divider />
                <h3>Protein Database Organism</h3>
                <span>{record.proteinDatabaseOrganism}</span>
                <Divider />
                <h3>Protein Database Version</h3>
                <span>{record.proteinDatabaseVersion}</span>
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
