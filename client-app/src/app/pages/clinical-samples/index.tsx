import React, { useState, FunctionComponent } from 'react';
import { Divider, Space } from 'antd';
import { InputForm, ButtonCreateNew } from './components/createNew';
import { List } from './components/list';
import { ButtonAddToPooling } from './components/addToPooling';
import { Sample } from '../../types';
import { ButtonDelete } from './components/delete';
import { ButtonFractionate } from './components/fractionate';

export const ClinicalSamples: FunctionComponent = () => {
    const [isActiveCreateNew, setActiveCreateNewFlag] = useState<boolean>(false);

    const [isRefreshNeeded, setRefreshNeededFlag] = useState<boolean>(false);

    const onCreateSuccessful = (key: any) => {
        console.log(`succesful item creation having key ${key}`);

        setRefreshNeededFlag(true);

        setActiveCreateNewFlag(false);
    };

    const onRefreshDone = () => {
        setRefreshNeededFlag(false);
    };

    const onCancel = () => {
        setActiveCreateNewFlag(false);
    };

    const onCreateNew = () => {
        setActiveCreateNewFlag(true);
    };

    const onAddToPooling = () => {
        console.log('add to pooling');
    };

    function onDeleteDone() {
        setRefreshNeededFlag(true);
    }

    const onFractionate = (sample: Sample) => {
        console.log(`fractionate clicked for ${sample.id}`);
        // todo - activate here an input modal similar to the one create new one
        // dynamic form https://ant.design/components/form/, so rows can be created dynamically containing the fractionated values
    };

    const renderActions = (record: Sample) => {
        return (
            <Space size="middle">
                <span>Single Prep</span>
                <ButtonFractionate
                    onFractionate={() => {
                        onFractionate(record);
                    }}
                />
                <ButtonDelete sample={record} onDeleteDone={onDeleteDone} />
            </Space>
        );
    };

    return (
        <>
            <ButtonCreateNew onCreateNewClick={onCreateNew} style={{ float: 'right', marginRight: 74 }} />
            <ButtonAddToPooling onAddToPooling={onAddToPooling} style={{ float: 'right', marginRight: 16 }} />
            <InputForm
                isActiveInputForm={isActiveCreateNew}
                onCreateSuccessful={onCreateSuccessful}
                onCancel={onCancel}
            />
            <Divider></Divider>
            <List isRefreshNeeded={isRefreshNeeded} onRefreshDone={onRefreshDone} renderActions={renderActions} />
        </>
    );
};
