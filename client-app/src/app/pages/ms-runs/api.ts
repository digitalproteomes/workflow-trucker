import { BaseApi } from '../../infrastructure/api';
import { MsRun } from '../../types';
import { mockMsRun } from '../../default-data/samples';

export class Api {
    public static async getMsRunsAsync(_projectId: string): Promise<MsRun[]> {
        try {
            return BaseApi.getAsync(`msrun`);
        } catch (err) {
            return mockMsRun();
        }
    }

    public static async postAsync(msRun: MsRun): Promise<MsRun> {
        try {
            return await BaseApi.postAsync(`/msrun`, msRun);
        } catch (error) {
            return mockMsRun()[0];
        }
    }
}
