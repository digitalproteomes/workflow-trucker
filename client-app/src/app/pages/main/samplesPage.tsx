import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { AppStore } from '../../appStore';
import { SamplesView } from './components/samplesView';
import { useLocation } from 'react-router-dom';

export const SamplesPage = observer<any>(() => {
    const location = useLocation();
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);

        const projectId: number = Number.parseInt(searchParams.get('project')!);
        const protocolId: number = Number.parseInt(searchParams.get('type')!);

        async function fetchStuff() {
            AppStore.fetchSelectedProjectSamplesByProtocolIdAsync(projectId, protocolId);
        }
        fetchStuff();
    }, [location]); //because we pass in the location as the 2nd param, only when it changes, the effect will be re-executed
    //https://reactjs.org/docs/hooks-reference.html#conditionally-firing-an-effect

    const { samples } = AppStore;
    const samplesView =
        samples === null ? <span>no samples yet</span> : <SamplesView samples={samples} />;
    return samplesView;
});
