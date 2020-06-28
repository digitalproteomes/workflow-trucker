import { BaseApi } from '../../infrastructure/api';
import { Msrun } from '../../types';
import { mockMsRun } from '../../default-data/samples';

export class Api {
    public static async getMsRunsAsync(projectId: number): Promise<Msrun[]> {
        try {
            return BaseApi.getAsync(`msrun`);
        } catch (err) {
            return mockMsRun();
        }
    }

    public static async postSampleAsync(name: string, projectId: number): Promise<Msrun> {
        try {
            return await BaseApi.postAsync(`/msrun`, { name, projectId });
        } catch (error) {
            return mockMsRun()[0];
        }
    }
}
