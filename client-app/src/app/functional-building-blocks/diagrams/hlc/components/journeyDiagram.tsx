import React, { FunctionComponent, useEffect, useState } from 'react';
import createEngine, {
    DefaultLinkModel,
    DefaultNodeModel,
    DefaultPortModel,
    DiagramModel,
} from '@projectstorm/react-diagrams';
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
    // the meat of the logic
    //1) setup the diagram engine
    const [engine] = useState(createEngine());
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

    if (sampleJourney === null) return <></>;

    //2) setup the diagram model
    var model = new DiagramModel();

    //3) create all the nodes and links

    //4) add the models to the root graph

    const clinicalSampleNodes: DefaultNodeModel[] = getClinicalSampleNodes(sampleJourney);
    const sourceClinicalSampleNode: DefaultNodeModel = clinicalSampleNodes[0];
    sourceClinicalSampleNode.setPosition(0, 0);
    model.addAll(sourceClinicalSampleNode);

    const intermediateSampleNodes: DefaultNodeModel[] = getIntermediateSampleNodes(sampleJourney);
    model.addAll(...intermediateSampleNodes);

    const clinicalToIntermediateLinks: DefaultLinkModel[] = getClinicalToIntermediateSampleLinks(
        sampleJourney,
        sourceClinicalSampleNode,
        intermediateSampleNodes,
    );
    model.addAll(...clinicalToIntermediateLinks);

    const {
        msReadyNodes,
        intermediateToMsReadyLinks,
    }: { msReadyNodes: DefaultNodeModel[]; intermediateToMsReadyLinks: DefaultLinkModel[] } = getMsReadyRelatedModels(
        intermediateSampleNodes,
        sampleJourney,
    );

    model.addAll(...msReadyNodes, ...intermediateToMsReadyLinks);

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

function getMsReadyRelatedModels(intermediateSampleNodes: DefaultNodeModel[], sampleJourney: SampleJourney) {
    let y = 0;
    const msReadyNodes: DefaultNodeModel[] = [];
    const intermediateToMsReadyLinks: DefaultLinkModel[] = [];

    intermediateSampleNodes.forEach((node) => {
        const name: string = node.getOptions().name!;
        const links: Link[] = sampleJourney.links.filter((link) => link.nodeStart === name);
        const outPort: DefaultPortModel = node.addOutPort('');

        links.forEach((link) => {
            const msReadyNode: DefaultNodeModel = new DefaultNodeModel({
                name: link.nodeEnd,
                color: Constants.MsReadySampleColor,
            });
            msReadyNode.setPosition(Constants.MsReadyOffsetX, (y += Constants.NodeOffsetY));

            const inPort: DefaultPortModel = msReadyNode.addInPort('MsReady');
            const linkNode: DefaultLinkModel = outPort.link(inPort);

            msReadyNodes.push(msReadyNode);
            intermediateToMsReadyLinks.push(linkNode);
            // model.addAll(msReadyNode, linkNode);
        });
    });
    return { msReadyNodes, intermediateToMsReadyLinks };
}

function getClinicalSampleNodes(sampleJourney: SampleJourney): DefaultNodeModel[] {
    return sampleJourney.clinicalSampleNames.map((name: string) => {
        return new DefaultNodeModel({
            name,
            color: Constants.ClinicalSampleColor,
        });
    });
}

function getIntermediateSampleNodes(sampleJourney: SampleJourney): DefaultNodeModel[] {
    let y = 0;

    return sampleJourney.intermediateSampleNames.map((name: string) => {
        const node: DefaultNodeModel = new DefaultNodeModel({
            name,
            color: Constants.IntermediateSampleColor,
        });
        node.setPosition(Constants.IntermediateOffsetX, (y += Constants.NodeOffsetY));

        return node;
    });
}

function getClinicalToIntermediateSampleLinks(
    sampleJourney: SampleJourney,
    sourceClinicalSampleNode: DefaultNodeModel,
    intermediateSampleNodes: DefaultNodeModel[],
): DefaultLinkModel[] {
    const sourceNodeName: string = sourceClinicalSampleNode.getOptions().name!;

    // intermediates for a clinical are all the links starting from the source clinical sample
    const clinicalIntermediateLinks: Link[] = sampleJourney.links.filter((link) => link.nodeStart === sourceNodeName);

    const outPort: DefaultPortModel = sourceClinicalSampleNode.addOutPort('Clinical sample');

    const clinicalIntermediateLinkModels: DefaultLinkModel[] = clinicalIntermediateLinks.map((link) => {
        const node: DefaultNodeModel = intermediateSampleNodes.filter((n) => n.getOptions().name! === link.nodeEnd)[0];

        const inPort: DefaultPortModel = node.addInPort('Intermediate sample');

        return outPort.link(inPort);
    });

    return clinicalIntermediateLinkModels;
}

class Constants {
    public static ClinicalSampleColor: string = 'rgb(255,128,0)';
    public static IntermediateSampleColor: string = 'rgb(255,128,0)';
    public static MsReadySampleColor: string = 'rgb(255,102,102)';
    public static MsRunColor: string = 'rgb(0,204,102)';
    public static SpectralLibColor: string = 'rgb(0,102,204)';
    public static SwathColor: string = 'rgb(0,102,204)';
    public static ArtefactColor: string = 'rgb(153,0,153)';

    public static NodeOffsetY: number = 70;
    public static IntermediateOffsetX: number = 150;
    public static MsReadyOffsetX: number = 450;
}
