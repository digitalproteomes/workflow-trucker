import { BaseApi } from '../../infrastructure/api';
import { Sample } from '../../types';
import { mockSamples } from '../../default-data/samples';

export class Api {
    public static async getSamplesAsync(projectId: number): Promise<Sample[]> {
        try {
            return BaseApi.get(`sample/individual?projectId=${projectId}`);
        } catch (err) {
            return mockSamples();
        }
    }

    public static async postSampleAsync(name: string, projectId: number): Promise<Sample> {
        try {
            return await BaseApi.post(`/sample/individual`, { name, projectId });
        } catch (error) {
            return mockSamples()[0];
        }
    }
}
