
import axiosInstance from "../Interceptor/AxiosIntercepter";
const base_url = "http://localhost:8080/auth/"

const loginUser = async (login: any) => {
    return axiosInstance.post(`${base_url}login`, login)
        .then(res => res.data)
        .catch(error => { throw error; });

}

const navigateToLogin = (navigate: any) => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
}

export { loginUser };