import React, { FunctionComponent } from 'react';
import { SwathAnalysis } from '../../../types';
import { ComplexList } from '../../../common/complexList';
import { Api } from '../api';
import { Constants } from '../../../default-data/constants';
import { getColumn } from '../../../common/sampleList';
import { ColumnsType } from 'antd/lib/table';
import { formatDate } from '../../../common/utils';
import { getWorkflowTag } from '../../../common/tags';
import { Row, Col, Divider } from 'antd';
import { getCompactClinicalSampleList } from '../../../common/getCompactClinicalSampleList';
import { getCompactMSRunsList } from '../../../common/getCompactMSRunsList';

type ListProps = {
    isRefreshNeeded: boolean;
    onRefreshDone: () => void;
    renderActions?: (sample: SwathAnalysis) => JSX.Element;
    onRowSelectionChange?: (selectedSamples: SwathAnalysis[]) => void;
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
            fetchSamples={() => Api.getSwathAnalysisAsync(Constants.projectId)}
            rowKeySelector={(row: SwathAnalysis) => row.id}
            columns={defaultColumns}
            expandableConfig={{
                rowExpandable: (record: SwathAnalysis) => record.clinicalSamples && record.clinicalSamples.length > 0,
                expandedRowRender: (record: SwathAnalysis) => {
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
                                {getCompactClinicalSampleList(record.name, record.clinicalSamples)}
                            </Col>

                            <Col className="gutter-row" span={8}>
                                {getCompactMSRunsList(record.name, record.msRunIds)}
                            </Col>
                        </Row>
                    );
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
