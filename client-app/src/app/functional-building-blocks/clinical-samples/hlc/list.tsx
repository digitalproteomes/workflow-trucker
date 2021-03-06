import React, { FunctionComponent } from 'react';
import { Api } from '../api';
import { ColumnsType } from 'antd/lib/table';
import { Col, Row } from 'antd';
import moment from 'moment';
import { getColumn } from '../../../common/columnHelpers';
import { CommonList } from '../../../common/list';
import { Constants } from '../../../default-data/constants';
import { ClinicalSample } from '../../../types';

type ListProps = {
    isRefreshNeeded: boolean;
    onRefreshDone: () => void;
    renderActions?: (sample: ClinicalSample) => JSX.Element;
};

export const List: FunctionComponent<ListProps> = ({ isRefreshNeeded, onRefreshDone, renderActions }) => {
    return (
        <CommonList<ClinicalSample>
            isRefreshNeeded={isRefreshNeeded}
            onRefreshDone={onRefreshDone}
            renderActions={renderActions}
            fetchEntries={() => Api.fetchSamples(Constants.projectId)}
            rowKeySelector={(row: ClinicalSample) => row.id}
            columns={defaultColumns}
            expandableConfig={{
                rowExpandable: (record: ClinicalSample) => record.description != null,
                expandedRowRender: (record: ClinicalSample) => {
                    return (
                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                            <Col className="gutter-row" span={4}>
                                <h3>Notes</h3>
                                <span>{record.description}</span>
                            </Col>
                            <Col className="gutter-row" span={2}>
                                <h3>Processing person</h3>
                                <span>{record.processingPerson}</span>
                            </Col>
                        </Row>
                    );
                },
            }}
        />
    );
};

const defaultColumns: ColumnsType<ClinicalSample> = [
    getColumn('Name', ClinicalSample.nameof('name')),
    getColumn('Id', ClinicalSample.nameof('id')),
    getColumn('Clinical id', ClinicalSample.nameof('clinicalSampleCode')),
    getColumn('Created on', ClinicalSample.nameof('createdDate'), (record: ClinicalSample) => (
        <span>{moment(record.createdDate).format('DD/MM/YY')}</span>
    )),
    getColumn('Updated on', ClinicalSample.nameof('updatedDate'), (record: ClinicalSample) => (
        <span>{moment(record.updatedDate).format('DD/MM/YY')}</span>
    )),
];
