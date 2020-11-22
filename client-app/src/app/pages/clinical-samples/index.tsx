import React, { useState, FunctionComponent } from 'react';
import { Divider, Space, PageHeader } from 'antd';
import { ClinicalSample } from '../../types';
import { ButtonExport } from '../../common/export';
import { ProcessSampleForm } from './components/processSample';
import { SampleNotifications } from '../../common/notifications';
import { List, ButtonCreateNew, ButtonDelete } from '../functional-building-blocks/clinical-samples/';
import { ButtonAutoGenerate } from '../functional-building-blocks/auto-generate/';

export const ClinicalSamples: FunctionComponent = () => {
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
                    setRefreshNeededFlag={setRefreshNeededFlag}
                    style={{ float: 'right', marginRight: 16 }}
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
