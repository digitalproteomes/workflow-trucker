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

export class Project {
    id: string = '';

    description: string = '';

    createdDate: string = '';

    isLocked: boolean = false;

    name: string = '';

    ownerName: string = '';

    ownerORCID: string = '';

    projectId: number = -1;

    updatedDate: string = '';

    public static nameof = (name: keyof Project) => name;
}
