import axios, { AxiosResponse } from "axios";

export const postLogin = async (email: string, password: string): Promise<AxiosResponse<any | any> | undefined> => {
    try {
        const data = await axios.post("http://localhost:5058/api/User/login", { email, password }, { headers: { "Content-Type": "application/json" } });
        return data;
    } catch (error) {
        return undefined;
    }
};
