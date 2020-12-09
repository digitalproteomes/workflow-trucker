import React, { FunctionComponent, useEffect, useState } from 'react';
import createEngine, {
    DefaultLinkModel,
    DefaultNodeModel,
    DefaultPortModel,
    DiagramModel,
} from '@projectstorm/react-diagrams';
import styled from '@emotion/styled';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { Link, SampleJourney } from '../../../../types';
import { Api } from '../../api';
import legend from '../../../../layouts/assets/legend.png';
import { Modal } from 'antd';

type Props = {
    sampleId: string;
    onClose: () => void;
};

// auto layout of nodes - dagre - https://github.com/projectstorm/react-diagrams/blob/655462087f1f54eccb5e75f024be00efda674eab/packages/diagrams-demo-gallery/demos/demo-dagre/index.tsx

export const JourneyDiagram: FunctionComponent<Props> = ({ sampleId, onClose }) => {
    const [sampleJourney, setSampleJourney] = useState<SampleJourney | null>(null);
    const [, setErrorMessage] = useState<string | null>(null);

    async function fetchJourney() {
        try {
            const data: SampleJourney = await Api.getJourneyAsync(sampleId);

            setSampleJourney(data);
        } catch (error) {
            setErrorMessage(error.message);
        }
    }

    useEffect(() => {
        if (sampleJourney == null) {
            fetchJourney();
        }
    });

    if (sampleJourney === null) return <></>;

    // the meat of the logic
    //1) setup the diagram engine
    var engine = createEngine();

    //2) setup the diagram model
    var model = new DiagramModel();

    // todo - create all the nodes and links
    // clinical sample part

    const clinicalSampleNodes: DefaultNodeModel[] = getClinicalSampleNodes(sampleJourney);
    const intermediateSampleNodes: DefaultNodeModel[] = getIntermediateSampleNodes(sampleJourney);

    const sourceClinicalSampleNode: DefaultNodeModel = clinicalSampleNodes[0];
    const sourceNodeName: string = sourceClinicalSampleNode.getOptions().name!;

    // intermediates for a clinical are all the links starting from the source clinical sample
    const clinicalIntermediateLinks: Link[] = sampleJourney.links.filter((link) => link.nodeStart === sourceNodeName);

    const outPort: DefaultPortModel = sourceClinicalSampleNode.addOutPort('Clinical sample');

    const clinicalIntermediateLinkModels: DefaultLinkModel[] = clinicalIntermediateLinks.map((link) => {
        const node: DefaultNodeModel = intermediateSampleNodes.filter((n) => n.getOptions().name! === link.nodeEnd)[0];

        const inPort: DefaultPortModel = node.addInPort('Intermediate sample');

        return outPort.link(inPort);
    });

    //4) add the models to the root graph
    // clinicalSampleNodes.forEach((node) => model.addNode(node));
    sourceClinicalSampleNode.setPosition(0, 0);
    model.addNode(sourceClinicalSampleNode);

    let y = 0;
    intermediateSampleNodes.forEach((node) => {
        node.setPosition(150, (y += 70));
        console.log('y', y);

        model.addNode(node);
    });

    clinicalIntermediateLinkModels.forEach((link) => model.addLink(link));

    //5) load model into engine
    engine.setModel(model);

    //6) render the diagram!
    return (
        <Modal width={1500} visible={true} centered onOk={() => onClose()} onCancel={() => onClose()}>
            <img
                src={legend}
                alt="legend"
                style={{
                    alignContent: 'center',
                    marginLeft: '23px',
                    paddingTop: '14px',
                    width: '300px',
                }}
            />
            <CanvasWidget className="canvas" engine={engine} />
        </Modal>
    );
};

function getClinicalSampleNodes(sampleJourney: SampleJourney): DefaultNodeModel[] {
    return sampleJourney.clinicalSampleNames.map((name: string) => {
        return new DefaultNodeModel({
            name,
            color: Constants.ClinicalSampleColor,
        });
    });
}

function getIntermediateSampleNodes(sampleJourney: SampleJourney): DefaultNodeModel[] {
    return sampleJourney.intermediateSampleNames.map(
        (name: string) =>
            new DefaultNodeModel({
                name,
                color: Constants.IntermediateSampleColor,
            }),
    );
}

class Constants {
    public static ClinicalSampleColor: string = 'rgb(255,128,0)';
    public static IntermediateSampleColor: string = 'rgb(255,128,0)';
    public static MsReadySampleColor: string = 'rgb(255,102,102)';
    public static MsRunColor: string = 'rgb(0,204,102)';
    public static SpectralLibColor: string = 'rgb(0,102,204)';
    public static SwathColor: string = 'rgb(0,102,204)';
    public static ArtefactColor: string = 'rgb(153,0,153)';
}

const Container = styled.div<{ color: string; background: string }>`
    height: 100%;
    background-color: ${(p) => p.background};
    background-size: 50px 50px;
    display: flex;
    > * {
        height: 100%;
        min-height: 100%;
        width: 100%;
    }
    background-image: linear-gradient(
            0deg,
            transparent 24%,
            ${(p) => p.color} 25%,
            ${(p) => p.color} 26%,
            transparent 27%,
            transparent 74%,
            ${(p) => p.color} 75%,
            ${(p) => p.color} 76%,
            transparent 77%,
            transparent
        ),
        linear-gradient(
            90deg,
            transparent 24%,
            ${(p) => p.color} 25%,
            ${(p) => p.color} 26%,
            transparent 27%,
            transparent 74%,
            ${(p) => p.color} 75%,
            ${(p) => p.color} 76%,
            transparent 77%,
            transparent
        );
`;

interface DemoCanvasWidgetProps {
    color?: string;
    background?: string;
    style?: React.CSSProperties | undefined;
    className?: string;
}

export class DemoCanvasWidget extends React.Component<DemoCanvasWidgetProps> {
    render() {
        return (
            <Container
                background={this.props.background || 'rgb(60, 60, 60)'}
                color={this.props.color || 'rgba(255,255,255, 0.05)'}
                style={this.props.style}
                className={this.props.className}
            >
                {this.props.children}
            </Container>
        );
    }
}
