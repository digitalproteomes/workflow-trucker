import React, { FunctionComponent } from 'react';
import { Button } from 'antd';

type AddToPoolingProps = {
    onAddToPooling: () => void;
    style?: React.CSSProperties | undefined;
};

export const ButtonAddToPooling: FunctionComponent<AddToPoolingProps> = ({ onAddToPooling, style }) => {
    return (
        <Button type="default" onClick={onAddToPooling} style={style}>
            Pooling preparation
        </Button>
    );
};
