import React, { FunctionComponent } from 'react';
import { ClinicalSample } from '../../../types';
import { getColumn } from '../../../common/listBase';
import { Api } from '../api';
import { Constants } from '../../../default-data/constants';
import { ColumnsType } from 'antd/lib/table';
import { CommonList } from '../../../common/list';
import moment from 'moment';
import { Col, Row } from 'antd';

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
        <CommonList<ClinicalSample>
            isRefreshNeeded={isRefreshNeeded}
            onRefreshDone={onRefreshDone}
            renderActions={renderActions}
            onRowSelectionChange={onRowSelectionChange}
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
