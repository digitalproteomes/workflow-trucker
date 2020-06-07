import { BaseApi } from '../../infrastructure/api';
import { Sample } from '../../types';
import { mockSamples } from '../../default-data/samples';

export class Api {
    public static async fetchSamples(projectId: number): Promise<Sample[]> {
        try {
            return BaseApi.getAsync(`sample/clinical?projectId=${projectId}`);
        } catch (err) {
            return mockSamples();
        }
    }

    public static async postSampleAsync(payload: any): Promise<Sample> {
        return await BaseApi.postAsync(`/sample/clinical`, payload);
    }

    public static async deleteSampleAsync(entry: Sample): Promise<void> {
        return await BaseApi.deleteAsync(`/sample?id=${entry.id}`);
    }
}
