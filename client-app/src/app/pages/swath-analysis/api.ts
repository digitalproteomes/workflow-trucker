import { BaseApi } from '../../infrastructure/api';
import { SwathAnalysis } from '../../types/types';
import { mockSwathAnalysis } from '../../default-data/samples';
import { Constants } from '../../default-data/constants';

export class Api {
    public static async getSwathAnalysisAsync(projectId: string): Promise<SwathAnalysis[]> {
        try {
            return Constants.useServerEndpoints
                ? await BaseApi.getAsync(`swathanalyses/project?projectId=${projectId}`)
                : mockSwathAnalysis();
        } catch (err) {
            return mockSwathAnalysis();
        }
    }

    public static async postAsync(msRun: SwathAnalysis): Promise<SwathAnalysis> {
        try {
            return await BaseApi.postAsync(`/swathanalyses`, msRun);
        } catch (error) {
            return mockSwathAnalysis()[0];
        }
    }
}
