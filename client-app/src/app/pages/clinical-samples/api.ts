import { BaseApi } from '../../infrastructure/api';
import { Sample } from '../../types';
import { mockSamples } from '../../default-data/samples';

export class Api {
    public static async getClinicalSamples(projectId: number): Promise<Sample[]> {
        try {
            return BaseApi.get(`sample/clinical?projectId=${projectId}`);
        } catch (err) {
            return mockSamples();
        }
    }

    public static async postClinicalSampleAsync(name: string, projectId: number): Promise<Sample> {
        try {
            return await BaseApi.post(`/sample/clinical`, { name, projectId });
        } catch (error) {
            return mockSamples()[0];
        }
    }
}
