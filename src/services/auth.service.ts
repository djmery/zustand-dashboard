
// Generated by https://quicktype.io

import { AxiosError } from "axios";
import { tesloApi } from "../api/tesloApi";

export interface LoginResponse {
    id: string;
    email: string;
    fullName: string;
    isActive: boolean;
    roles: string[];
    token: string;
}


export class AuthService {

    static login = async (email: string, password: string): Promise<LoginResponse> => {

        try {
            const { data } = await tesloApi.post<LoginResponse>('/auth/login', { email, password });
            console.log(data);
            return data;

        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.response?.data);
                throw new Error(error.response?.data);
            }
            console.log(error);
            throw new Error('Unable to login');
        }

    }

    static checkStatus = async (): Promise<LoginResponse> => {
        try {
            // el checkSatus hace una petición a este endpoint que sino tenemos ningun token va a dar un error
            //para enviar el token lo hacemos a través de los interceptores
            const { data } = await tesloApi.get<LoginResponse>('/auth/check-status');
            return data;

        } catch (error) {
            console.log(error);
            throw new Error('Unable to check status');
        }

    }
}