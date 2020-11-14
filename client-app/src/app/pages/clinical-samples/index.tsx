import React, { useState, FunctionComponent } from 'react';
import { Divider, Space, PageHeader } from 'antd';
import { ClinicalInputForm } from './components/createNew'; // TODO: the two creation method should be combined
import { ButtonCreateNew } from './components/createNewButton';
import { AutoGenerateInputForm } from './components/autoGenerate';
import { ButtonAutoGenerate } from './components/autoGenerateButton';
import { List } from './components/list';
import { ClinicalSample } from '../../types';
import { ButtonDelete } from './components/delete';
import { ButtonExport } from '../../common/export';
import { FractionateInputForm } from './components/fractionate';
import { ButtonSinglePrep } from './components/singlePrep';
import { ProcessSampleForm } from './components/processSample';
import { Notifications, SampleNotifications } from '../../common/notifications';

export const ClinicalSamples: FunctionComponent = () => {
    const [isActiveCreateNew, setActiveCreateNewFlag] = useState<boolean>(false);
    const [isActiveAutoGenerate, setActiveAutoGenerateFlag] = useState<boolean>(false);
    const [fractionateSample, setFractionateSample] = useState<ClinicalSample | null>(null);
    const [sampleToProcess, setSampleToProcess] = useState<ClinicalSample | null>(null);
    const [, setSelectedSamples] = useState<ClinicalSample[]>([]);
    const [isRefreshNeeded, setRefreshNeededFlag] = useState<boolean>(false);

    const onRefreshDone = () => {
        setRefreshNeededFlag(false);
    };

    function onDeleteDone(sample: ClinicalSample) {
        setRefreshNeededFlag(true);
        SampleNotifications.queueDeleteSuccess(sample.name);
    }

    function onExportDone() {
        SampleNotifications.queueExportSuccess();
    }

    const onRowSelectionChange = (selectedRows: ClinicalSample[]) => {
        setSelectedSamples(selectedRows);
    };

    const { onCreateNew, onCreateNewSuccessful, onCreateNewCancel } = linkCreateNew(
        setRefreshNeededFlag,
        setActiveCreateNewFlag,
    );

    const { onAutoGenerateButtonClick, onAutoGenerateSuccessful, onAutoGenerateCancel } = linkAutoGenerate(
        setActiveAutoGenerateFlag,
        setRefreshNeededFlag,
    );

    const { onFractionateSuccessful, onFractionateCancel } = linkFractionate(setFractionateSample);

    const renderActions = (record: ClinicalSample) => {
        return (
            <Space size="middle">
                <ButtonSinglePrep
                    onSinglePrep={() => {
                        console.log('on single prep click');
                        setSampleToProcess(record);
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

                <ProcessSampleForm
                    originalSample={sampleToProcess}
                    onCancel={() => {
                        setSampleToProcess(null);
                    }}
                    onCreateSuccessful={() => {
                        SampleNotifications.queueCreateSuccess('Intermediary sample created succesfully');
                        setSampleToProcess(null);
                    }}
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

// TODO: analyze if the method groupings based on functionality is feasible. Maybe these could be moved out into separate files into their own modules?
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

function linkFractionate(setFractionateSample: React.Dispatch<React.SetStateAction<ClinicalSample | null>>) {
    const onFractionateCancel = () => {
        setFractionateSample(null);
    };

    const onFractionateSuccessful = (samples: ClinicalSample[]) => {
        samples.forEach((sample, _index, _samples) => {
            SampleNotifications.queueCreateSuccess(sample.name);
        });

        setFractionateSample(null);
    };
    return { onFractionateSuccessful, onFractionateCancel };
}
