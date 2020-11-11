import React, { FunctionComponent } from 'react';
import { Tooltip, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { SOP } from '../../../types';
import { Api } from '../api';

type ButtonDeleteProps = {
    sop: SOP;
    onDeleteDone: () => void;
};

export const ButtonDeleteSOP: FunctionComponent<ButtonDeleteProps> = ({ sop, onDeleteDone }) => {
    async function onDelete() {
        await Api.deleteAsync(sop);
        onDeleteDone();
    }
    return (
        <Tooltip title="Delete SOP">
            <Button type="default" icon={<DeleteOutlined />} onClick={onDelete}>
                Delete
            </Button>
        </Tooltip>
    );
};
