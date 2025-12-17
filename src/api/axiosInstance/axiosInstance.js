import axios from "axios";
import baseUrl from "../api_url/apiUrl";

const axiosInstance = axios.create({
    baseURL: baseUrl,
     headers: {
        "Content-Type": "application/json",
    },
})

export default axiosInstance;