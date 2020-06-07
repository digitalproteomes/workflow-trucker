import React, { FunctionComponent, useState } from 'react';
import { Button } from 'antd';

type ButtonFractionateProps = {
    onFractionate: () => void;
    style?: React.CSSProperties | undefined;
};

export const ButtonFractionate: FunctionComponent<ButtonFractionateProps> = ({ onFractionate, style }) => {
    return (
        <Button type="default" onClick={onFractionate} style={style}>
            Fractionate
        </Button>
    );
};
