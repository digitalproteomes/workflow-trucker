import React, { FunctionComponent, useEffect, useState } from 'react';
import { Space, Tooltip, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { Sample } from '../../../types';
import { SampleList } from '../../../common/sampleList';
import { Api } from '../api';
import { Constants } from '../../../default-data/constants';

type Props = {
    isRefreshNeeded: boolean;
    onRefreshDone: () => void;
};

export const List: FunctionComponent<Props> = ({ isRefreshNeeded, onRefreshDone }) => {
    const [samples, setSamples] = useState<Sample[] | null>(null);

    async function fetchClinicalSamples() {
        setSamples(await Api.getClinicalSamples(Constants.projectId));
    }

    async function deleteSample(entry: Sample) {
        await Api.deleteSampleAsync(entry);
        setSamples(null);
    }

    useEffect(() => {
        if (samples == null || isRefreshNeeded) {
            console.log('refresh was needed');

            fetchClinicalSamples();

            onRefreshDone();
        }
    });

    return (
        <SampleList
            samples={samples}
            renderActions={(record: Sample) => {
                return (
                    <Space size="middle">
                        <span>Fractionate</span>
                        <span>Single Prep</span>
                        <Tooltip title="Delete sample">
                            <Button
                                type="primary"
                                icon={<DeleteOutlined />}
                                onClick={() => {
                                    deleteSample(record);
                                }}
                            />
                        </Tooltip>
                    </Space>
                );
            }}
        />
    );
};
