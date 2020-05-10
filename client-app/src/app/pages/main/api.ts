import axios from 'axios';
import { Project, Sample } from './types';

class Api {
    public static readonly baseUrl = process.env.API_URL;

    public static init() {
        axios.defaults.baseURL = 'http://localhost:5000'; //Api.baseUrl;
        axios.defaults.headers.post['Content-Type'] = 'application/json';
    }

    public static async getProjectAsync(projectName: string): Promise<Project> {
        try {
            const response = await axios.get(`/project/${projectName}`);
            return response.data;
        } catch (error) {
            return {
                createdDate: 'test2020-05-08T13:46:32.067000+00:00',
                description: 'testMMA Project',
                id: 'test5eb562b8c65543aa9ac7e676',
                isLocked: false,
                name: 'CPACtest',
                ownerName: 'testPatrick Pedrioli',
                ownerORCID: 'test0000-0001-6719-9139',
                projectId: 5,
                updatedDate: 'test2020-05-08T13:46:32.067000+00:00',
            };
            // todo - show a toast directly, or set a global error, or...
            // throw error;
        }
    }

    public static async getSamplesAsync(projectId: number): Promise<Sample[]> {
        try {
            const response = await axios.get(`/sample?projectId=${projectId}`);
            // todo - the below thingy is not typed. I am returning the samples array from the response object.
            return response.data.samples;
        } catch (error) {
            return [
                {
                    id: '5eb562b8c65543aa9ac7e677',
                    name: 'PHRT_005_001_CPAC',
                    projectId: '5',
                    protocolId: 1,
                    protocolName: 'clinical_sample',
                    sampleId: 1,
                },
                {
                    id: '5eb562b8c65543aa9ac7e678',
                    name: 'PHRT_005_002_CPAC',
                    projectId: '5',
                    protocolId: 1,
                    protocolName: 'clinical_sample',
                    sampleId: 2,
                },
                {
                    id: '5eb562b8c65543aa9ac7e679',
                    name: 'PHRT_005_003_CPAC',
                    projectId: '5',
                    protocolId: 1,
                    protocolName: 'clinical_sample',
                    sampleId: 3,
                },
            ];
        }
    }

    public static async upsert(project: Project): Promise<void> {
        try {
            return axios.post('/projects', project);
        } catch (error) {
            // throw error;
            console.log(`on submit error: ${error}`);
        }
    }
}

Api.init();
export { Api };