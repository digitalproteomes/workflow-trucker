import React, { FunctionComponent, useState } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Notifications } from '../../../../common/notifications';
import { AutoGenerateInputForm } from '../autoGenerate';

type ButtonCreateNewProps = {
    setRefreshNeededFlag: React.Dispatch<React.SetStateAction<boolean>>;
    style?: React.CSSProperties | undefined;
};

export const ButtonAutoGenerate: FunctionComponent<ButtonCreateNewProps> = ({ setRefreshNeededFlag, style }) => {
    const [isActiveAutoGenerate, setActiveAutoGenerateFlag] = useState<boolean>(false);

    const { onAutoGenerateButtonClick, onAutoGenerateSuccessful, onAutoGenerateCancel } = linkAutoGenerate(
        setActiveAutoGenerateFlag,
        setRefreshNeededFlag,
    );

    return (
        <>
            <Button type="primary" icon={<PlusOutlined />} onClick={onAutoGenerateButtonClick} style={style}>
                Bulk create clinical samples
            </Button>
            <AutoGenerateInputForm
                isActiveInputForm={isActiveAutoGenerate}
                onCreateSuccessful={onAutoGenerateSuccessful}
                onCancel={onAutoGenerateCancel}
            />
        </>
    );

    function linkAutoGenerate(
        setActiveAutoGenerateFlag: React.Dispatch<React.SetStateAction<boolean>>,
        setRefreshNeededFlag: React.Dispatch<React.SetStateAction<boolean>>,
    ) {
        const onAutoGenerateButtonClick = () => {
            setActiveAutoGenerateFlag(true);
        };

        const onAutoGenerateCancel = () => {
            setActiveAutoGenerateFlag(false);
        };

        const onAutoGenerateSuccessful = (count: number) => {
            Notifications.queueSuccess('Success', `${count} samples created succesfully.`);

            setRefreshNeededFlag(true);

            setActiveAutoGenerateFlag(false);
        };
        return { onAutoGenerateButtonClick, onAutoGenerateSuccessful, onAutoGenerateCancel };
    }
};
