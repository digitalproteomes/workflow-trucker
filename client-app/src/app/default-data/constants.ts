import { BaseApi } from '../infrastructure/api';
import { Project } from '../types';

export class Constants {
    public static projectId: string = '5fba5f6a650bda00d27bbb9a';
    public static useServerEndpoints: boolean = true;

    public static async InitAsync(): Promise<void> {
        const projects = await this.fetchProjects();
        // wait - implement the project selection functionality, or user based default project functionality
        this.projectId = projects[0].id;
    }

    private static async fetchProjects(): Promise<Project[]> {
        try {
            return await BaseApi.getAsync<Project[]>(`projects/all`);
        } catch (err) {
            return [Project.default];
        }
    }
}
