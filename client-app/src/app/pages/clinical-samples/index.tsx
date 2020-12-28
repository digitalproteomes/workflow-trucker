import React, { useState, FunctionComponent } from 'react';
import { Divider, Space, PageHeader } from 'antd';
import { ClinicalSample } from '../../types';
import { ButtonExportSelected } from '../../common/buttonExport';
import { SampleNotifications } from '../../common/notifications';
import { List, ButtonCreateNew, ButtonDelete } from '../../functional-building-blocks/clinical-samples/';
import { ButtonAutoGenerate } from '../../functional-building-blocks/clinical-samples/';
import { ButtonProcessSample, ButtonProcessSampleBulk } from '../../functional-building-blocks/intermediate-samples';
import { ButtonJourneyDiagram } from '../../functional-building-blocks/diagrams';

export const ClinicalSamples: FunctionComponent = () => {
    // debt - the setRefreshNeededFlag callback approach should be replaced with a "onSuccess" callback. The low leve component should not influence directly the state of a high level component
    const [isRefreshNeeded, setRefreshNeededFlag] = useState<boolean>(false);

    const onRefreshDone = () => {
        setRefreshNeededFlag(false);
    };

    function onDeleteDone(sample: ClinicalSample) {
        setRefreshNeededFlag(true);
        SampleNotifications.queueDeleteSuccess(sample.name);
    }

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
                <ButtonJourneyDiagram sampleId={record.id} />
            </Space>
        );
    };

    return (
        <>
            <PageHeader ghost={false} title="Clinical Samples">
                <ButtonExportSelected<ClinicalSample> title={'Export'} data={[]} />

                <ButtonCreateNew
                    setRefreshNeededFlag={setRefreshNeededFlag}
                    style={{ float: 'right', marginRight: 10 }}
                />

                {/* <ButtonProcessSampleBulk samples={selectedSamples} style={{ float: 'right', marginRight: 16 }} /> */}

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
            />
        </>
    );
};
