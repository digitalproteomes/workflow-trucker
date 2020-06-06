import React, { FunctionComponent } from 'react';
import { Table, Space } from 'antd';
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

    return (
        <Table
            rowSelection={rowSelection}
            dataSource={samples}
            columns={columns}
            rowKey={(row) => row.sampleId}
        />
    );
};

const columns: ColumnsType<Sample> = [
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Source Sample Id',
        dataIndex: 'sampleId',
        key: 'sampleId',
    },
    {
        title: 'Protocol Id',
        dataIndex: 'protocolId',
        key: 'protocolId',
    },
    {
        title: 'Protocol Name',
        dataIndex: 'protocolName',
        key: 'protocolName',
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
