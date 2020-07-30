import { BaseApi } from '../../infrastructure/api';
import { MSReadySample } from '../../types';
import { mockMSReadySamples } from '../../default-data/samples';
import { Constants } from '../../default-data/constants';

export class Api {
    public static async fetchSamples(projectId: string): Promise<MSReadySample[]> {
        try {
            return Constants.useServerEndpoints
                ? await BaseApi.getAsync(`samples/intermediate/project?projectId=${projectId}`)
                : mockMSReadySamples();
        } catch (err) {
            return mockMSReadySamples();
        }
    }

    public static async postSampleAsync(payload: any): Promise<MSReadySample> {
        return await BaseApi.postAsync(`/samples/intermediate`, payload);
    }

    public static async deleteSampleAsync(entry: MSReadySample): Promise<void> {
        return await BaseApi.deleteAsync(`/samples?id=${entry.id}`);
    }
}