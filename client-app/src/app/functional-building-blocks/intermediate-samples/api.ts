import { Constants } from '../../default-data/constants';
import { mockIntermediateSamples } from '../../default-data/samples';
import { BaseApi } from '../../infrastructure/api';
import { IntermediateSample } from '../../types';

export class Api {
    public static async fetchSamples(projectId: string): Promise<IntermediateSample[]> {
        try {
            return Constants.useServerEndpoints
                ? await BaseApi.getAsync(`samples/intermediate/project?projectId=${projectId}`)
                : mockIntermediateSamples();
        } catch (err) {
            return mockIntermediateSamples();
        }
    }

    public static async postSampleAsync(payload: any): Promise<IntermediateSample> {
        return await BaseApi.postAsync(`/samples/intermediate`, payload);
    }

    public static async postFractionatedAsync(payload: any): Promise<IntermediateSample[]> {
        return await BaseApi.postAsync(`/sample/fractionated`, payload);
    }

    public static async deleteSampleAsync(entry: IntermediateSample): Promise<void> {
        return await BaseApi.deleteAsync(`/samples?id=${entry.id}`);
    }
}
