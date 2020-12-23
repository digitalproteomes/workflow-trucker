export class Project {
    id: string = '';

    name: string = '';

    ownerName: string = '';

    ownerORCID: string = '';

    description: string = '';

    isLocked: boolean = false;

    public static nameof = (name: keyof Project) => name;

    public static default: Project = {
        id: 'default project id',
        description: '',
        isLocked: false,
        name: '',
        ownerName: '',
        ownerORCID: '',
    };
}
