import React, { FunctionComponent, useEffect, useState } from 'react';
import { Space, Tooltip, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { Sample } from '../../../types';
import { SampleList } from '../../../common/sampleList';
import { Api } from '../api';
import { Constants } from '../../../default-data/constants';

type ButtonDeleteProps = {
    sample: Sample;

    onDeleteDone: () => void;
};

const ButtonDelete: FunctionComponent<ButtonDeleteProps> = ({ sample, onDeleteDone }) => {
    async function onDelete() {
        await Api.deleteSampleAsync(sample);

        onDeleteDone();
    }

    return (
        <Tooltip title="Delete sample">
            <Button type="default" icon={<DeleteOutlined />} onClick={onDelete} />
        </Tooltip>
    );
};

///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////

type ListProps = {
    isRefreshNeeded: boolean;
    onRefreshDone: () => void;
};

export const List: FunctionComponent<ListProps> = ({ isRefreshNeeded, onRefreshDone }) => {
    const [samples, setSamples] = useState<Sample[] | null>(null);

    async function fetchSamples() {
        setSamples(await Api.fetchSamples(Constants.projectId));
    }

    function onDeleteDone() {
        setSamples(null);
    }

    useEffect(() => {
        if (samples == null || isRefreshNeeded) {
            console.log('refresh was needed');

            fetchSamples();

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
                        <ButtonDelete sample={record} onDeleteDone={onDeleteDone} />
                    </Space>
                );
            }}
        />
    );
};
