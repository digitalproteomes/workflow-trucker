import { Button } from 'antd';
import { Store } from 'antd/lib/form/interface';
import { ColumnsType } from 'antd/lib/table';
import { DeleteOutlined } from '@ant-design/icons';

import React, { FunctionComponent, useEffect, useState } from 'react';
import { getActionsColumn, getColumn, getEditableColumn } from '../../../../common/columnHelpers';
import { InputModal, InputHelper } from '../../../../common';
import { EditableList } from '../../../../common/listEditable';
import { Constants } from '../../../../default-data/constants';
import { IntermediateSample, MsReadyNew } from '../../../../types';
import { Api } from '../../../ms-runs/api';

type Props = {
    originalSamples: IntermediateSample[];
    onCreateSuccessful: () => void;
    onCancel: () => void;
};

export const FormProcessIntermediateSamples: FunctionComponent<Props> = ({
    originalSamples,
    onCreateSuccessful,
    onCancel,
}) => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [samplesToProcess, setSamplesToProcess] = useState<MsReadyNew[] | null>(null);

    useEffect(() => {
        if (samplesToProcess === null && originalSamples !== null) {
            const newSamples: MsReadyNew[] = originalSamples.map((entry) => {
                return {
                    intermediateSampleId: entry.id,
                    name: entry.name,
                    description: entry.description,
                    peptideNo: 0,
                    processingPerson: Constants.personName,
                    workflowTag: 'default',
                    projectId: Constants.projectId,
                    quality: 'good',
                };
            });

            setSamplesToProcess(newSamples);
        }
    }, [setSamplesToProcess, originalSamples, samplesToProcess]);

    const onCreate = (samples: MsReadyNew[]) => {
        async function saveSamples() {
            try {
                await Api.postMsReady(samples);

                onCreateSuccessful();
            } catch (error) {
                setErrorMessage(error.message);
            }
        }

        saveSamples();
    };

    const handleOnCancel = () => {
        onCancel();

        setSamplesToProcess(null);
    };

    const handleSave = (row: MsReadyNew) => {
        const newData: MsReadyNew[] = samplesToProcess!;
        const index = newData.findIndex((item) => row.intermediateSampleId === item.intermediateSampleId);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });

        setSamplesToProcess(newData);
    };

    const handleDelete = (row: MsReadyNew) => {
        const newData: MsReadyNew[] = samplesToProcess!;
        const index = newData.findIndex((item) => row.intermediateSampleId === item.intermediateSampleId);
        newData.splice(index, 1);

        if (newData.length === 0) {
            handleOnCancel();
            return;
        }

        setSamplesToProcess([...newData]);
    };

    const renderActions = (sample: MsReadyNew): JSX.Element => {
        return <Button type={'primary'} icon={<DeleteOutlined />} onClick={() => handleDelete(sample)} />;
    };

    const columns: ColumnsType<MsReadyNew> = [
        getColumn('Name', MsReadyNew.nameof('name')),
        getEditableColumn('Peptide #', MsReadyNew.nameof('peptideNo'), handleSave),
        getEditableColumn('Quality', MsReadyNew.nameof('quality'), handleSave),
        getColumn('Description', MsReadyNew.nameof('description')),
        getActionsColumn(renderActions),
    ];

    const inputs: JSX.Element[] = [
        InputHelper.createFormInput('Processing person', MsReadyNew.nameof('processingPerson')),
    ];

    return (
        <InputModal
            isVisible={samplesToProcess !== null}
            title="Process sample (generates an intermediate sample)"
            inputs={inputs}
            errorMessage={errorMessage}
            onCreate={async (data: Store) => {
                const template: MsReadyNew = data as MsReadyNew;

                samplesToProcess!.forEach((entry) => (entry.processingPerson = template.processingPerson));

                onCreate(samplesToProcess!);
            }}
            onCancel={() => handleOnCancel()}
        >
            <EditableList<MsReadyNew>
                entries={samplesToProcess!}
                columns={columns}
                rowKeySelector={(row: MsReadyNew) => row.intermediateSampleId}
            />
        </InputModal>
    );
};
