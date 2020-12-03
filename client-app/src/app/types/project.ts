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
        id: 'default project id', // todo - make sure we are using the valid project id (differentiate between Project.projectId and Project.id)
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
