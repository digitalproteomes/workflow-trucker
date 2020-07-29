import React, { useEffect, useState, FunctionComponent } from 'react';
import { Divider } from 'antd';
import { MsRun } from '../../types';
import { Api } from './api';
import { List } from './components/list';
import { Constants } from '../../default-data/constants';

export const MsRuns: FunctionComponent = () => {
    const [msruns, setMsruns] = useState<MsRun[] | null>(null);

    async function fetchMsruns() {
        if (msruns == null) {
            setMsruns(await Api.getMsRunsAsync(Constants.projectId));
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
