import { BaseApi } from '../../infrastructure/api';
import { IntermediateSample } from '../../types';
import { mockIntermediateSamples } from '../../default-data/samples';
import { Constants } from '../../default-data/constants';

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

    public static async deleteSampleAsync(entry: IntermediateSample): Promise<void> {
        return await BaseApi.deleteAsync(`/samples?id=${entry.id}`);
    }
}
