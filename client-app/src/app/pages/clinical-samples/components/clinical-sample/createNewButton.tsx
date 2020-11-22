import React, { FunctionComponent, useState } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ClinicalInputForm } from './components/createNewForm';
import { ClinicalSample } from '../../../../types';
import { SampleNotifications } from '../../../../common/notifications';

// TODO - important - instead of combininig the button and the input dialog together from outside, why not include the dialog component here in the same file? that would mean that the entry point is the button, the rest are details. Once the button is imported somewhere, all the other logic is going to be there.
type ButtonCreateNewProps = {
    setRefreshNeededFlag: React.Dispatch<React.SetStateAction<boolean>>;
    style?: React.CSSProperties | undefined;
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
