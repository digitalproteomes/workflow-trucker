export class Link {
    nodeStart: string = '';
    nodeEnd: string = '';
    label: string = '';
}

export class SampleJourney {
    clinicalSampleNames: string[] = [];
    intermediateSampleNames: string[] = [];
    msReadySampleNames: string[] = [];
    msRunNames: string[] = [];
    swathAnalysisNames: string[] = [];
    specLibNames: string[] = [];
    outputProteinMatrixNames: string[] = [];
    outputSpecLibNames: string[] = [];
    links: Link[] = [];
}
