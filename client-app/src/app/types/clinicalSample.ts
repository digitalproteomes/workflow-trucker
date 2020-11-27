import { EWorkflowTag } from './types';

export class ClinicalSampleNew {
    name: string = '';

    clinicalSampleCode: string = '';

    description: string = '';

    // field populated with contextual data
    projectId: string = '';

    // field populated with contextual data
    processingPerson: string = '';

    workflowTag: string = '';

    // plan - add the quality field when the sample is generated/created. // poor, good, excellent. to be selected from a dropdown. the value for now is a string (not an id)
    quality: string = '';

    public static nameof = (name: keyof ClinicalSampleNew) => name;
}

export class ClinicalSample {
    name: string = '';

    clinicalSampleCode: number = -1;

    description: string = '';

    processingPerson: string = '';

    workflowTag: EWorkflowTag = EWorkflowTag.Invalid;

    projectId: string = '';

    quality: string = '';

    // auto generated id
    id: string = '';

    createdDate: string = '';

    updatedDate: string = '';

    public static nameof = (name: keyof ClinicalSample) => name;
}

export class ClinicalSampleCompact {
    id: string = '';

    name: string = '';

    public static nameof = (name: keyof ClinicalSampleCompact) => name;
}
