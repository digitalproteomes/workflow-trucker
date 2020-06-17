import React, { useState, FunctionComponent } from 'react';
import { Divider, Space, notification } from 'antd';
import { ClinicalInputForm, ButtonCreateNew } from './components/createNew';
import { List } from './components/list';
import { ButtonAddToPooling } from './components/addToPooling';
import { Sample } from '../../types';
import { ButtonDelete } from './components/delete';
import { ButtonFractionate, FractionateInputForm } from './components/fractionate';
import { ButtonSinglePrep } from './components/singlePrep';

export const ClinicalSamples: FunctionComponent = () => {
    const [isActiveCreateNew, setActiveCreateNewFlag] = useState<boolean>(false);

    const [fractionateSample, setFractionateSample] = useState<Sample | null>(null);

    const [isRefreshNeeded, setRefreshNeededFlag] = useState<boolean>(false);

    const onCreateNewSuccessful = (key: any) => {
        console.log(`succesful item creation having key ${key}`);

        setRefreshNeededFlag(true);

        setActiveCreateNewFlag(false);
    };

    const onRefreshDone = () => {
        setRefreshNeededFlag(false);
    };

    const onCreateNew = () => {
        setActiveCreateNewFlag(true);
    };

    const onCreateNewCancel = () => {
        setActiveCreateNewFlag(false);
    };

    const onAddToPooling = () => {
        console.log('add to pooling');
    };

    function onDeleteDone() {
        setRefreshNeededFlag(true);
    }

    const onFractionate = (sample: Sample) => {
        setFractionateSample(sample);
    };

    const onFractionateCancel = () => {
        setFractionateSample(null);
    };

    const onFractionateSuccessful = (samples: Sample[]) => {
        samples.forEach((sample, _index, _samples) => {
            openNotificationWithIcon(sample.name);
        });

        setFractionateSample(null);
    };

    const renderActions = (record: Sample) => {
        return (
            <Space size="middle">
                <ButtonSinglePrep
                    onSinglePrep={() => {
                        console.log('on single prep click');
                    }}
                />
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
            <ClinicalInputForm
                isActiveInputForm={isActiveCreateNew}
                onCreateSuccessful={onCreateNewSuccessful}
                onCancel={onCreateNewCancel}
            />
            <FractionateInputForm
                parentSample={fractionateSample}
                onCreateSuccessful={onFractionateSuccessful}
                onCancel={onFractionateCancel}
            />
            <Divider></Divider>
            <List isRefreshNeeded={isRefreshNeeded} onRefreshDone={onRefreshDone} renderActions={renderActions} />
        </>
    );
};

const openNotificationWithIcon = (sampleName: string) => {
    notification['success']({
        message: 'Success',
        description: `Sample ${sampleName} created successfuly.`,
    });
};
