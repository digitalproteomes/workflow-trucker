import React, { useEffect, useState, FunctionComponent } from 'react';
import { Sample } from '../../types';
import { Api } from './api';
import { List } from './components/list';
import { useLocation } from 'react-router-dom';
import { Typography, Skeleton } from 'antd';

const { Title } = Typography;

export const FractionatedSampleDetails: FunctionComponent = () => {
    const location = useLocation(); // todo - why is useParams not working? https://reacttraining.com/react-router/web/api/Hooks/useparams
    const searchParams = new URLSearchParams(location.search);

    // todo - validation needed here
    const projectId: string = searchParams.get('project')!;
    const parentId: string = searchParams.get('parent')!;

    const [samples, setSamples] = useState<Sample[]>([]);
    const [parentSample, setParentSample] = useState<Sample | null>(null);
    const [isRefreshNeeded, setRefreshNeededFlag] = useState<boolean>(true);

    async function fetchFractionatedSamples() {
        setSamples(await Api.getSamplesByParentAsync(projectId, parentId));

        setParentSample(await Api.getSampleAsync(parentId));

        setRefreshNeededFlag(false);
    }

    useEffect(() => {
        if (isRefreshNeeded) {
            fetchFractionatedSamples();
        }
    }, [isRefreshNeeded]);

    return parentSample == null ? (
        <Skeleton />
    ) : (
        <>
            <Title level={3}>{`Sample: ${parentSample?.name}`}</Title>
            <Title level={4}>{`Project id: ${parentSample?.projectId}`}</Title>
            <List samples={samples} />
        </>
    );
};
