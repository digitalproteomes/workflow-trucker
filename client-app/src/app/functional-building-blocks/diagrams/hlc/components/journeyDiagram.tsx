import React, { FunctionComponent, useEffect, useState } from 'react';
import createEngine, { DefaultLinkModel, DefaultNodeModel, DiagramModel } from '@projectstorm/react-diagrams';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { SampleJourney } from '../../../../types';
import { Api } from '../../api';
import legend from '../../../../layouts/assets/legend.png';

type Props = {
    sampleId: string;
};

export const JourneyDiagram: FunctionComponent<Props> = ({ sampleId }) => {
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
    var node1 = new DefaultNodeModel({
        name: 'sampleJourney.clinicalSampleName',
        color: 'rgb(255,128,0)',
    });
    node1.setPosition(100, 100);
    let port1 = node1.addOutPort('Clinical Sample');

    // intermediate sample part
    var node2 = new DefaultNodeModel('sampleJourney.intermediateSampleName', 'rgb(255,128,0)');
    let port21 = node2.addInPort('Intermediate sample');
    node2.setPosition(100, 300);
    // link clinical to intermediate
    let link1 = port1.link<DefaultLinkModel>(port21);
    link1.addLabel('sampleJourney.samplePrepSOP');

    //4) add the models to the root graph
    model.addAll(node1, node2, link1);

    //5) load model into engine
    engine.setModel(model);

    //6) render the diagram!
    return (
        <>
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
        </>
    );
};
