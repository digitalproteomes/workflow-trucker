import React, { FunctionComponent, useState } from 'react';
import { Button, Tooltip } from 'antd';
import { IntermediateSample } from '../../../types';
import { SplitCellsOutlined } from '@ant-design/icons';
import { SampleNotifications } from '../../../common/notifications';
import { FormFractionate } from './components/formFractionate';

type Props = {
    sample: IntermediateSample;
    style?: React.CSSProperties;
};

export const ButtonFractionate: FunctionComponent<Props> = ({ sample, style }) => {
    const [fractionateSample, setFractionateSample] = useState<IntermediateSample | null>(null);

    const { onFractionateSuccessful, onFractionateCancel } = linkFractionate(setFractionateSample);

    return (
        <>
            <Tooltip title="Create fractionated samples">
                <Button
                    type="default"
                    onClick={() => setFractionateSample(sample)}
                    style={style}
                    icon={<SplitCellsOutlined />}
                >
                    Fractionate
                </Button>
            </Tooltip>
            <FormFractionate
                parentSample={fractionateSample}
                onCreateSuccessful={onFractionateSuccessful}
                onCancel={onFractionateCancel}
            />
        </>
    );
};
function linkFractionate(setFractionateSample: React.Dispatch<React.SetStateAction<IntermediateSample | null>>) {
    const onFractionateCancel = () => {
        setFractionateSample(null);
    };

    const onFractionateSuccessful = (samples: IntermediateSample[]) => {
        samples.forEach((sample, _index, _samples) => {
            SampleNotifications.queueCreateSuccess(sample.name);
        });

        setFractionateSample(null);
    };
    return { onFractionateSuccessful, onFractionateCancel };
}
