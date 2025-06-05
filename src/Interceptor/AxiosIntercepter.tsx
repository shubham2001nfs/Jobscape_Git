import axios, { InternalAxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080"
});

axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export const setupResponseInterceptor = (navigate: any) => {
    axiosInstance.interceptors.response.use(
        (response) => {
            console.log("Inside normal response", response);  // Log the successful response
            return response;
        },
        (error) => {
            console.log("Inside error handler", error);
            // if (error.response?.status == 401) {
            //     console.log("401 Unauthorized error detected");
            //     navigate("/login");
            // }
            return Promise.reject(error);
        }
    );
}

export default axiosInstance;