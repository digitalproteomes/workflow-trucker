import React, { FunctionComponent } from 'react';
import { ClinicalSampleCompact } from '../../../../types';
import { getColumn } from '../../../../common/columnHelpers';
import { Button, Table } from 'antd';
import { EyeOutlined } from '@ant-design/icons';

type Props = {
    name: string;
    samples: ClinicalSampleCompact[];
};

export const ListCompactClinicalSamples: FunctionComponent<Props> = ({ name, samples }) => {
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
};
