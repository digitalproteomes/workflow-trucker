import { BaseApi } from '../../infrastructure/api';
import { Project } from '../../types';

export class Api {
    public static async fetchProjects(): Promise<Project[]> {
        try {
            return await BaseApi.getAsync<Project[]>(`projects/all`);
        } catch (err) {
            return [Project.default];
        }
    }
}
