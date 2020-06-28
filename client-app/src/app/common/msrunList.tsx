import React, { FunctionComponent } from 'react';
import { Table, Skeleton } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { MsRun, Sample } from '../types';

type Props = {
    msruns: MsRun[] | null;
    columns?: ColumnsType<MsRun>;
    renderActions?: (record: MsRun) => JSX.Element;
};

export const MsrunList: FunctionComponent<Props> = ({ msruns, columns, renderActions }) => {
    const rowSelection = {
        selectedRowKeys: [2, 3, 4],
        hideDefaultSelections: true,
        selections: [Table.SELECTION_ALL],
    };

    if (msruns == null) {
        return <Skeleton active />;
    }

    let columnsType: ColumnsType<MsRun>;

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

    return <Table rowSelection={rowSelection} dataSource={msruns} columns={columnsType} rowKey={(row) => row.id} />;
};

const defaultColumns: ColumnsType<MsRun> = [
    {
        title: 'Name',
        dataIndex: MsRun.nameof('name'),
    },
    {
        title: 'Id',
        dataIndex: MsRun.nameof('id'),
    },
    {
        title: 'Sample Ids',
        dataIndex: MsRun.nameof('samples'),
        render: (_value: any, record: MsRun) => {
            return record.samples.join(', ');
        },
    },
    {
        title: 'Protocol Id',
        dataIndex: MsRun.nameof('protocolId'),
    },
    {
        title: 'Instrument Id',
        dataIndex: MsRun.nameof('instrumentId'),
    },
    {
        title: 'Updated on',
        dataIndex: MsRun.nameof('updatedDate'),
    },
];

function getRenderObject(renderActions: (record: MsRun) => JSX.Element) {
    return {
        title: 'Action',
        key: 'action',
        render: (value: any, record: MsRun, index: number) => {
            return renderActions(record);
        },
    };
}
