import { BaseApi } from '../../infrastructure/api';
import { ClinicalSample } from '../../types';
import { mockClinicalSamples } from '../../default-data/samples';

export class Api {
    public static async fetchSamples(projectId: string): Promise<ClinicalSample[]> {
        try {
            return await BaseApi.getAsync(`samples/clinical/project?projectId=${projectId}`);
        } catch (err) {
            return mockClinicalSamples();
        }
    }

    public static async postSampleAsync(payload: any): Promise<ClinicalSample> {
        return await BaseApi.postAsync(`/samples/clinical`, payload);
    }

    public static async deleteSampleAsync(entry: ClinicalSample): Promise<void> {
        return await BaseApi.deleteAsync(`/samples?id=${entry.id}`);
    }
}
