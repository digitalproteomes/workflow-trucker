import React, { FunctionComponent } from 'react';
import { Space } from 'antd';
import { Sample } from '../../../types';
import { SampleList } from '../../../common/sampleList';

type Props = {
    samples: Sample[];
};

export const List: FunctionComponent<Props> = ({ samples }) => {
    return <SampleList samples={samples} renderActions={renderActions} />;
};

const renderActions = () => (
    <Space size="middle">
        <span>Delete</span>
    </Space>
);
