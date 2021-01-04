import React, { FunctionComponent, useState } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ClinicalInputForm } from './components/formCreateNew';
import { SampleNotifications } from '../../../common/notifications';
import { ClinicalSample } from '../../../types';

type ButtonCreateNewProps = {
    setRefreshNeededFlag: React.Dispatch<React.SetStateAction<boolean>>;
    style?: React.CSSProperties;
};

export const ButtonCreateNew: FunctionComponent<ButtonCreateNewProps> = ({ setRefreshNeededFlag, style }) => {
    const [isActiveCreateNew, setActiveCreateNewFlag] = useState<boolean>(false);

    const { onCreateNew, onCreateNewSuccessful, onCreateNewCancel } = linkCreateNew(
        setRefreshNeededFlag,
        setActiveCreateNewFlag,
    );

    return (
        <>
            <Button type="default" icon={<PlusOutlined />} onClick={onCreateNew} style={style}>
                {' '}
                Create clinical sample
            </Button>

            <ClinicalInputForm
                isActiveInputForm={isActiveCreateNew}
                onCreateSuccessful={onCreateNewSuccessful}
                onCancel={onCreateNewCancel}
            />
        </>
    );

    function linkCreateNew(
        setRefreshNeededFlag: React.Dispatch<React.SetStateAction<boolean>>,
        setActiveCreateNewFlag: React.Dispatch<React.SetStateAction<boolean>>,
    ) {
        const onCreateNewSuccessful = (sample: ClinicalSample) => {
            SampleNotifications.queueCreateSuccess(sample.name);

            setRefreshNeededFlag(true);

            setActiveCreateNewFlag(false);
        };

        const onCreateNew = () => {
            setActiveCreateNewFlag(true);
        };

        const onCreateNewCancel = () => {
            setActiveCreateNewFlag(false);
        };
        return { onCreateNew, onCreateNewSuccessful, onCreateNewCancel };
    }
};
