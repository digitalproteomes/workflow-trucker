import { Store } from 'antd/lib/form/interface';
import { ColumnsType } from 'antd/lib/table';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { getColumn, getEditableColumn } from '../../../../common/columnHelpers';
import { InputModal } from '../../../../common/inputModal';
import { createFormInput } from '../../../../common/inputModalHelpers';
import { EditableList, EditableListProps } from '../../../../common/listEditable';
import { Constants } from '../../../../default-data/constants';
import { IntermediateSample, MsReadyNew } from '../../../../types';
import { Api } from '../../api';

type Props = {
    originalSamples: IntermediateSample[];
    onCreateSuccessful: () => void;
    onCancel: () => void;
};

const EditableMsReadyList: FunctionComponent<EditableListProps<MsReadyNew>> = EditableList<MsReadyNew>();

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
                    id: entry.id,
                    name: entry.name,
                    description: entry.description,
                    peptideCount: 0,
                    processingPerson: Constants.personName,
                    quality: 'better than expected',
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

    const handleSave = (row: MsReadyNew) => {
        const newData: MsReadyNew[] = [...samplesToProcess!];
        const index = newData.findIndex((item) => row.name === item.name);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });

        setSamplesToProcess(newData);
    };

    const columns: ColumnsType<MsReadyNew> = [
        getColumn('Name', MsReadyNew.nameof('name')),
        getEditableColumn('Peptide #', MsReadyNew.nameof('peptideCount'), handleSave),
        getEditableColumn('Quality', MsReadyNew.nameof('quality'), handleSave),
        getColumn('Description', MsReadyNew.nameof('description')),
    ];

    const inputs: JSX.Element[] = [createFormInput('Processing person', MsReadyNew.nameof('processingPerson'))];

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
            onCancel={() => {
                onCancel();

                setSamplesToProcess(null);
            }}
        >
            <EditableMsReadyList entries={samplesToProcess!} columns={columns} />
        </InputModal>
    );
};
