import React, { useState, FunctionComponent } from 'react';
import { Divider, Space } from 'antd';
import { InputForm, ButtonCreateNew } from './components/createNew';
import { List } from './components/list';
import { ButtonAddToPooling } from './components/addToPooling';
import { Sample } from '../../types';
import { ButtonDelete } from './components/delete';

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

    function onDeleteDone() {
        setRefreshNeededFlag(true);
    }

    const renderActions = (record: Sample) => {
        return (
            <Space size="middle">
                {/* <ButtonFractionate /> */}
                <span>Fractionate</span>
                <span>Single Prep</span>
                <ButtonDelete sample={record} onDeleteDone={onDeleteDone} />
            </Space>
        );
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
            <List isRefreshNeeded={isRefreshNeeded} onRefreshDone={onRefreshDone} renderActions={renderActions} />
        </>
    );
};
