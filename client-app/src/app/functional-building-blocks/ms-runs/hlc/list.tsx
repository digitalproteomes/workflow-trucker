import React, { FunctionComponent } from 'react';
import { MsRun } from '../../../types';
import { CommonList } from '../../../common/list';
import { Constants } from '../../../default-data/constants';
import { getColumn } from '../../../common/columnHelpers';
import { ColumnsType } from 'antd/lib/table';
import { formatDate } from '../../../common/utils';
import { getWorkflowTag } from '../../../common/tags';
import { Button, Row, Col, Divider } from 'antd';
import { ListCompactClinicalSamples } from '../../clinical-samples';
import { Api } from '../api';

type ListProps = {
    isRefreshNeeded: boolean;
    onRefreshDone: () => void;
    renderActions?: (sample: MsRun) => JSX.Element;
};

export const List: FunctionComponent<ListProps> = ({ isRefreshNeeded, onRefreshDone, renderActions }) => {
    return (
        <CommonList<MsRun>
            isRefreshNeeded={isRefreshNeeded}
            onRefreshDone={onRefreshDone}
            renderActions={renderActions}
            fetchEntries={() => Api.getMsRunsAsync(Constants.projectId)}
            rowKeySelector={(row: MsRun) => row.id}
            columns={defaultColumns}
            expandableConfig={{
                rowExpandable: (record: MsRun) => record.clinicalSamples && record.clinicalSamples.length > 0,
                expandedRowRender: (record: MsRun) => {
                    return (
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
                                <ListCompactClinicalSamples name={record.name} samples={record.clinicalSamples} />
                            </Col>
                        </Row>
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
    getColumn('Method', MsRun.nameof('instrumentMethod')),
    getColumn('SOP', MsRun.nameof('sopFileName')),
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
