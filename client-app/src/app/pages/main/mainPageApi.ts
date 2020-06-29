import axios from 'axios';
import { Project, Sample } from '../../types';

class MainPageApi {
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
            // throw error;
        }
    }

    public static async getSamplesAsync(projectId: number): Promise<Sample[]> {
        try {
            const response = await axios.get(`/sample?projectId=${projectId}`);
            return response.data.samples;
        } catch (error) {
            return [];
        }
    }

    public static async getSamplesByProtocolIdAsync(projectId: number, protocolId: number): Promise<Sample[]> {
        try {
            const response = await axios.get(`/sample/protocol?projectId=${projectId}&protocolId=${protocolId}`);
            return response.data.samples;
        } catch (error) {
            return [];
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

MainPageApi.init();
export { MainPageApi };
