import React, { useEffect, useState, FunctionComponent } from 'react';
import { Divider } from 'antd';
import { Sample } from '../../types';
import { Api } from './api';
import { InputForm, ButtonCreateNew } from './components/createNew';
import { List } from './components/list';
import { Constants } from '../../default-data/constants';
import { ButtonAddToPooling } from './components/addToPooling';

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
            <ButtonCreateNew onAddNewClick={onAddNewClick} style={{ float: 'right', marginRight: 74 }} />
            <ButtonAddToPooling onAddToPooling={onAddToPooling} style={{ float: 'right', marginRight: 16 }} />
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
