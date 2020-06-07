import React, { FunctionComponent, useState } from 'react';
import { Button } from 'antd';

type ButtonFractionateProps = {
    onFractionateClick: () => void;
    style?: React.CSSProperties | undefined;
};

const ButtonFractionate: FunctionComponent<ButtonFractionateProps> = ({ onFractionateClick, style }) => {
    return (
        <Button type="default" onClick={onFractionateClick} style={style}>
            Fractionate
        </Button>
    );
};
