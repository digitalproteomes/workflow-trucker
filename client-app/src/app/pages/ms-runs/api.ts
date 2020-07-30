import { BaseApi } from '../../infrastructure/api';
import { MsRun } from '../../types';
import { mockMsRun as mockMsRuns } from '../../default-data/samples';

export class Api {
    public static async getMsRunsAsync(projectId: string): Promise<MsRun[]> {
        try {
            return BaseApi.getAsync(`msruns/project?projectId=${projectId}`);
        } catch (err) {
            return mockMsRuns();
        }
    }

    public static async postAsync(msRun: MsRun): Promise<MsRun> {
        try {
            return await BaseApi.postAsync(`/msrun`, msRun);
        } catch (error) {
            return mockMsRuns()[0];
        }
    }
}
