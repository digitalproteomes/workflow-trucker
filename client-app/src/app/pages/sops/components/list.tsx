import React, { FunctionComponent } from 'react';
import { SOP } from '../../../types';
import { CommonList } from '../../../common/list';
import { Api } from '../api';
import { Constants } from '../../../default-data/constants';
import { getColumn } from '../../../common/listBase';
import { ColumnsType } from 'antd/lib/table';
import { formatDate } from '../../../common/utils';
import { Row, Col, Divider } from 'antd';

type ListProps = {
    isRefreshNeeded: boolean;
    onRefreshDone: () => void;
    renderActions?: (sample: SOP) => JSX.Element;
    onRowSelectionChange?: (selectedSamples: SOP[]) => void;
};

export const List: FunctionComponent<ListProps> = ({
    isRefreshNeeded,
    onRefreshDone,
    renderActions,
    onRowSelectionChange,
}) => {
    return (
        <CommonList<SOP>
            isRefreshNeeded={isRefreshNeeded}
            onRefreshDone={onRefreshDone}
            renderActions={renderActions}
            onRowSelectionChange={onRowSelectionChange}
            fetchEntries={() => Api.getSOPsAsync(Constants.projectId)}
            rowKeySelector={(row: SOP) => row.id}
            columns={defaultColumns}
            expandableConfig={{
                expandedRowRender: (record: SOP) => {
                    return (
                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                            <Col className="gutter-row" span={3}>
                                <h3>Notes</h3>
                                <span>{record.description}</span>
                                <Divider />
                                <h3>Processing person</h3>
                                <span>{record.processingPerson}</span>
                                <Divider />
                            </Col>
                        </Row>
                    );
                },
            }}
        />
    );
};

const defaultColumns: ColumnsType<SOP> = [
    getColumn('Name', SOP.nameof('name')),
    getColumn('Id', SOP.nameof('id')),
    getColumn('Sop File Name', SOP.nameof('sopFileName')),
    getColumn('Created on', SOP.nameof('createdDate'), (record: SOP) => <span>{formatDate(record.createdDate)}</span>),
    getColumn('Updated on', SOP.nameof('updatedDate'), (record: SOP) => <span>{formatDate(record.updatedDate)}</span>),
];
