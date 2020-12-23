export class Project {
    projectId: string = '';

    description: string = '';

    createdDate: string = '';

    isLocked: boolean = false;

    name: string = '';

    ownerName: string = '';

    ownerORCID: string = '';

    updatedDate: string = '';

    public static nameof = (name: keyof Project) => name;

    public static default: Project = {
        projectId: 'default project id',
        createdDate: '',
        description: '',
        isLocked: false,
        name: '',
        ownerName: '',
        ownerORCID: '',
        updatedDate: '',
    };
}
