import type { AxiosInstance } from "axios";
import axios from "axios";

export default abstract class AuthAware {
    axiosInstance: AxiosInstance

    // add the clientId: string to the constructor

    constructor(jwt: string) {
        this.axiosInstance = axios.create({
            baseURL: import.meta.env.VITE_REST_SERVER_URL,
            headers: {
                Authorization: `Bearer ${jwt}`,
                // 'x-client-id': `${clientId}`
            }
        })
    }
}