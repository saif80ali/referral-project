import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const getMethod = (endpoint:string) => {
    return axios.get(baseURL + "/api/" + endpoint, {
        headers: {
          'auth-token': localStorage.getItem('token'),
        }
      });
}

const postMethod = (endpoint:string, payload: Object) => {
    return axios.post(baseURL + endpoint, payload, {
        headers: {
            'auth-token': localStorage.getItem('token'),
        }
    });
}

const putMethod = (endpoint:string, payload: Object) => {
    return axios.put(baseURL + endpoint, payload, {
        headers: {
            'auth-token': localStorage.getItem('token'),
        }
    });
}

const deleteMethod = (endpoint:string) => {
    return axios.delete(baseURL + endpoint, {
        headers: {
            'auth-token': localStorage.getItem('token'),
        }
    });
}

export {getMethod, postMethod, putMethod, deleteMethod};