import { UserRegister } from "../utils/hospital";
import axios, { AxiosResponse } from "axios";

export const postUser =  async (userData: UserRegister): Promise<AxiosResponse<any | any>> => {
    try {
        const data =  await axios.post("http://localhost:5058/api/User", { ...userData }, { headers: { "Content-Type": "application/json" } });
        return data;
    } catch (error: any) {
        return error;
    }
};
