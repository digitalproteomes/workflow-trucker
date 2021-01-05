import { Api } from '../functional-building-blocks/projects';
import { Project } from '../types';

export class Constants {
    public static useServerEndpoints: boolean = true;

    public static projects: Project[] = [];
    public static activeProject: Project = Project.default;

    public static projectId: string = '';
    public static displayProjectId: string = '';
    public static projectName: string = '';

    public static personId: string = '';
    public static personName: string = '';

    public static async InitAsync(): Promise<void> {
        this.projects = await Api.fetchProjects();

        this.setActiveProject(this.projects[0]);
    }

    static setActiveProject(newActiveProject: Project) {
        this.activeProject = newActiveProject;

        this.projectId = this.activeProject.id;
        this.displayProjectId = this.activeProject.projectId;
        this.projectName = this.activeProject.name;

        // todo - wait - plan- get the currently logged in user id
        this.personId = 'silalbert';
        this.personName = this.activeProject.ownerName;
    }
}
