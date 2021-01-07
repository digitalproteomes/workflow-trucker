import React, { useState, FunctionComponent } from 'react';
import { Divider, Space, PageHeader } from 'antd';
import { ClinicalSample } from '../../types';
import { ButtonExportSelected } from '../../common';
import { SampleNotifications } from '../../common/notifications';
import { List, ButtonDelete } from '../../functional-building-blocks/clinical-samples/';
import { ButtonAutoGenerate } from '../../functional-building-blocks/clinical-samples/';
import { ButtonProcessSample, ButtonProcessSampleBulk } from '../../functional-building-blocks/intermediate-samples';
import { ButtonJourneyDiagram } from '../../functional-building-blocks/diagrams';
import { ListDataContext, Store, StoreContext } from '../../common';

const ContextName = 'ClinicalSampleDataContext';
Store.addStore(ContextName, new ListDataContext<ClinicalSample>());

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
                <ButtonProcessSample sample={record} />
                <ButtonJourneyDiagram sampleId={record.id} />
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
        <StoreContext.Provider value={{ name: ContextName }}>
            <PageHeader ghost={false} title="Clinical Samples">
                <ButtonExportSelected<ClinicalSample> title={'Export table'} />

                <ButtonProcessSampleBulk style={{ float: 'right', marginRight: 16 }} />

                <ButtonAutoGenerate
                    setRefreshNeededFlag={setRefreshNeededFlag}
                    style={{ float: 'right', marginRight: 16 }}
                />
            </PageHeader>
            <Divider></Divider>

            <List isRefreshNeeded={isRefreshNeeded} onRefreshDone={onRefreshDone} renderActions={renderActions} />
        </StoreContext.Provider>
    );
};
