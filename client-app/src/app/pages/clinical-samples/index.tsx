import React, { useState, FunctionComponent } from 'react';
import { Divider, Space, PageHeader } from 'antd';
import { ClinicalSample } from '../../types';
import { ButtonExport } from '../../common/export';
import { SampleNotifications } from '../../common/notifications';
import { List, ButtonCreateNew, ButtonDelete } from '../../functional-building-blocks/clinical-samples/';
import { ButtonAutoGenerate } from '../../functional-building-blocks/clinical-samples/';
import { ButtonProcessSample, ButtonProcessSampleBulk } from '../../functional-building-blocks/intermediate-samples';

export const ClinicalSamples: FunctionComponent = () => {
    const [selectedSamples, setSelectedSamples] = useState<ClinicalSample[]>([]);
    // debt - the setRefreshNeededFlag callback approach should be replaced with a "onSuccess" callback. The low leve component should not influence directly the state of a high level component
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
                <ButtonProcessSample sample={record} />
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

                <ButtonProcessSampleBulk samples={selectedSamples} style={{ float: 'right', marginRight: 16 }} />

                <ButtonAutoGenerate
                    setRefreshNeededFlag={setRefreshNeededFlag}
                    style={{ float: 'right', marginRight: 16 }}
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
