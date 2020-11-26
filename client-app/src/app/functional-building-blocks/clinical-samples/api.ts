import { Constants } from '../../default-data/constants';
import { mockClinicalSamples } from '../../default-data/samples';
import { BaseApi } from '../../infrastructure/api';
import { ClinicalSample } from '../../types';

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
        //TODO: not sure if BE has an endpoint for creating individual clinical samples
        return await BaseApi.postAsync(`/samples/clinical`, payload);
    }

    public static async deleteSampleAsync(entry: ClinicalSample): Promise<void> {
        return await BaseApi.deleteAsync(`/samples?id=${entry.id}`);
    }
}
