import { BaseApi } from '../../infrastructure/api';
import { IntermediateSample } from '../../types';
import { mockIntermediateSamples } from '../../default-data/samples';

export class Api {
    public static async fetchSamples(projectId: string): Promise<IntermediateSample[]> {
        try {
            // return await BaseApi.getAsync(`samples/intermediate/project?projectId=${projectId}`);
            return mockIntermediateSamples();
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
