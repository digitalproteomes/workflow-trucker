import { BaseApi } from '../../infrastructure/api';
import { ClinicalSample } from '../../types';
import { mockClinicalSamples } from '../../default-data/samples';
import { Constants } from '../../default-data/constants';

export class Api {
    public static async fetchSamples(projectId: string): Promise<ClinicalSample[]> {
        try {
            return Constants.useServerEndpoints
                ? await BaseApi.getAsync(`samples/clinical/project?projectId=${projectId}`)
                : mockClinicalSamples();
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
