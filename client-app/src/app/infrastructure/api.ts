import axios from 'axios';

class BaseApi {
    public static readonly baseUrl = process.env.API_URL;

    public static init() {
        axios.defaults.baseURL = 'http://localhost:5000'; //Api.baseUrl;
        axios.defaults.headers.post['Content-Type'] = 'application/json';
    }

    public static async get<T>(path: string): Promise<T> {
        try {
            this.logCall(path);

            const response = await axios.get(`${path}`);
            return response.data;
        } catch (err) {
            BaseApi.logError(err);
            throw err;
        }
    }

    public static async post<T>(path: string, payload: any): Promise<T> {
        try {
            this.logCall(path, payload);

            const response = await axios.post(`${path}`, payload);
            return response.data;
        } catch (err) {
            BaseApi.logError(err);
            throw err;
        }
    }

    private static logCall(path: string, payload?: any) {
        console.log(`call is being made to ${path}`);
        if (payload) {
            console.log(payload);
        }
    }

    private static logError(err: any) {
        // todo - show a popup probably

        console.log(err);
        if (err.response) {
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
        }
    }
}

BaseApi.init();
export { BaseApi };
