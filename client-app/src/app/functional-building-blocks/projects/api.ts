import { BaseApi } from '../../infrastructure/api';
import { Project } from '../../types';

export class Api {
    public static async fetchProjects(): Promise<Project[]> {
        try {
            return await BaseApi.getAsync<Project[]>(`projects/all`);
        } catch (err) {
            return [
                Project.default,
                {
                    description: 'Beta project',
                    id: '10a324d9457b878df257516c',
                    isLocked: false,
                    name: 'DRBD',
                    ownerName: 'Silvana Albert',
                    ownerORCID: '0000-0002-7820-9139',
                },
            ];
        }
    }

    public static async post(updated: Project): Promise<Project> {
        return await BaseApi.postAsync('projects', updated);
    }

    public static async put(updated: Project): Promise<Project> {
        return await BaseApi.putAsync('projects', updated);
    }
}
