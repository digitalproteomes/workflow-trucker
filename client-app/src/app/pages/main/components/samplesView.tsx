import React from 'react';
import { Sample } from '../../../types';
import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';

type Props = {
    samples: Sample[];
};

export class SamplesView extends React.Component<Props, {}> {
    public render() {
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
                title: 'Protocol Id',
                dataIndex: 'protocolId',
                key: 'protocolId',
            },
            {
                title: 'Protocol Id',
                dataIndex: 'protocolName',
                key: 'protocolName',
            },
        ];

        return <Table dataSource={this.props.samples} rowKey={(row) => row.id} columns={columns} />;
    }
}
