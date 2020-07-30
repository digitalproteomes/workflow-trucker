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

export enum EWorkflowTag {
    Invalid = 'Invalid',
    SamplePreparation = 'Sample Preparation',
    SwathAnalysis = 'SWATHAnalysis',
    LibraryGeneration = 'Library Generation',
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

    workflowTag: EWorkflowTag = EWorkflowTag.Invalid;

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

    workflowTag: EWorkflowTag = EWorkflowTag.Invalid;

    public static nameof = (name: keyof IntermediateSample) => name;
}

export class MSReadySample {
    clinicalSamples: ClinicalSampleCompact[] = [];

    createdDate: string = '';

    description: string = '';

    id: string = '';

    intermediateSampleId: string = '';

    intermediateSampleName: string = '';

    name: string = '';

    processingPerson: string = '';

    projectId: string = '';

    updatedDate: string = '';

    workflowTag: EWorkflowTag = EWorkflowTag.Invalid;

    public static nameof = (name: keyof MSReadySample) => name;
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
    clinicalSamples: ClinicalSampleCompact[] = [];

    createdDate: string = '';

    description: string = '';

    id: string = '';

    instrumentId: string = '';

    msReadySampleId: string = '';

    name: string = '';

    processingPerson: string = '';

    projectId: string = '';

    protocolId: string = '';

    runId: number = -1;

    updatedDate: string = '';

    workflowTag: EWorkflowTag = EWorkflowTag.Invalid;

    public static nameof = (name: keyof MsRun) => name;
}

export class GenerationData {
    prefixProject: string = '';

    projectId: string = '-1';

    suffixProject: string = '';

    processingPerson: string = '';

    description: string = '';

    workflowTag: string = '';

    numberOfEntries: number = 10;

    public static nameof = (name: keyof GenerationData) => name;

    public static Default: GenerationData = {
        prefixProject: 'PHRT',
        projectId: '005', //Constants.projectId,
        suffixProject: 'CPAC',
        processingPerson: 'Admin',
        description: 'Zurich Hospital sample',
        workflowTag: EWorkflowTag.LibraryGeneration.toString(),
        numberOfEntries: 3,
    };
}

export const GenerationDataKeys: string[] = Object.keys(new GenerationData());
