import React, { FunctionComponent } from 'react';
import { Button, Table } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { MSRunCompact } from '../../../types';
import { getColumn } from '../../../common/columnHelpers';

type Props = {
    name: string;
    msruns: MSRunCompact[];
};

export const ListCompactMsRuns: FunctionComponent<Props> = ({ name, msruns }) => {
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
};
