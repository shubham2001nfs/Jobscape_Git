import axiosInstance from "../Interceptor/AxiosIntercepter";


const getAllNotifications = async (id: any) => {
    return axiosInstance.get(`/notifications/getAll/${id}`)
        .then(res => res.data)
        .catch(error => { throw error; });
}
const updateNotification = async (id: any) => {
    return axiosInstance.put(`/notifications/update/${id}`)
        .then(res => res.data)
        .catch(error => { throw error; });
}


export { getAllNotifications, updateNotification };