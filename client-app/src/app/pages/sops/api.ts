import { BaseApi } from '../../infrastructure/api';
import { SOP } from '../../types';
import { mockSOP } from '../../default-data/samples';
import { Constants } from '../../default-data/constants';
import { RcFile } from 'antd/lib/upload';

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

    public static async postAsync(sop: any, file: RcFile, projectId: string): Promise<SOP> {
        try {
            const formData = new FormData();
            // todo - figure out where should we set the sop project id
            sop.projectId = projectId;
            formData.append('file', file);
            formData.append('sop_data', sop);
            console.log('sop data in api', sop);
            console.log('sop form data in api', formData)

            return await BaseApi.postAsync(`/file-upload`, formData);
        } catch (error) {
            return mockSOP()[0];
        }
    }
}
