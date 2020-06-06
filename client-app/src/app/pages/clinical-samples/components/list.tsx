import React, { FunctionComponent } from 'react';
import { Space } from 'antd';
import { Sample } from '../../../types';
import { SampleList } from '../../../common/sampleList';

type Props = {
    samples: Sample[];
};

export const ClinicalSampleList: FunctionComponent<Props> = ({ samples }) => {
    return <SampleList samples={samples} renderActions={renderActions} />;
};

const renderActions = () => (
    <Space size="middle">
        <span>Fractionate</span>
        <span>Single Prep</span>
        <span>Delete</span>
    </Space>
);
