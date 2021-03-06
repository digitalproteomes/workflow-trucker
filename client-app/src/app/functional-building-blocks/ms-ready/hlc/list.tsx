import React, { FunctionComponent } from 'react';
import { MSReadySample } from '../../../types';
import { getColumn } from '../../../common/columnHelpers';
import { Api } from '../api';
import { Constants } from '../../../default-data/constants';
import { ColumnsType } from 'antd/lib/table';
import { CommonList } from '../../../common/list';
import { formatDate } from '../../../common/utils';
import { getWorkflowTag } from '../../../common/tags';
import { Button, Row, Col, Divider } from 'antd';
import { ListCompactClinicalSamples } from '../../clinical-samples';

type ListProps = {
    isRefreshNeeded: boolean;
    onRefreshDone: () => void;
    renderActions?: (sample: MSReadySample) => JSX.Element;
};

export const List: FunctionComponent<ListProps> = ({ isRefreshNeeded, onRefreshDone, renderActions }) => {
    return (
        <CommonList<MSReadySample>
            isRefreshNeeded={isRefreshNeeded}
            onRefreshDone={onRefreshDone}
            renderActions={renderActions}
            fetchEntries={() => Api.fetchSamples(Constants.projectId)}
            rowKeySelector={(row: MSReadySample) => row.id}
            columns={defaultColumns}
            expandableConfig={{
                rowExpandable: (record: MSReadySample) => record.clinicalSamples && record.clinicalSamples.length > 0,
                expandedRowRender: (record: MSReadySample) => (
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col className="gutter-row" span={3}>
                            <h3>Notes</h3>
                            <span>{record.description}</span>
                            <Divider />
                            <h3>Processing person</h3>
                            <span>{record.processingPerson}</span>
                            <Divider />
                            <h3>Quality</h3>
                            <span>{record.quality}</span>
                            <Divider />
                            <h3>Peptide number</h3>
                            <span>{record.peptideNo}</span>
                            <Divider />
                            <h3>Workflow tag</h3>
                            {getWorkflowTag(record.workflowTag)}
                        </Col>

                        <Col className="gutter-row" span={8}>
                            <ListCompactClinicalSamples name={record.name} samples={record.clinicalSamples} />
                        </Col>
                    </Row>
                ),
            }}
        />
    );
};

const defaultColumns: ColumnsType<MSReadySample> = [
    getColumn('Name', MSReadySample.nameof('name')),
    getColumn('Id', MSReadySample.nameof('id')),
    getColumn('Intermediate sample', MSReadySample.nameof('intermediateSampleName'), (record: MSReadySample) => (
        <Button type="link">{record.intermediateSampleName}</Button>
    )),
    getColumn('Created on', MSReadySample.nameof('createdDate'), (record: MSReadySample) => (
        <span>{formatDate(record.createdDate)}</span>
    )),
    getColumn('Updated on', MSReadySample.nameof('updatedDate'), (record: MSReadySample) => (
        <span>{formatDate(record.updatedDate)}</span>
    )),
];
