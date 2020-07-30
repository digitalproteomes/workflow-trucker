/** todo - deprecated - remove completely once no more references to this */
export class Sample {
    createdDate: string = '';

    id: string = '';

    name: string = '';

    parentSampleId: string = '';

    projectId: string = '';

    protocolId: number = -1;

    protocolName: string = '';

    sourceSampleId: number = -1;

    updatedDate: string = '';

    public static nameof = (name: keyof Sample) => name;
}

export class SampleNew {
    name: string = '';

    parentSampleId: string = '';

    projectId: string = '';

    protocolId: number = -1;

    /** shown on the ui as Id, it's actually a mock placeholder for the superficial identification of the samples coming in from the hospital */
    sourceSampleId: number = -1;

    /** not sure shy this has to be on this sample. How come it is not present on the sample coming from the backend? */
    processingPerson: string = '';

    public static nameof = (name: keyof SampleNew) => name;
}

export class ClinicalSample {
    createdDate: string = '';

    description: string = '';

    id: string = '';

    name: string = '';

    processingPerson: string = '';

    projectId: string = '';

    sourceSampleId: number = -1;

    updatedDate: string = '';

    workflowTag: string = '';

    public static nameof = (name: keyof ClinicalSample) => name;
}

export class ClinicalSampleCompact {
    id: string = '';

    name: string = '';

    public static nameof = (name: keyof ClinicalSampleCompact) => name;
}

export class IntermediateSample {
    clinicalSamples: ClinicalSampleCompact[] = [];

    createdDate: string = '';

    description: string = '';

    id: string = '';

    name: string = '';

    processingPerson: string = '';

    projectId: string = '';

    protocolName: string = '';

    updatedDate: string = '';

    workflowTag: string = '';

    public static nameof = (name: keyof IntermediateSample) => name;
}

export class Project {
    id: string = '';

    description: string = '';

    createdDate: string = '';

    isLocked: boolean = false;

    name: string = '';

    ownerName: string = '';

    ownerORCID: string = '';

    projectId: string = '';

    updatedDate: string = '';

    public static nameof = (name: keyof Project) => name;
}

export class MsRun {
    createdDate: string = '';

    id: string = '';

    name: string = '';

    projectId: string = '';

    protocolId: string = '';

    instrumentId: string = '';

    runCode: string = '';

    samples: string[] = [];

    updatedDate: string = '';

    public static nameof = (name: keyof MsRun) => name;
}

export class GenerationData {
    prefixProject: string = '';
    projectId: string = '-1';
    suffixProject: string = '';

    processingPerson: string = '';

    numberOfEntries: number = 10;

    public static nameof = (name: keyof GenerationData) => name;
}

export const GenerationDataKeys: string[] = Object.keys(new GenerationData());
