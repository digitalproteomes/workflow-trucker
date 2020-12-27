import React, { useState, FunctionComponent } from 'react';
import { Space, PageHeader, Divider } from 'antd';
import { SOP } from '../../types';
import { ButtonExport } from '../../common/buttonExport';
import { SampleNotifications } from '../../common/notifications';
import { ButtonDeleteSOP, ButtonDownload, ButtonUploadSOP, List } from '../../functional-building-blocks/sops/';

export const SOPPage: FunctionComponent = () => {
    const [isRefreshNeeded, setRefreshNeededFlag] = useState<boolean>(false);

    const [, setSOP] = useState<SOP[]>([]);

    const onRefreshDone = () => {
        setRefreshNeededFlag(false);
    };

    const onRowSelectionChange = (selectedRows: SOP[]) => {
        setSOP(selectedRows);
    };

    function onDeleteDone(sop: SOP) {
        setRefreshNeededFlag(true);
        SampleNotifications.queueDeleteSuccess(sop.name);
    }

    const renderActions = (record: SOP) => {
        return (
            <Space size="middle">
                <ButtonDownload sop={record} />
                <ButtonDeleteSOP
                    sop={record}
                    onDeleteDone={() => {
                        onDeleteDone(record);
                    }}
                />
            </Space>
        );
    };

    return (
        <>
            <Divider />
            <PageHeader ghost={false} title="Standard Operation Procedures"></PageHeader>
            <Space style={{ float: 'right' }} direction="horizontal">
                <ButtonUploadSOP setRefreshNeededFlag={setRefreshNeededFlag} />

                <ButtonExport title="Export" activeData={[]} />
            </Space>
            <Divider />
            <List
                isRefreshNeeded={isRefreshNeeded}
                onRefreshDone={onRefreshDone}
                renderActions={renderActions}
                onRowSelectionChange={onRowSelectionChange}
            />
        </>
    );
};
