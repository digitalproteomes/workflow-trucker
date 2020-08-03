import React from 'react';
import { ClinicalSampleCompact } from '../types';
import { getColumn } from './sampleList';
import { Button, Table } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
export function getCompactClinicalSampleList(name: string, samples: ClinicalSampleCompact[]) {
    return (
        <Table
            title={() => <h3>{`Clinical samples of ${name}`}</h3>}
            scroll={{ y: 260 }}
            columns={[
                getColumn('Name', ClinicalSampleCompact.nameof('id'), (record: ClinicalSampleCompact) => (
                    <Button type="link">{record.name}</Button>
                )),
                getColumn(
                    '',
                    ClinicalSampleCompact.nameof('id'),
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
            rowKey={(row: ClinicalSampleCompact) => row.id}
            dataSource={samples}
        />
    );
}
