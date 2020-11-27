import { BaseApi } from '../../infrastructure/api';
import { SpectralLibrary } from '../../types';
import { mockSpectralLibrary } from '../../default-data/samples';
import { Constants } from '../../default-data/constants';

export class Api {
    public static async getSpectralLibraryAsync(projectId: string): Promise<SpectralLibrary[]> {
        try {
            return Constants.useServerEndpoints
                ? await BaseApi.getAsync(`spectrallibraries/project?projectId=${projectId}`)
                : mockSpectralLibrary();
        } catch (err) {
            return mockSpectralLibrary();
        }
    }

    public static async postAsync(msRun: SpectralLibrary): Promise<SpectralLibrary> {
        try {
            return await BaseApi.postAsync(`/spectrallibraries`, msRun);
        } catch (error) {
            return mockSpectralLibrary()[0];
        }
    }
}
