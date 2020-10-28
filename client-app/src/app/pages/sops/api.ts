import { BaseApi } from '../../infrastructure/api';
import { SOP } from '../../types';
import { mockSOP } from '../../default-data/samples';
import { Constants } from '../../default-data/constants';

export class Api {
    public static async getSOPsAsync(projectId: string): Promise<SOP[]> {
        try {
            return Constants.useServerEndpoints
                ? await BaseApi.getAsync(`/sops/project?projectId=${projectId}`)
                : mockSOP();
        } catch (err) {
            return mockSOP();
        }
    }

    public static getDownloadLink(artefactName: string) {
        return `${BaseApi.baseUrl}/download/artefact?artefactName=${artefactName}`;
    } 


    public static async postAsync(sop: SOP): Promise<SOP> {
        try {
            return await BaseApi.postAsync(`/sops`, SOP);
        } catch (error) {
            return mockSOP()[0];
        }
    }
}
