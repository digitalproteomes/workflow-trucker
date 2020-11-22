import React, { FunctionComponent } from 'react';
import { Button, Tooltip } from 'antd';
import { IntermediateSample } from '../../../types';
import { EyeOutlined } from '@ant-design/icons';

type Props = {
    sample: IntermediateSample;
    style?: React.CSSProperties | undefined;
};

// wait - do we need a button to view the fractionation details? (because at the moment this is not used)
export const ButtonFractionDetails: FunctionComponent<Props> = ({ sample, style }) => {
    return (
        <Tooltip title="View fractionated samples">
            <Button
                type="default"
                style={style}
                icon={<EyeOutlined />}
                href={`/samples/fractionated/details?project=${sample.projectId}&parent=${sample.id}`}
            >
                Fractions
            </Button>
        </Tooltip>
    );
};
