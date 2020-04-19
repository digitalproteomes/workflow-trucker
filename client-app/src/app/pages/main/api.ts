import axios from 'axios';
import { Project } from './types';

class Api {
    public static readonly baseUrl = process.env.API_URL;

    public static init() {
        axios.defaults.baseURL = 'https://localhost:5001'; //Api.baseUrl;
        axios.defaults.headers.post['Content-Type'] = 'application/json';
    }

    public static async list(): Promise<Project[]> {
        try {
            const response = await axios.get('/projects');
            return response.data;
        } catch (error) {
            // todo - show a toast directly, or set a global error, or...
            throw error;
        }
    }

    public static async upsert(project: Project): Promise<void> {
        try {
            return axios.post('/projects', project);
        } catch (error) {
            throw error;
        }
    }
}

Api.init();
export default Api;
