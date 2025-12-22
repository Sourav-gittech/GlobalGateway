import axios from "axios";
import baseUrl_country, { baseUrl_embassy } from "../api_url/apiUrl";

const axiosInstance_country = axios.create({
    baseURL: baseUrl_country,
    headers: {
        "Content-Type": "application/json",
    },
})

const axiosInstance_embassy = axios.create({
    baseURL: baseUrl_embassy,
    timeout: 5000,
});

export default axiosInstance_country;
export { axiosInstance_embassy };