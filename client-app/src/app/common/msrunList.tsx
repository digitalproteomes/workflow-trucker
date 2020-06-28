import React, { FunctionComponent } from 'react';
import { Table, Skeleton } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { Msrun } from '../types';

// todo - move this into a proper component

type Props = {
    msruns: Msrun[] | null;
    columns?: ColumnsType<Msrun>;
    renderActions?: (record: Msrun) => JSX.Element;
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

    let columnsType: ColumnsType<Msrun>;

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

const defaultColumns: ColumnsType<Msrun> = [
    {
        title: 'Name',
        dataIndex: Msrun.nameof('name'),
    },
    {
        title: 'Id',
        dataIndex: Msrun.nameof('id'),
    },
    {
        title: 'Sample Id',
        dataIndex: Msrun.nameof('sampleId'),
    },
    {
        title: 'Protocol Id',
        dataIndex: Msrun.nameof('protocolId'),
    },
    {
        title: 'Instrument Id',
        dataIndex: Msrun.nameof('instrumentId'),
    },
    {
        title: 'Updated on',
        dataIndex: Msrun.nameof('updatedDate'),
    },
];

function getRenderObject(renderActions: (record: Msrun) => JSX.Element) {
    return {
        title: 'Action',
        key: 'action',
        render: (value: any, record: Msrun, index: number) => {
            return renderActions(record);
        },
    };
}
