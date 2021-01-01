import { Store } from 'antd/lib/form/interface';
import { ColumnsType } from 'antd/lib/table';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { InputModal, InputHelper, EditableList } from '../../../../common';
import { MSRunNew } from '../../../../types';
import { Api } from '../../api';

type Props = {};

export const FormImportFromCsv: FunctionComponent<Props> = (props: Props) => {
    const [errorMessage] = useState<string | null>(null);
    const [samplesToProcess, setSamplesToProcess] = useState<MSRunNew[] | null>(null);

    const inputs: JSX.Element[] = [
        InputHelper.createFormInput('Instrument', MSRunNew.nameof('instrumentId')),
        InputHelper.createFormInput('Instrument', MSRunNew.nameof('instrumentId')),
    ];

    const columns: ColumnsType<MSRunNew> = [];

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
        // onCancel();
        // setSamplesToProcess(null);
    };

    return (
        <InputModal
            isVisible={true}
            title="Import MS Runs from a .csv file"
            inputs={inputs}
            errorMessage={errorMessage}
            onCreate={async (data: Store) => {
                const template: MSRunNew = data as MSRunNew;

                samplesToProcess!.forEach((entry) => (entry.instrumentId = template.instrumentId));

                onCreate(samplesToProcess!);
            }}
            onCancel={() => handleOnCancel()}
        >
            <EditableList<MSRunNew>
                entries={samplesToProcess!}
                columns={columns}
                rowKeySelector={(row: MSRunNew) => row.name}
            />
        </InputModal>
    );
};
