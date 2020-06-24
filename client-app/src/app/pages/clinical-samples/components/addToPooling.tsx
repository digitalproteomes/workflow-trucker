import React, { FunctionComponent } from 'react';
import { Button } from 'antd';
import { MergeCellsOutlined } from '@ant-design/icons';

type AddToPoolingProps = {
    onAddToPooling: () => void;
    style?: React.CSSProperties | undefined;
};

export const ButtonAddToPooling: FunctionComponent<AddToPoolingProps> = ({ onAddToPooling, style }) => {
    return (
        <Button type="default" onClick={onAddToPooling} style={style} icon={<MergeCellsOutlined />}>
            Add selected to Pooling preparation
        </Button>
    );
};
