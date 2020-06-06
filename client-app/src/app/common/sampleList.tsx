import React, { FunctionComponent } from 'react';
import { Table, Skeleton } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { Sample } from '../types';

type Props = {
    samples: Sample[];
    columns: ColumnsType<Sample>;
};

export const SampleList: FunctionComponent<Props> = ({ samples, columns }) => {
    const rowSelection = {
        selectedRowKeys: [2, 3, 4],
        // onChange: this.onSelectChange,
        hideDefaultSelections: true,
        selections: [Table.SELECTION_ALL],
    };

    if (samples == null) {
        return <Skeleton active />;
    }

    return <Table rowSelection={rowSelection} dataSource={samples} columns={columns} rowKey={(row) => row.id} />;
};
