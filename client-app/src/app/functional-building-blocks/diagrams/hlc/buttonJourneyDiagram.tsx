import React, { FunctionComponent, useState } from 'react';
import { Tooltip, Button } from 'antd';
import { FolderViewOutlined } from '@ant-design/icons';
import { JourneyDiagram } from './components/journeyDiagram';

type Props = {
    sampleId: string;
    style?: React.CSSProperties | undefined;
};

export const ButtonJourneyDiagram: FunctionComponent<Props> = ({ sampleId, style }) => {
    const [sourceSampleId, setSourceSampleId] = useState<string | null>(null);

    const diagram =
        sourceSampleId === null ? (
            <></>
        ) : (
            <JourneyDiagram sampleId={sourceSampleId} onClose={() => setSourceSampleId(null)} />
        );

    return (
        <>
            <Tooltip title="Journey">
                <Button
                    type="default"
                    icon={<FolderViewOutlined />}
                    onClick={() => setSourceSampleId(sampleId)}
                    style={style}
                >
                    Process
                </Button>
            </Tooltip>
            {diagram}
        </>
    );
};
