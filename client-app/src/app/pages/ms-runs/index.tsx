import React, { useEffect, useState, FunctionComponent } from 'react';
import { Divider } from 'antd';
import { Msrun } from '../../types';
import { Api } from './api';
import { List } from './components/list';

export const MsRuns: FunctionComponent = () => {
    const [msruns, setMsruns] = useState<Msrun[] | null>(null);

    async function fetchMsruns() {
        if (msruns == null) {
            const projectId: number = 5;

            setMsruns(await Api.getMsRunsAsync(projectId));
        }
    }

    useEffect(() => {
        fetchMsruns();
    });

    return (
        <>
            <Divider></Divider>
            <List msruns={msruns} />
        </>
    );
};
