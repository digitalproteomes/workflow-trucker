import { BaseApi } from '../../infrastructure/api';
import { Sample } from '../../types';
import { mockSamples } from '../../default-data/samples';

export class Api {
    public static async getSamplesAsync(projectId: string): Promise<Sample[]> {
        try {
            return BaseApi.getAsync(`sample/pooled?projectId=${projectId}`);
        } catch (err) {
            return mockSamples();
        }
    }

    public static async postSampleAsync(name: string, projectId: string): Promise<Sample> {
        try {
            return await BaseApi.postAsync(`/sample/pooled`, { name, projectId });
        } catch (error) {
            return mockSamples()[0];
        }
    }
}
