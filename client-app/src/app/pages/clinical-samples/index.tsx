import React, { useState, FunctionComponent } from 'react';
import { Divider, Space } from 'antd';
// import { ClinicalInputForm, ButtonCreateNew } from './components/createNew'; // todo - the two creation method should be combined
import { ClinicalInputForm, ButtonCreateNew } from './components/createNewAutoGenerate';
import { List } from './components/list';
import { ButtonAddToPooling } from './components/addToPooling';
import { Sample } from '../../types';
import { ButtonDelete } from './components/delete';
import { ButtonFractionate, FractionateInputForm, ButtonFractionDetails } from './components/fractionate';
import { ButtonSinglePrep } from './components/singlePrep';
import * as notifications from '../../common/sampleNotifications';
import { ButtonCreateMsRun } from '../generic-components/createMsRun';

export const ClinicalSamples: FunctionComponent = () => {
    const [isActiveCreateNew, setActiveCreateNewFlag] = useState<boolean>(false);

    const [fractionateSample, setFractionateSample] = useState<Sample | null>(null);

    const [selectedSamples, setSelectedSamples] = useState<Sample[]>([]);

    const [isRefreshNeeded, setRefreshNeededFlag] = useState<boolean>(false);

    const onCreateNewSuccessful = (sample: Sample) => {
        notifications.queueCreateSuccess(sample.name);

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

    function onDeleteDone(sample: Sample) {
        setRefreshNeededFlag(true);
        notifications.queueDeleteSuccess(sample.name);
    }

    const onFractionate = (sample: Sample) => {
        setFractionateSample(sample);
    };

    const onFractionateCancel = () => {
        setFractionateSample(null);
    };

    const onFractionateSuccessful = (samples: Sample[]) => {
        samples.forEach((sample, _index, _samples) => {
            notifications.queueCreateSuccess(sample.name);
        });

        setFractionateSample(null);
    };

    const onRowSelectionChange = (selectedRows: Sample[]) => {
        setSelectedSamples(selectedRows);
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
                <ButtonFractionDetails sample={record} />
                <ButtonDelete
                    sample={record}
                    onDeleteDone={() => {
                        onDeleteDone(record);
                    }}
                />
            </Space>
        );
    };

    return (
        <>
            <ButtonCreateNew onCreateNewClick={onCreateNew} style={{ float: 'right', marginRight: 74 }} />
            <ButtonCreateMsRun samples={selectedSamples} style={{ float: 'right', marginRight: 16 }} />
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
            <List
                isRefreshNeeded={isRefreshNeeded}
                onRefreshDone={onRefreshDone}
                renderActions={renderActions}
                onRowSelectionChange={onRowSelectionChange}
            />
        </>
    );
};
