import { ClinicalSampleCompact } from './clinicalSample';

export enum EWorkflowTag {
    Invalid = 'Invalid',
    SamplePreparation = 'Sample Preparation',
    SwathAnalysis = 'SWATHAnalysis',
    LibraryGeneration = 'Library Generation',
}

export enum ESOPType {
    sampleSOP = 'Standard Procedure Sample Preparation',
    msRunSOP = 'Standard Procedure Mass Spectrometry',
    dataSOP = 'Standard Procedure Data Analysis',
}

export enum EProtocolTag {
    Invalid = 'invalid tag',
    Single = 'single_preparation',
    Fractionation = 'fractionation_preparation',
    Pooling = 'pooling_preparation',
}

export class NewIntermediarySample {
    description: string = '';
    sopId: string = '';
    clinicalSampleId: string = '';
    processingPerson: string = '';
    workflowTag: string = '';

    public static nameof = (name: keyof NewIntermediarySample) => name;
}

export class IntermediateSample {
    clinicalSamples: ClinicalSampleCompact[] = [];

    createdDate: string = '';

    description: string = '';

    id: string = '';

    name: string = '';

    processingPerson: string = '';

    projectId: string = '';

    protocolName: EProtocolTag = EProtocolTag.Invalid;

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

    public static default: Project = {
        id: 'default project id',
        createdDate: '',
        description: '',
        isLocked: false,
        name: '',
        ownerName: '',
        ownerORCID: '',
        projectId: 'default project id',
        updatedDate: '',
    };
}

export class MsRun {
    clinicalSamples: ClinicalSampleCompact[] = [];

    createdDate: string = '';

    description: string = '';

    id: string = '';

    instrumentId: string = '';

    msReadySampleId: string = '';

    msReadySampleName: string = '';

    name: string = '';

    processingPerson: string = '';

    projectId: string = '';

    protocolId: string = '';

    runId: number = -1;

    updatedDate: string = '';

    workflowTag: EWorkflowTag = EWorkflowTag.Invalid;

    public static nameof = (name: keyof MsRun) => name;
}

export class MSRunCompact {
    id: string = '';

    name: string = '';

    public static nameof = (name: keyof MSRunCompact) => name;
}

export class SwathAnalysis {
    clinicalSamples: ClinicalSampleCompact[] = [];

    createdDate: string = '';

    description: string = '';

    id: string = '';

    name: string = '';

    spectralLibraryId: string = '';

    msRunIds: MSRunCompact[] = [];

    swathId: string = '';

    projectId: string = '';

    protocolId: string = '';

    protocolName: string = '';

    updatedDate: string = '';

    workflowTag: EWorkflowTag = EWorkflowTag.Invalid;

    public static nameof = (name: keyof SwathAnalysis) => name;
}

export class SpectralLibrary {
    clinicalSamples: ClinicalSampleCompact[] = [];

    createdDate: string = '';

    description: string = '';

    id: string = '';

    name: string = '';

    proteinDatabaseOrganism = '';

    proteinDatabaseVersion = '';

    msRunIds: MSRunCompact[] = [];

    libId: string = '';

    projectId: string = '';

    protocolId: string = '';

    protocolName: string = '';

    updatedDate: string = '';

    workflowTag: EWorkflowTag = EWorkflowTag.Invalid;

    public static nameof = (name: keyof SpectralLibrary) => name;
}

export class SOP {
    createdDate: string = '';

    description: string = '';

    id: string = '';

    name: string = '';

    sopFileName = '';

    encodedFileId = '';

    // projectId: string = '';

    artefactClass = '';

    processingPerson: string = '';

    owner = '';

    revision = '';

    updatedDate: string = '';

    public static nameof = (name: keyof SOP) => name;

    public static Default: SOP = {
        createdDate: '',
        description: '',
        encodedFileId: '',
        artefactClass: '',
        id: '',
        name: '',
        processingPerson: '',
        owner: '',
        revision: '',
        sopFileName: '',
        updatedDate: '',
    };
}
export const SOPDataKeys: string[] = Object.keys(new SOP());

export class GenerationData {
    prefixProject: string = '';

    suffixProject: string = '';

    description: string = '';

    workflowTag: string = '';

    numberOfEntries: number = 10;

    idSeed: number = 0; // plan - get this number from the backend. (already exists)

    public static nameof = (name: keyof GenerationData) => name;

    public static Default: GenerationData = {
        prefixProject: 'PHRT',
        suffixProject: 'CPAC',
        description: 'Zurich Hospital sample',
        workflowTag: EWorkflowTag.LibraryGeneration.toString(),
        numberOfEntries: 3,
        idSeed: 0,
    };
}

export const GenerationDataKeys: string[] = Object.keys(new GenerationData());
