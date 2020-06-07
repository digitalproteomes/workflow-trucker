import React, { useState, FunctionComponent } from 'react';
import { Divider } from 'antd';
import { InputForm, ButtonCreateNew } from './components/createNew';
import { List } from './components/list';
import { ButtonAddToPooling } from './components/addToPooling';

export const ClinicalSamples: FunctionComponent = () => {
    const [isActiveInputForm, setActiveInputFormFlag] = useState<boolean>(false);
    const [isRefreshNeeded, setRefreshNeededFlag] = useState<boolean>(false);

    const onCreateSuccessful = (key: any) => {
        console.log(`succesful item creation having key ${key}`);

        setRefreshNeededFlag(true);

        setActiveInputFormFlag(false);
    };

    const onRefreshDone = () => {
        setRefreshNeededFlag(false);
    };

    const onCancel = () => {
        setActiveInputFormFlag(false);
    };

    const onAddNewClick = () => {
        setActiveInputFormFlag(true);
    };

    const onAddToPooling = () => {
        console.log('add to pooling');
    };

    return (
        <>
            <ButtonCreateNew onAddNewClick={onAddNewClick} style={{ float: 'right', marginRight: 74 }} />
            <ButtonAddToPooling onAddToPooling={onAddToPooling} style={{ float: 'right', marginRight: 16 }} />
            <InputForm
                isActiveInputForm={isActiveInputForm}
                onCreateSuccessful={onCreateSuccessful}
                onCancel={onCancel}
            />
            <Divider></Divider>
            <List isRefreshNeeded={isRefreshNeeded} onRefreshDone={onRefreshDone} />
        </>
    );
};
