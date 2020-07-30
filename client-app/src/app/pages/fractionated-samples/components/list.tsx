import React, { FunctionComponent } from 'react';
import { Space } from 'antd';
import { Sample } from '../../../types';
import { SampleList } from '../../../common/sampleList';
import { ColumnsType } from 'antd/lib/table';

type Props = {
    samples: Sample[];
};

export const List: FunctionComponent<Props> = ({ samples }) => {
    return <SampleList samples={samples} columns={defaultColumns} renderActions={renderActions} />;
};

const renderActions = () => (
    <Space size="middle">
        <span>Delete</span>
    </Space>
);

const defaultColumns: ColumnsType<Sample> = [
    // todo - avoid importing the ColumnsType by having an intermediary interface between this component and the List common component
    // {
    //     title: 'Name',
    //     dataIndex: Sample.nameof('name'),
    //     ...getAllFilterProps<Sample>('name'),
    // },
    // {
    //     title: 'Id',
    //     dataIndex: Sample.nameof('id'),
    //     ...getAllFilterProps<Sample>('id'),
    // },
    // {
    //     title: 'Source Id',
    //     dataIndex: Sample.nameof('sourceSampleId'),
    // },
    // {
    //     title: 'Updated on',
    //     dataIndex: Sample.nameof('updatedDate'),
    // },
];
