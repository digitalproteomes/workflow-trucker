import { BaseApi } from '../../infrastructure/api';
import { MsReadyNew } from '../../types';

export class Api {
    public static async postMsReady(payload: MsReadyNew[]): Promise<MsReadyNew[]> {
        return await BaseApi.postAsync(`/samples/msready`, { samples: [...payload] });
    }
}
