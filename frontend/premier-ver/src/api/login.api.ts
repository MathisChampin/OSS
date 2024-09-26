import axios from "axios";

export interface LoginPost {
    email: string;
    password: string;
}

export const loginPost = async ({ email, password }: LoginPost) => {
    const response = await axios.post("add future api", { email, password });
    return response;
};
