import axios from 'axios';
import { Project } from './types';
import { AppStore } from '../../appStore';

class Api {
    public static readonly baseUrl = process.env.API_URL;

    public static init() {
        axios.defaults.baseURL = 'https://localhost:5001'; //Api.baseUrl;
        axios.defaults.headers.post['Content-Type'] = 'application/json';
    }

    public static async fetchProjectAsync(): Promise<void> {
        // todo move this as an action within the store?
        AppStore.project = await this.getAsync();
    }

    public static async getAsync(): Promise<Project> {
        try {
            const response = await axios.get('/projects');
            return response.data;
        } catch (error) {
            return {
                id: 'id',
                unit: 'unit 2',
                project_leader: {
                    ORCID: 'asd',
                    name: 'no server, so here a default',
                },
                sample: [
                    {
                        id: '1 sample id',
                        name: '1 sample name',
                        protocolId: '1 protocol id',
                        sample_ref: [{ sampleIdRef: '11 sample id ref' }],
                    },
                ],
            };
            // todo - show a toast directly, or set a global error, or...
            // throw error;
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
