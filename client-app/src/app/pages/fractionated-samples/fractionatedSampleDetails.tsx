import React, { useEffect, useState, FunctionComponent } from 'react';
import { Sample } from '../../types';
import { Api } from './api';
import { List } from './components/list';
import { useLocation } from 'react-router-dom';
import { Typography, Skeleton } from 'antd';

const { Title } = Typography;

export const FractionatedSampleDetails: FunctionComponent = () => {
    const [isRefreshNeeded, setRefreshNeededFlag] = useState<boolean>(true);
    const [samples, setSamples] = useState<Sample[]>([]);
    const [parentSample, setParentSample] = useState<Sample | null>(null);

    const location = useLocation(); // todo - why is useParams not working? https://reacttraining.com/react-router/web/api/Hooks/useparams

    useEffect(() => {
        async function fetchFractionatedSamples() {
            const searchParams = new URLSearchParams(location.search);

            const projectId: string = searchParams.get('project')!;
            const parentId: string = searchParams.get('parent')!;

            setSamples(await Api.getSamplesByParentAsync(projectId, parentId));

            setParentSample(await Api.getSampleAsync(parentId));

            setRefreshNeededFlag(false);
        }

        if (isRefreshNeeded) {
            fetchFractionatedSamples();
        }
    }, [isRefreshNeeded, location]);

    return parentSample == null ? (
        <Skeleton />
    ) : (
        <>
            <Title level={3}>{`Fractionated samples of clinical sample: ${parentSample.name}`}</Title>
            {/* <Title level={4}>{`Project id: ${parentSample?.projectId}`}</Title> */}
            <List samples={samples} />
        </>
    );
};
