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
    var diagramModel = new DiagramModel();

    //3) create all the nodes and links

    //4) add the models to the root graph

    let modelDataArray: ModelData[] = [];

    modelDataArray = modelDataArray.concat(
        getModels(diagramModel, 'Clinical sample', sampleJourney.clinicalSampleNames, 0, Constants.ClinicalSampleColor),
    );

    modelDataArray = modelDataArray.concat(
        getModels(
            diagramModel,
            'Intermediate sample',
            sampleJourney.intermediateSampleNames,
            Constants.IntermediateOffsetX,
            Constants.IntermediateSampleColor,
        ),
    );

    modelDataArray = modelDataArray.concat(
        getModels(
            diagramModel,
            'MsReady sample',
            sampleJourney.msReadySampleNames,
            Constants.MsReadyOffsetX,
            Constants.MsReadySampleColor,
        ),
    );

    modelDataArray = modelDataArray.concat(
        getModels(diagramModel, 'Ms Runs', sampleJourney.msRunNames, Constants.MsRunOffsetX, Constants.MsRunColor),
    );

    const swathModels = getModels(
        diagramModel,
        'Swath',
        sampleJourney.swathAnalysisNames,
        Constants.SwathOffsetX,
        Constants.SwathColor,
    );
    modelDataArray = modelDataArray.concat(swathModels);

    const libOffsetY = swathModels.length * Constants.NodeOffsetY;
    modelDataArray = modelDataArray.concat(
        getModels(
            diagramModel,
            'Lib',
            sampleJourney.specLibNames,
            Constants.LibOffsetX,
            Constants.SpectralLibColor,
            libOffsetY,
        ),
    );

    const matrixModels = getModels(
        diagramModel,
        'Matrix',
        sampleJourney.outputProteinMatrixNames,
        Constants.OutMatrixOffsetX,
        Constants.ArtefactColor,
    );
    modelDataArray = modelDataArray.concat(matrixModels);

    const spectralOffsetY = matrixModels.length * Constants.NodeOffsetY;
    modelDataArray = modelDataArray.concat(
        getModels(
            diagramModel,
            'Spectral library',
            sampleJourney.outputSpecLibNames,
            Constants.OutLibOffsetX,
            Constants.ArtefactColor,
            spectralOffsetY,
        ),
    );

    sampleJourney.links.forEach((link: Link) => {
        const source: ModelData = modelDataArray[modelDataArray.findIndex((data) => data.name === link.nodeStart)];
        const target: ModelData = modelDataArray[modelDataArray.findIndex((data) => data.name === link.nodeEnd)];

        console.log('source target link', source, target, link);
        if (source === undefined || target === undefined) return;

        const linkModel: DefaultLinkModel = source.outPort.link(target.inPort);

        if (link.label !== '') linkModel.addLabel(link.label);

        diagramModel.addLink(linkModel);
    });

    //5) load model into engine
    engine.setModel(diagramModel);

    //6) render the diagram!
    return (
        <Modal width={1650} visible={true} centered onOk={() => onClose()} onCancel={() => onClose()}>
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

function getModels(
    diagramModel: DiagramModel,
    modelName: string,
    samples: string[],
    offsetX: number,
    color: string,
    offsetY: number = 0,
): ModelData[] {
    let y = offsetY;

    return samples.map((name: string) => {
        const node: DefaultNodeModel = new DefaultNodeModel({
            name,
            color,
        });
        node.setPosition(offsetX, (y += Constants.NodeOffsetY));

        const inPort: DefaultPortModel = node.addInPort(modelName);
        const outPort: DefaultPortModel = node.addOutPort('');

        diagramModel.addNode(node);

        return { node, inPort, outPort, name };
    });
}

interface ModelData {
    node: DefaultNodeModel;
    inPort: DefaultPortModel;
    outPort: DefaultPortModel;
    name: string;
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
    public static MsRunOffsetX: number = 750;
    public static SwathOffsetX: number = 1050;
    public static LibOffsetX: number = 1050;
    public static OutMatrixOffsetX: number = 1350;
    public static OutLibOffsetX: number = 1350;
}
