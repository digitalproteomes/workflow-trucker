import React, { FunctionComponent } from 'react';
import { Button } from 'antd';

type CreateNewProps = {
    onAddNewClick: () => void;
};

export const ButtonCreateNew: FunctionComponent<CreateNewProps> = ({ onAddNewClick }) => {
    return (
        <Button type="primary" onClick={onAddNewClick} style={{ float: 'right', marginRight: 74 }}>
            Add new clinical sample
        </Button>
    );
};

type AddToPoolingProps = {
    onAddToPooling: () => void;
};

export const ButtonAddToPooling: FunctionComponent<AddToPoolingProps> = ({ onAddToPooling }) => {
    return (
        <Button type="default" onClick={onAddToPooling} style={{ float: 'right', marginRight: 16 }}>
            Pooling preparation
        </Button>
    );
};
