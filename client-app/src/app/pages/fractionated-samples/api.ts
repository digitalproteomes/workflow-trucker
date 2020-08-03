import { BaseApi } from '../../infrastructure/api';
import { Sample } from '../../types';
import { mockSamples } from '../../default-data/samples';

export class Api {
    public static async getSamplesAsync(projectId: string): Promise<Sample[]> {
        try {
            return BaseApi.getAsync(`sample/fractionated?projectId=${projectId}`);
        } catch (err) {
            return mockSamples();
        }
    }

    public static async getSampleAsync(sampleId: string): Promise<Sample> {
        try {
            return BaseApi.getAsync(`sample/clinical/id?id=${sampleId}`);
        } catch (err) {
            return mockSamples()[0];
        }
    }

    public static async getSamplesByParentAsync(projectId: string, parentId: string): Promise<Sample[]> {
        try {
            return BaseApi.getAsync(`sample/fractionated/parent?projectId=${projectId}&parentId=${parentId}`);
        } catch (err) {
            return mockSamples();
        }
    }

    public static async postSampleAsync(name: string, projectId: string): Promise<Sample> {
        try {
            return await BaseApi.postAsync(`/sample/fractionated`, { name, projectId });
        } catch (error) {
            return mockSamples()[0];
        }
    }
}
