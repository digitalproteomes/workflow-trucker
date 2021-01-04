import { BaseApi } from '../../infrastructure/api';
import { MsReadyNew, MSReadySample } from '../../types';
import { mockMSReadySamples } from '../../default-data/samples';
import { Constants } from '../../default-data/constants';

export class Api {
    public static async postMsReady(payload: MsReadyNew[]): Promise<MsReadyNew[]> {
        return await BaseApi.postAsync(`/samples/msready`, { samples: [...payload] });
    }

    public static async fetchSamples(projectId: string): Promise<MSReadySample[]> {
        try {
            return Constants.useServerEndpoints
                ? await BaseApi.getAsync(`samples/msready/project?projectId=${projectId}`)
                : mockMSReadySamples();
        } catch (err) {
            return mockMSReadySamples();
        }
    }
}
