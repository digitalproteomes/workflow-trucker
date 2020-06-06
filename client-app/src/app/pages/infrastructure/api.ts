import axios from 'axios';

class BaseApi {
    public static readonly baseUrl = process.env.API_URL;

    public static init() {
        axios.defaults.baseURL = 'http://localhost:5000'; //Api.baseUrl;
        axios.defaults.headers.post['Content-Type'] = 'application/json';
    }

    public static async get<T>(path: string): Promise<T> {
        try {
            const response = await axios.get(`${path}`);
            return response.data;
        } catch (error) {
            console.log(error);

            // todo - show a popup probably
            throw error;
        }
    }

    // todo - not sure if the payload should be any or a specific type
    public static async post<T>(path: string, payload: any): Promise<T> {
        try {
            const response = await axios.post(`${path}`, payload);
            return response.data;
        } catch (error) {
            console.log(error);

            // todo - show a popup probably
            throw error;
        }
    }
}

BaseApi.init();
export { BaseApi };
