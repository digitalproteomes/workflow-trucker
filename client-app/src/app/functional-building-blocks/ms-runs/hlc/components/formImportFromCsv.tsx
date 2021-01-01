import { Button, Col, Divider } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { Store } from 'antd/lib/form/interface';
import { ColumnsType } from 'antd/lib/table';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { InputModal, InputHelper, EditableList, CSVImporter } from '../../../../common';
import { getActionsColumn, getColumn, getEditableColumn } from '../../../../common/columnHelpers';
import { MSRunNew } from '../../../../types';
import { Api } from '../../api';
import { MSRunNewTypeMap } from '../../typemaps/msRunNewTypeMap';

type Props = {
    onCreateSuccessful: () => void;
    onCancel: () => void;
};

export const FormImportFromCsv: FunctionComponent<Props> = (props: Props) => {
    const [typeMap] = useState<MSRunNewTypeMap>(new MSRunNewTypeMap());
    const [errorMessage] = useState<string | null>(null);
    const [samplesToProcess, setSamplesToProcess] = useState<MSRunNew[]>([]);

    const onCreate = (samples: MSRunNew[]) => {
        async function saveSamples() {
            // try {
            //     await Api.postMsReady(samples);
            //     onCreateSuccessful();
            // } catch (error) {
            //     setErrorMessage(error.message);
            // }
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
                columns={getColumns(handleDelete)}
                rowKeySelector={(row: MSRunNew) => row.name}
            />
        </InputModal>
    );
};

const inputs: JSX.Element[] = [
    InputHelper.createFormInput('Instrument', MSRunNew.nameof('instrumentId')),
    InputHelper.createFormInput('Processing person', MSRunNew.nameof('processingPerson')),
];

// todo - refactor list with removable entries - start from here and continue in formProcessIntermediateSamples

function renderActions(handleDeleteCallback: (sample: MSRunNew) => void) {
    return (sample: MSRunNew): JSX.Element => {
        return <Button type={'default'} icon={<DeleteOutlined />} onClick={() => handleDeleteCallback(sample)} />;
    };
}

function getColumns(handleDeleteCallback: (sample: MSRunNew) => void): ColumnsType<MSRunNew> {
    return [
        getColumn('Name', 'name'),
        getColumn('Sample', 'msReadySampleName'),
        getColumn('Run mode', 'runMode'),
        getColumn('Instrument', 'instrumentId'),
        getColumn('Method', 'instrumentMethod'),
        getColumn('Description', 'description'),
        getActionsColumn(renderActions(handleDeleteCallback)),
    ];
}
