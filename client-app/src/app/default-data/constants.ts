import { Api } from '../functional-building-blocks/projects';

export class Constants {
    public static projectId: string = '5fba5f6a650bda00d27bbb9a';
    public static useServerEndpoints: boolean = true;
    public static personId: string = '';

    public static async InitAsync(): Promise<void> {
        const projects = await Api.fetchProjects();
        // wait - implement the project selection functionality, or user based default project functionality
        this.projectId = projects[0].id;

        // plan - get the currently logged in user id
        this.personId = 'current person id';
    }
}
