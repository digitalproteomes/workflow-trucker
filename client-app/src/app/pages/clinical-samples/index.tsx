import React, { useEffect, useState, FunctionComponent } from 'react';
import { Button, Divider } from 'antd';
import { Sample } from '../../types';
import { Api } from './api';
import { Constants } from '../../default-data/constants';
import { InputModal } from './inputModal';
import { clinicalInputForm } from './createNew';
import { SampleList } from './sampleList';

type State = {
    activeInputForm: boolean;
    refreshNeeded: boolean;
    samples: Sample[];
};

export const ClinicalSamples: FunctionComponent = () => {
    const [state, setState] = useState<State>({
        activeInputForm: false,
        samples: [],
        refreshNeeded: true,
    });

    async function fetchClinicalSamples() {
        const projectId: number = 5;

        const samples: Sample[] = await Api.getClinicalSamples(projectId);

        setState({ ...state, refreshNeeded: false, samples });
    }

    useEffect(() => {
        if (state.refreshNeeded) {
            console.log('refresh needed');
            fetchClinicalSamples();
        }
    }, [state]); // empty array passed here because this effect depends on nothing. We want it to happen only once.

    const { activeInputForm, samples } = state;

    return (
        <div>
            <Button
                type="primary"
                onClick={() => {
                    setState({ ...state, activeInputForm: !state.activeInputForm });
                }}
                style={{ float: 'right', marginRight: 74 }}
            >
                Add new clinical sample
            </Button>
            <Button
                type="default"
                onClick={() => {
                    console.log('add to pooling');
                }}
                style={{ float: 'right', marginRight: 16 }}
            >
                Pooling preparation
            </Button>
            <InputModal
                visible={activeInputForm}
                title="New clinical sample"
                inputForm={clinicalInputForm}
                onCreate={(values: any) => {
                    // todo - this any to something is scary
                    console.log('Received values of form: ', values);
                    setState({ ...state, activeInputForm: false });

                    async function saveClinicalSample() {
                        await Api.postClinicalSampleAsync(
                            values.name as string,
                            Constants.projectId,
                        );

                        // assume the above is success. Even if it would be fail, that's and edgecase
                        setState({ ...state, refreshNeeded: true });
                    }
                    saveClinicalSample();
                }}
                onCancel={() => {
                    setState({ ...state, activeInputForm: false });
                }}
            ></InputModal>
            <Divider></Divider>
            {samples === null ? <div>No samples yet</div> : <SampleList samples={samples} />}
        </div>
    );
};
