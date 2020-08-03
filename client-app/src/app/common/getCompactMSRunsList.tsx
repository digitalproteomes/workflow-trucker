import React from 'react';
import { MSRunCompact } from '../types';
import { getColumn } from './sampleList';
import { Button, Table } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
export function getCompactMSRunsList(name: string, msruns: MSRunCompact[]) {
    return (
        <Table
            title={() => <h3>{`MS Runs of ${name}`}</h3>}
            scroll={{ y: 260 }}
            columns={[
                getColumn('Name', MSRunCompact.nameof('id'), (record: MSRunCompact) => (
                    <Button type="link">{record.name}</Button>
                )),
                getColumn(
                    '',
                    MSRunCompact.nameof('id'),
                    () => {
                        return (
                            <Button type="default" icon={<EyeOutlined />}>
                                Details
                            </Button>
                        );
                    },
                    false,
                ),
            ]}
            rowKey={(row: MSRunCompact) => row.id}
            dataSource={msruns}
        />
    );
}
