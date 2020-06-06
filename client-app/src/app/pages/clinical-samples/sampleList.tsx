import React, { FunctionComponent } from 'react';
import { Table, Space, Skeleton } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { Sample } from '../../types';

type ColumnsProps = {
    samples: Sample[];
};

export const SampleList: FunctionComponent<ColumnsProps> = ({ samples }) => {
    const rowSelection = {
        selectedRowKeys: [2, 3, 4],
        // onChange: this.onSelectChange,
        hideDefaultSelections: true,
        selections: [Table.SELECTION_ALL],
    };

    if (samples == null) return <Skeleton active />;

    return <Table rowSelection={rowSelection} dataSource={samples} columns={columns} rowKey={(row) => row.id} />;
};

const columns: ColumnsType<Sample> = [
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
        title: 'Protocol Id',
        dataIndex: Sample.nameof('protocolId'),
    },
    {
        title: 'Protocol Name',
        dataIndex: Sample.nameof('protocolName'),
    },
    {
        title: 'Action',
        key: 'action',
        // todo - investigate what space is
        render: () => (
            <Space size="middle">
                <span>Fractionate</span>
                <span>Single Prep</span>
                <span>Delete</span>
            </Space>
        ),
    },
];
