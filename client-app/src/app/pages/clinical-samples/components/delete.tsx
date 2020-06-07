import React, { FunctionComponent } from 'react';
import { Tooltip, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { Sample } from '../../../types';
import { Api } from '../api';
type ButtonDeleteProps = {
    sample: Sample;
    onDeleteDone: () => void;
};
export const ButtonDelete: FunctionComponent<ButtonDeleteProps> = ({ sample, onDeleteDone }) => {
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
