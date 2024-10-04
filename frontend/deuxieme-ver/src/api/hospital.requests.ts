import axios, { AxiosError, AxiosResponse } from "axios";
import { HospitalRegister, pmedical, UserRegister, pnomedical } from "../utils/hospital";

export const getHospitals = async (): Promise<AxiosResponse<any | any> | AxiosError>=> {
    try {
        const data = await axios.get("http://localhost:5058/api/Hospital");
        return data;
    } catch (error: any) {
        return error;
    }
};

export const postHospital = async (hospitalData: HospitalRegister): Promise<AxiosResponse<any | any>> => {
    try {
        const data = await axios.post("http://localhost:5058/api/Hospital", { ...hospitalData }, { headers: { "Content-Type": "application/json" } });
        return data;
    } catch (error: any) {
        return error;
    }
}

export const postUser =  async (userData: UserRegister): Promise<AxiosResponse<any | any>> => {
    try {
        const data =  await axios.post("http://localhost:5058/api/User", { ...userData }, { headers: { "Content-Type": "application/json" } });
        return data;
    } catch (error: any) {
        return error;
    }
}

export const personelMdeical = async (pmedical: pmedical): Promise<AxiosResponse<any | any>> => {
    try {
        const data = await axios.post("http://localhost:5058/api/PMedical", { ...pmedical }, { headers: { "Content-Type": "application/json" } });
        return data;
    } catch (error: any) {
        return error;
    }
};

export const pnoMedical = async (pnomedical: pnomedical): Promise<AxiosResponse<any | any>> => {
    try {
        const data = await axios.post("http://localhost:5058/api/PNoMedical", { ...pnomedical }, { headers: { "Content-Type": "application/json" } });
        return data;
    } catch (error: any) {
        return error;
    }
};
