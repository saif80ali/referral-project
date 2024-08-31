import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api/";

const getMethod = (endpoint:string) => {
    return axios.get(baseURL + endpoint);
}

const postMethod = (endpoint:string, payload: Object) => {
    return axios.post(baseURL + endpoint, payload);
}

export {getMethod, postMethod};