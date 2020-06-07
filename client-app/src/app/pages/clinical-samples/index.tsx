import React, { useEffect, useState, FunctionComponent } from 'react';
import { Button, Divider } from 'antd';
import { Sample } from '../../types';
import { Api } from './api';
import { InputForm } from './components/createNew';
import { List } from './components/list';
import { Constants } from '../../default-data/constants';
import { ButtonCreateNew, ButtonAddToPooling } from './components/buttons';

export const ClinicalSamples: FunctionComponent = () => {
    const [samples, setSamples] = useState<Sample[] | null>(null);

    async function fetchClinicalSamples() {
        setSamples(await Api.getClinicalSamples(Constants.projectId));
    }

    useEffect(() => {
        if (samples == null) {
            console.log('refresh was needed');

            fetchClinicalSamples();
        }
    });

    const [isActiveInputForm, setActiveInputFormFlag] = useState<boolean>(false);

    const onCreateSuccessful = (key: any) => {
        console.log(`succesful item creation having key ${key}`);

        fetchClinicalSamples();

        setActiveInputFormFlag(false);
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
            <ButtonCreateNew onAddNewClick={onAddNewClick} />
            <ButtonAddToPooling onAddToPooling={onAddToPooling} />
            <InputForm
                isActiveInputForm={isActiveInputForm}
                onCreateSuccessful={onCreateSuccessful}
                onCancel={onCancel}
            />
            <Divider></Divider>
            <List samples={samples} />
        </>
    );
};
