import { Button, Col, Divider } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { Store } from 'antd/lib/form/interface';
import { ColumnsType } from 'antd/lib/table';
import React, { FunctionComponent, useState } from 'react';
import { InputModal, InputHelper, EditableList, CSVImporter } from '../../../../common';
import { getActionsColumn, getEditableColumn } from '../../../../common/columnHelpers';
import { MSRunNew } from '../../../../types';
import { Api } from '../../api';
import { MSRunNewTypeMap } from '../../typemaps/msRunNewTypeMap';

type Props = {
    onCreateSuccessful: () => void;
    onCancel: () => void;
};

export const FormImportFromCsv: FunctionComponent<Props> = (props: Props) => {
    const [typeMap] = useState<MSRunNewTypeMap>(new MSRunNewTypeMap());
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [samplesToProcess, setSamplesToProcess] = useState<MSRunNew[]>([]);

    const onCreate = (samples: MSRunNew[]) => {
        async function saveSamples() {
            try {
                await Api.postMsRuns(samples);
                props.onCreateSuccessful();
            } catch (error) {
                setErrorMessage(error.message);
            }
        }

        saveSamples();
    };

    const handleOnCancel = () => {
        props.onCancel();
        // setSamplesToProcess(null);
    };

    function onDataImported(entries: MSRunNew[]) {
        setSamplesToProcess(entries);
    }

    const handleDelete = (row: MSRunNew) => {
        const newData: MSRunNew[] = samplesToProcess;
        const index = newData.findIndex((item) => row.name === item.name);
        newData.splice(index, 1);

        if (newData.length === 0) {
            handleOnCancel();
            return;
        }

        setSamplesToProcess([...newData]);
    };

    const handleSave = (row: MSRunNew) => {
        const newData: MSRunNew[] = samplesToProcess;

        const index = newData.findIndex((item) => row.name === item.name);
        const item: MSRunNew = newData[index];

        newData.splice(index, 1, {
            ...item, //unfold the existing item
            ...row, // complete it with the new data
        });

        setSamplesToProcess([...newData]); // unfold the elements of the array into a new array => the array reference will change => the downsttream components receiving the samples will be able to update
    };

    return (
        <InputModal
            isVisible={true}
            title="Import MS Runs from a .csv file"
            inputs={inputs}
            errorMessage={errorMessage}
            onCreate={async (data: Store) => {
                const template: MSRunNew = data as MSRunNew;

                samplesToProcess.forEach((entry) => (entry.instrumentId = template.instrumentId));

                onCreate(samplesToProcess!);
            }}
            onCancel={() => handleOnCancel()}
            styleModal={{ centered: true, width: 1560 }}
        >
            <Col span={12}>
                <CSVImporter<MSRunNew> converter={typeMap} onDataLoaded={onDataImported} />
            </Col>
            <Divider />
            <EditableList<MSRunNew>
                entries={samplesToProcess}
                columns={getColumns(handleDelete, handleSave)}
                rowKeySelector={(row: MSRunNew) => row.name}
            />
        </InputModal>
    );
};

const inputs: JSX.Element[] = [
    InputHelper.createFormInput('Instrument', MSRunNew.nameof('instrumentId'), 'instrument name', true),
    InputHelper.createFormInput('Processing person', MSRunNew.nameof('processingPerson'), 'processing person', true),
];

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
        // getColumn('Instrument', 'instrumentId'),
        getEditableColumn('Method', 'instrumentMethod', handleSave),
        getEditableColumn('Description', 'description', handleSave),
        getActionsColumn(renderActions(handleDeleteCallback)),
    ];
}
