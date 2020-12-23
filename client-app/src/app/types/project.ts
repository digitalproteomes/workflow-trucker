export class Project {
    projectId: string = '';

    name: string = '';

    ownerName: string = '';

    ownerORCID: string = '';

    description: string = '';

    isLocked: boolean = false;

    public static nameof = (name: keyof Project) => name;

    public static default: Project = {
        projectId: 'default project id',
        description: '',
        isLocked: false,
        name: '',
        ownerName: '',
        ownerORCID: '',
    };
}
