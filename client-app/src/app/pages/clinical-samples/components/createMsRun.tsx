import React, { FunctionComponent } from 'react';
import { Button } from 'antd';
import { MergeCellsOutlined } from '@ant-design/icons';
import { Sample } from '../../../types';

type ButtonProps = {
    samples: Sample[];
    style?: React.CSSProperties | undefined;
};

export const ButtonCreateMsRun: FunctionComponent<ButtonProps> = ({ samples, style }) => {
    const onClick = () => {
        console.log(`selected samples are:`, samples);
    };

    return (
        <Button type="default" onClick={onClick} style={style} icon={<MergeCellsOutlined />}>
            Create Ms Run
        </Button>
    );
};
