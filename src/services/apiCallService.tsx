import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/api/";

const getMethod = (endpoint:string) => {
    axios.get(baseURL + endpoint).then((data: any) => {
        console.log(data);
    }).catch((error:any) => {
        console.error(error);
    })
    
}

const postMethod = (endpoint:string, payload: Object) => {
    axios.post(baseURL + endpoint, payload).then((data: any) => {
        console.log(data);
    }).catch((error:any) => {
        console.error(error);
    })
}

export {getMethod, postMethod};