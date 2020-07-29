import { BaseApi } from '../../infrastructure/api';
import { Sample } from '../../types';
import { mockSamples } from '../../default-data/samples';

export class Api {
    public static async fetchSamples(projectId: string): Promise<Sample[]> {
        try {
            return await BaseApi.getAsync(`samples/clinical/project?projectId=${projectId}`);
        } catch (err) {
            return mockSamples();
        }
    }

    public static async postSampleAsync(payload: any): Promise<Sample> {
        return await BaseApi.postAsync(`/samples/clinical`, payload);
    }

    public static async deleteSampleAsync(entry: Sample): Promise<void> {
        return await BaseApi.deleteAsync(`/samples?id=${entry.id}`);
    }
}
