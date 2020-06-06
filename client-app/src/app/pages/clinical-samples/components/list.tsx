import React, { FunctionComponent } from 'react';
import { Space } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { Sample } from '../../../types';
import { SampleList } from '../../../common/sampleList';

type Props = {
    samples: Sample[];
};

export const ClinicalSampleList: FunctionComponent<Props> = ({ samples }) => {
    return <SampleList columns={columns} samples={samples} />;
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
