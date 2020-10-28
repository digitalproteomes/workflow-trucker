import { BaseApi } from '../../infrastructure/api';
import { SOP } from '../../types';
import { mockSOP } from '../../default-data/samples';
import { Constants } from '../../default-data/constants';
import { RcFile } from 'antd/lib/upload';

export class Api {
    public static async getSOPsAsync(projectId: string): Promise<SOP[]> {
        try {
            return Constants.useServerEndpoints
                ? await BaseApi.getAsync(`sops/project?projectId=${projectId}`)
                : mockSOP();
        } catch (err) {
            return mockSOP();
        }
    }

    public static async postAsync(sop: any, file: RcFile): Promise<SOP> {
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('sop_data', sop);
            
            return await BaseApi.postAsync(`/file-upload`, formData);
        } catch (error) {
            return mockSOP()[0];
        }
    }
}
