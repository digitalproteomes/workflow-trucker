export class Project {
    id: string = '';

    projectId: string = '';

    name: string = '';

    ownerName: string = '';

    ownerORCID: string = '';

    description: string = '';

    isLocked: boolean = false;

    public static nameof = (name: keyof Project) => name;

    public static default: Project = {
        id: 'default project id',
        projectId: '',
        description: '',
        isLocked: false,
        name: '',
        ownerName: '',
        ownerORCID: '',
    };
}
