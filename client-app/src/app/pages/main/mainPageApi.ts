import axios from 'axios';
import { Project, Sample } from '../../types';
import { Constants } from '../../default-data/constants';

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
                description: 'MMA Project',
                id: '5f2556e4a4ee2cea08d1b992',
                isLocked: false,
                name: 'MMA',
                ownerName: 'Patrick Pedrioli',
                ownerORCID: '0000-0001-6719-9139',
                projectId: Constants.projectId,
                updatedDate: '2020-05-08T13:46:32.067000+00:00',
            };
            // throw error;
        }
    }

    public static async getSamplesAsync(projectId: string): Promise<Sample[]> {
        try {
            const response = await axios.get(`/sample?projectId=${projectId}`);
            return response.data.samples;
        } catch (error) {
            return [];
        }
    }

    public static async getSamplesByProtocolIdAsync(projectId: string, protocolId: number): Promise<Sample[]> {
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
