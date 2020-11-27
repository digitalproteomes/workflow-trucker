import React, { FunctionComponent } from 'react';
import createEngine, { DefaultLinkModel, DefaultNodeModel, DiagramModel } from '@projectstorm/react-diagrams';
import legend from '../../layouts/assets/legend.png';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { Layout } from 'antd';

let sampleJourney = {
    clinicalSampleName: 'PHRT_005_CPAC',
    intermediateSampleName: 'IS_PHRT_005_CPAC',
    msReadySampleName: 'MSR_IS_PHRT_005_CPAC',
    msRunName: 'PHRT_9_mmehnert_C2007_020',
    swathAnalysisName: 'PHRT_001_005_CPAC_SWATH',
    specLibName: 'PHRT_001_005_CPAC_LIB',
    outputProteinMatrixName: 'PHRT_005_Protein_Matrix.tsv',
    outputSpecLibName: 'PHRT_005_Spectral_Lib.xml',
    samplePrepSOP: 'PHRT_Sample_Preparation_SOP',
    MSPrepSOP: 'PHRT_Mass_Spectrometry_SOP',
    libGenSOP: 'PHRT_Lib_Gen_SOP',
    swathAnalysisSOP: 'PHRT_Data_Analysis_SOP',
};

export const Diagrams: FunctionComponent = () => {
    //1) setup the diagram engine
    var engine = createEngine();

    //2) setup the diagram model
    var model = new DiagramModel();

    // clinical sample part
    var node1 = new DefaultNodeModel({
        name: sampleJourney.clinicalSampleName,
        color: 'rgb(255,128,0)',
    });
    node1.setPosition(100, 100);
    let port1 = node1.addOutPort('Clinical Sample');

    // intermediate sample part
    var node2 = new DefaultNodeModel(sampleJourney.intermediateSampleName, 'rgb(255,128,0)');
    let port21 = node2.addInPort('Intermediate sample');
    let port22 = node2.addOutPort('');
    node2.setPosition(100, 300);

    // ms ready sample part
    var node3 = new DefaultNodeModel(sampleJourney.msReadySampleName, 'rgb(255,102,102)');
    let port31 = node3.addInPort('MS Ready sample');
    let port32 = node3.addOutPort('');
    node3.setPosition(400, 300);

    // ms run  part
    var node4 = new DefaultNodeModel(sampleJourney.msRunName, 'rgb(0,204,102)');
    let port41 = node4.addInPort('MS Run');
    let port42 = node4.addOutPort('');
    let port43 = node4.addOutPort('');
    node4.setPosition(800, 300);

    // spectral lib  part
    var node5 = new DefaultNodeModel(sampleJourney.specLibName, 'rgb(0,102,204)');
    let port51 = node5.addInPort('Spectral Library Generation');
    let port52 = node5.addOutPort('');
    let port53 = node5.addOutPort('');
    node5.setPosition(1200, 300);

    // swath  part
    var node6 = new DefaultNodeModel(sampleJourney.swathAnalysisName, 'rgb(0,102,204)');
    let port61 = node6.addInPort('SWATH Analysis');
    let port62 = node6.addInPort('');
    let port63 = node6.addOutPort('');
    node6.setPosition(1200, 500);

    // artefacts  part
    var node7 = new DefaultNodeModel(sampleJourney.outputSpecLibName, 'rgb(153,0,153)');
    let port71 = node7.addInPort('Generated Library');
    node7.setPosition(1500, 300);

    var node8 = new DefaultNodeModel(sampleJourney.outputProteinMatrixName, 'rgb(153,0,153)');
    let port81 = node8.addInPort('Output quantitative matrix');
    node8.setPosition(1500, 500);

    // link clinical to intermediate
    let link1 = port1.link<DefaultLinkModel>(port21);
    link1.addLabel(sampleJourney.samplePrepSOP);

    // link intermediate to ms ready
    let link2 = port22.link<DefaultLinkModel>(port31);

    // link ms ready to run
    let link3 = port32.link<DefaultLinkModel>(port41);
    link3.addLabel(sampleJourney.MSPrepSOP);

    // link ms run to spectra
    let link4 = port42.link<DefaultLinkModel>(port51);
    link4.addLabel(sampleJourney.libGenSOP);

    // link ms run to swath
    let link5 = port43.link<DefaultLinkModel>(port61);
    link5.addLabel(sampleJourney.swathAnalysisSOP);

    // link lib to swath
    let link6 = port52.link<DefaultLinkModel>(port62);
    link6.addLabel('uses');

    // link lib to output
    let link7 = port53.link<DefaultLinkModel>(port71);

    // link swath to output
    let link8 = port63.link<DefaultLinkModel>(port81);

    //4) add the models to the root graph
    model.addAll(
        node1,
        node2,
        node3,
        node4,
        node5,
        node6,
        node7,
        node8,
        link1,
        link2,
        link3,
        link4,
        link5,
        link6,
        link7,
        link8,
    );

    //5) load model into engine
    engine.setModel(model);

    //6) render the diagram!
    return (
        <Layout>
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
        </Layout>
    );

    // todo - explore the diagramming library and the available options at the below links
    // demo project https://github.com/projectstorm/react-diagrams/tree/c1485224bac4eddb057b7cef6f4b4945a63440c7/packages/diagrams-demo-project
    // demos https://github.com/projectstorm/react-diagrams/tree/master/packages/diagrams-demo-gallery/demos
    // main repo here https://github.com/projectstorm/react-diagrams
};
