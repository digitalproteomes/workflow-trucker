import React, { FunctionComponent, useState } from 'react';
import { Tooltip, Button } from 'antd';
import { PlaySquareOutlined } from '@ant-design/icons';
import { JourneyDiagram } from './components/journeyDiagram';

type Props = {
    sampleId: string;
    style?: React.CSSProperties;
};

export const ButtonJourneyDiagram: FunctionComponent<Props> = ({ sampleId, style }) => {
    const [sourceSampleId, setSourceSampleId] = useState<string | null>(null);

    return (
        <>
            <Tooltip title="Journey">
                <Button
                    type="default"
                    icon={<PlaySquareOutlined />}
                    onClick={() => setSourceSampleId(sampleId)}
                    style={style}
                >
                    Journey
                </Button>
            </Tooltip>
            {sourceSampleId && <JourneyDiagram sampleId={sourceSampleId} onClose={() => setSourceSampleId(null)} />}
        </>
    );
};
