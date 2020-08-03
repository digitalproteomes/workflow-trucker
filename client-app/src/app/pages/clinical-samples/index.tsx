import React, { useState, FunctionComponent } from 'react';
import { Divider, Space, PageHeader, Button } from 'antd';
import { ClinicalInputForm, ButtonCreateNew } from './components/createNew'; // todo - the two creation method should be combined
import { AutoGenerateInputForm, ButtonAutoGenerate } from './components/createNewAutoGenerate';
import { List } from './components/list';
import { ClinicalSample } from '../../types';
import { ButtonDelete } from './components/delete';
import { ButtonExport } from '../../common/export';
import { FractionateInputForm } from './components/fractionate';
import { ButtonSinglePrep } from './components/singlePrep';
import * as sampleNotifications from '../../common/sampleNotifications';
import * as notifications from '../../common/notificationsBase';

export const ClinicalSamples: FunctionComponent = () => {
    const [isActiveCreateNew, setActiveCreateNewFlag] = useState<boolean>(false);

    const [isActiveAutoGenerate, setActiveAutoGenerateFlag] = useState<boolean>(false);

    const [fractionateSample, setFractionateSample] = useState<ClinicalSample | null>(null);

    const [, setSelectedSamples] = useState<ClinicalSample[]>([]);

    const [isRefreshNeeded, setRefreshNeededFlag] = useState<boolean>(false);

    const onCreateNewSuccessful = (sample: ClinicalSample) => {
        sampleNotifications.queueCreateSuccess(sample.name);

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

    const onAutoGenerateButtonClick = () => {
        setActiveAutoGenerateFlag(true);
    };

    const onAutoGenerateCancel = () => {
        setActiveAutoGenerateFlag(false);
    };

    const onAutoGenerateSuccessful = (count: number) => {
        notifications.queueSuccess('Success', `${count} samples created succesfully.`);

        setRefreshNeededFlag(true);

        setActiveAutoGenerateFlag(false);
    };

    function onDeleteDone(sample: ClinicalSample) {
        setRefreshNeededFlag(true);
        sampleNotifications.queueDeleteSuccess(sample.name);
    }

    function onExportDone() {
        sampleNotifications.queueExportSuccess();
    }

    const onFractionateCancel = () => {
        setFractionateSample(null);
    };

    const onFractionateSuccessful = (samples: ClinicalSample[]) => {
        samples.forEach((sample, _index, _samples) => {
            sampleNotifications.queueCreateSuccess(sample.name);
        });

        setFractionateSample(null);
    };

    const onRowSelectionChange = (selectedRows: ClinicalSample[]) => {
        setSelectedSamples(selectedRows);
    };

    const renderActions = (record: ClinicalSample) => {
        return (
            <Space size="middle">
                <ButtonSinglePrep
                    onSinglePrep={() => {
                        console.log('on single prep click');
                    }}
                />
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
            <PageHeader ghost={false} title="Clinical Samples">
                <ButtonExport
                    onExportDone={() => {
                        onExportDone();
                    }}
                />

                <ButtonCreateNew onCreateNewClick={onCreateNew} style={{ float: 'right', marginRight: 10 }} />

                <ButtonAutoGenerate
                    onAutoGenerateClick={onAutoGenerateButtonClick}
                    style={{ float: 'right', marginRight: 16 }}
                />

                <ClinicalInputForm
                    isActiveInputForm={isActiveCreateNew}
                    onCreateSuccessful={onCreateNewSuccessful}
                    onCancel={onCreateNewCancel}
                />

                <AutoGenerateInputForm
                    isActiveInputForm={isActiveAutoGenerate}
                    onCreateSuccessful={onAutoGenerateSuccessful}
                    onCancel={onAutoGenerateCancel}
                />

                <FractionateInputForm
                    parentSample={fractionateSample}
                    onCreateSuccessful={onFractionateSuccessful}
                    onCancel={onFractionateCancel}
                />
            </PageHeader>
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
