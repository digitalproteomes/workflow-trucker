import React, { FunctionComponent } from 'react';
import { Table, Skeleton } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { Sample } from '../types';

type Props = {
    samples: Sample[] | null;
    columns?: ColumnsType<Sample>;
    renderActions?: () => JSX.Element;
};

export const SampleList: FunctionComponent<Props> = ({ samples, columns, renderActions }) => {
    const rowSelection = {
        selectedRowKeys: [2, 3, 4],
        // onChange: this.onSelectChange,
        hideDefaultSelections: true,
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
        title: 'Id',
        dataIndex: Sample.nameof('id'),
    },
    {
        title: 'Name',
        dataIndex: Sample.nameof('name'),
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

function getRenderObject(renderActions: () => JSX.Element) {
    return {
        title: 'Action',
        key: 'action',
        render: renderActions,
    };
}
