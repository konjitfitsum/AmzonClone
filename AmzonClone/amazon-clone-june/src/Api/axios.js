import axios from "axios";

 const axiosInstance = axios.create({
    // baseURL: "http://127.0.0.1:5001/clone-c6360/us-central1/api",

    baseURL: "https://api-ado2rnrleq-uc.a.run.app/",
});

export { axiosInstance }; 