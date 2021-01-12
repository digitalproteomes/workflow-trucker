import { Button, Col, Divider } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { Store } from 'antd/lib/form/interface';
import { ColumnsType } from 'antd/lib/table';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { InputModal, InputHelper, EditableList, CSVImporter } from '../../../../common';
import { getActionsColumn, getEditableColumn } from '../../../../common/columnHelpers';
import { MSRunNew, SOP } from '../../../../types';
import { Api } from '../../api';
import { MSRunNewTypeMap } from '../../typemaps/msRunNewTypeMap';
import { Constants } from '../../../../default-data/constants';
import { MSRunNewCreateResponse } from '../../../../types/types';
import { ModalImportSummary } from './modalSummary';

type Props = {
    onClose: (dataWasCreated: boolean) => void;
};

export const FormImportFromCsv: FunctionComponent<Props> = (props: Props) => {
    const [typeMap] = useState<MSRunNewTypeMap>(new MSRunNewTypeMap());
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [samplesToProcess, setSamplesToProcess] = useState<MSRunNew[]>([]);
    const [sops, setSops] = useState<SOP[] | null>(null);
    const [importSummary, setImportSummary] = useState<MSRunNewCreateResponse | undefined>(undefined);

    useEffect(() => {
        async function executeFetch() {
            const receivedSops = await Api.getSOPsAsync(Constants.projectId);

            setSops(receivedSops);
        }

        if (sops == null) {
            executeFetch();
        }
    });

    const onCreate = (samples: MSRunNew[]) => {
        async function saveSamples() {
            try {
                const createResponse = await Api.postMsRuns(samples);

                setImportSummary(createResponse);
            } catch (error) {
                setErrorMessage(error.message);
            }
        }

        saveSamples();
    };

    const handleOnCancel = () => {
        props.onClose(false);
    };

    function onDataImported(entries: MSRunNew[]) {
        let tempId = 0;

        entries.forEach(function (entry) {
            entry.temporaryId = tempId++;

            if (!entry.description) entry.description = '';

            if (!entry.instrumentMethod) return;

            if (entry.instrumentMethod.toUpperCase().includes('DDA')) {
                entry.runMode = 'DDA';
            } else if (entry.instrumentMethod.toUpperCase().includes('DIA')) {
                entry.runMode = 'DIA';
            } else {
                entry.runMode = 'Unknown';
            }
        });

        setSamplesToProcess(entries);
    }

    const handleDelete = (row: MSRunNew) => {
        const newData: MSRunNew[] = samplesToProcess;
        const index = newData.findIndex((item) => row.temporaryId === item.temporaryId);
        newData.splice(index, 1);

        if (newData.length === 0) {
            handleOnCancel();
            return;
        }

        setSamplesToProcess([...newData]);
    };

    const handleSave = (row: MSRunNew) => {
        const newData: MSRunNew[] = samplesToProcess;

        const index = newData.findIndex((item) => row.temporaryId === item.temporaryId);
        const item: MSRunNew = newData[index];

        newData.splice(index, 1, {
            ...item, //unfold the existing item
            ...row, // complete it with the new data
        });

        setSamplesToProcess([...newData]); // unfold the elements of the array into a new array => the array reference will change => the downsttream components receiving the samples will be able to update
    };

    const handleCloseSummary = () => {
        setImportSummary(undefined);
    };

    return (
        <>
            <InputModal
                isVisible={true}
                title="Import MS Runs from a .csv file"
                buttonConfirmText="Import"
                buttonCancelText="Close"
                inputs={getInputs(sops ?? [])}
                errorMessage={errorMessage}
                onCreate={async (data: Store) => {
                    const template: MSRunNew = data as MSRunNew;

                    samplesToProcess.forEach((entry) => {
                        entry.projectId = Constants.projectId;
                        entry.instrumentId = template.instrumentId;
                        entry.processingPerson = template.processingPerson;
                        entry.SOPDDA = template.SOPDDA;
                        entry.SOPDIA = template.SOPDIA;
                    });

                    onCreate(samplesToProcess!);
                }}
                onCancel={() => handleOnCancel()}
                styleModal={{ centered: true, width: 1760 }}
            >
                <Col span={11}>
                    <CSVImporter<MSRunNew> converter={typeMap} onDataLoaded={onDataImported} />
                </Col>
                <Divider />
                <EditableList<MSRunNew>
                    entries={samplesToProcess}
                    columns={getColumns(handleDelete, handleSave)}
                    rowKeySelector={(row: MSRunNew) => row.name}
                />
            </InputModal>
            {importSummary && <ModalImportSummary summary={importSummary} onClose={handleCloseSummary} />}
        </>
    );
};

function getInputs(sops: SOP[]): JSX.Element[] {
    return [
        InputHelper.createFormInput('Instrument', MSRunNew.nameof('instrumentId'), 'instrument name', true),
        InputHelper.createFormInput(
            'Processing person',
            MSRunNew.nameof('processingPerson'),
            'processing person',
            true,
        ),
        InputHelper.createSOPFormSelectInput('SOP DDA', MSRunNew.nameof('SOPDDA'), sops),
        InputHelper.createSOPFormSelectInput('SOP DIA', MSRunNew.nameof('SOPDIA'), sops),
    ];
}

// todo - refactor list with removable entries - start from here and continue in formProcessIntermediateSamples

function renderActions(handleDeleteCallback: (sample: MSRunNew) => void) {
    return (sample: MSRunNew): JSX.Element => {
        return <Button type={'default'} icon={<DeleteOutlined />} onClick={() => handleDeleteCallback(sample)} />;
    };
}

function getColumns(
    handleDeleteCallback: (sample: MSRunNew) => void,
    handleSave: (sample: MSRunNew) => void,
): ColumnsType<MSRunNew> {
    return [
        getEditableColumn('Name', 'name', handleSave),
        getEditableColumn('Sample', 'msReadySampleName', handleSave),
        getEditableColumn('Run mode', 'runMode', handleSave),
        getEditableColumn('Method', 'instrumentMethod', handleSave),
        getEditableColumn('Description', 'description', handleSave),
        getActionsColumn(renderActions(handleDeleteCallback)),
    ];
}
