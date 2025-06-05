import axiosInstance from "../Interceptor/AxiosIntercepter";


const getProfile = async (id: any) => {
    return axiosInstance.get(`/profiles/getProfile/${id}`)
        .then(res => res.data)
        .catch(error => { throw error; });
}

const updateProfile = async (profile: any) => {
    return axiosInstance.put(`/profiles/updateProfile`, profile)
        .then(res => res.data)
        .catch(error => { throw error; });
};

const getAll = async () => {
    return axiosInstance.get(`/profiles/getAll`)
        .then(res => res.data)
        .catch(error => { throw error; });
};

export { getProfile, updateProfile, getAll };