import React, { useState, FunctionComponent } from 'react';
import { Divider, Space, PageHeader } from 'antd';
import { ButtonCreateNew } from './components/clinical-sample/createNewButton';
import { AutoGenerateInputForm } from './components/autoGenerate';
import { ButtonAutoGenerate } from './components/autoGenerateButton';
import { List } from './components/clinical-sample/list';
import { ClinicalSample } from '../../types';
import { ButtonDelete } from './components/clinical-sample/delete';
import { ButtonExport } from '../../common/export';
import { ProcessSampleForm } from './components/processSample';
import { Notifications, SampleNotifications } from '../../common/notifications';

export const ClinicalSamples: FunctionComponent = () => {
    const [isActiveAutoGenerate, setActiveAutoGenerateFlag] = useState<boolean>(false);
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

    const { onAutoGenerateButtonClick, onAutoGenerateSuccessful, onAutoGenerateCancel } = linkAutoGenerate(
        setActiveAutoGenerateFlag,
        setRefreshNeededFlag,
    );

    const renderActions = (record: ClinicalSample) => {
        return (
            <Space size="middle">
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

                <ButtonCreateNew
                    setRefreshNeededFlag={setRefreshNeededFlag}
                    style={{ float: 'right', marginRight: 10 }}
                />

                <ButtonAutoGenerate
                    onAutoGenerateClick={onAutoGenerateButtonClick}
                    style={{ float: 'right', marginRight: 16 }}
                />

                <AutoGenerateInputForm
                    isActiveInputForm={isActiveAutoGenerate}
                    onCreateSuccessful={onAutoGenerateSuccessful}
                    onCancel={onAutoGenerateCancel}
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
