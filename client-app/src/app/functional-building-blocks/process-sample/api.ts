import { BaseApi } from '../../infrastructure/api';
import { SOP } from '../../types';

export class Api {
    public static async getSOPsAsync(projectId: string): Promise<SOP[]> {
        try {
            return await BaseApi.getAsync(
                `/sops/project/type?projectId=${projectId}&sopType=Standard Procedure Sample Preparation`,
            );
        } catch (err) {
            return [];
        }
    }
}
