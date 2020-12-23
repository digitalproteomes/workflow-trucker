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
                    createdDate: '2020-12-03T19:38:17.905000+00:00',
                    description: 'Beta project',
                    projectId: '10a324d9457b878df257516c',
                    isLocked: false,
                    name: 'DRBD',
                    ownerName: 'Silvana Albert',
                    ownerORCID: '0000-0002-7820-9139',
                    updatedDate: '2020-12-03T19:38:17.905000+00:00',
                },
            ];
        }
    }
}
