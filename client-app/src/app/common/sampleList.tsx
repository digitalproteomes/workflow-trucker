import React, { FunctionComponent } from 'react';
import { Table, Skeleton } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { Sample } from '../types';
import { TableRowSelection } from 'antd/lib/table/interface';

type Props = {
    samples: Sample[] | null;
    columns?: ColumnsType<Sample>;
    renderActions?: (record: Sample) => JSX.Element;
    onRowSelectionChange?: (selectedRows: Sample[]) => void;
};

export const SampleList: FunctionComponent<Props> = ({ samples, columns, renderActions, onRowSelectionChange }) => {
    const onRowSelectionChangeHandler = (_selectedRowKeys: any, selectedRows: Sample[]) => {
        // at the moment (antd 4.3.5) the selectedRowKeys are coming in as ReactText[]
        if (onRowSelectionChange) onRowSelectionChange(selectedRows);
    };

    const rowSelection: TableRowSelection<Sample> = {
        onChange: onRowSelectionChangeHandler,
        selections: [Table.SELECTION_ALL],
    };

    if (samples == null) {
        return <Skeleton active />;
    }

    let columnsType: ColumnsType<Sample>;

    if (columns) {
        if (renderActions) {
            columnsType = [...columns, getRenderObject(renderActions)];
        } else {
            columnsType = columns;
        }
    } else {
        if (renderActions) {
            columnsType = [...defaultColumns, getRenderObject(renderActions)];
        } else {
            columnsType = defaultColumns;
        }
    }

    return <Table rowSelection={rowSelection} dataSource={samples} columns={columnsType} rowKey={(row) => row.id} />;
};

const defaultColumns: ColumnsType<Sample> = [
    {
        title: 'Name',
        dataIndex: Sample.nameof('name'),
    },
    {
        title: 'Id',
        dataIndex: Sample.nameof('id'),
    },
    {
        title: 'Source Sample Id',
        dataIndex: Sample.nameof('sourceSampleId'),
    },
    {
        title: 'Parent Sample Id',
        dataIndex: Sample.nameof('parentSampleId'),
    },
    {
        title: 'Protocol Name',
        dataIndex: Sample.nameof('protocolName'),
    },
    {
        title: 'Updated on',
        dataIndex: Sample.nameof('updatedDate'),
    },
];

function getRenderObject(renderActions: (record: Sample) => JSX.Element) {
    return {
        title: 'Action',
        key: 'action',
        render: (value: any, record: Sample, index: number) => {
            return renderActions(record);
        },
    };
}
