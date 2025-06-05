import axiosInstance from "../Interceptor/AxiosIntercepter";

const postJob = (job: any) => {
    return axiosInstance.post(`/jobs/post`, job)
        .then(res => res.data)
        .catch(error => { throw error; });
}
const getAllJobs = () => {
    return axiosInstance.get(`/jobs/allJobs`)
        .then(res => res.data)
        .catch(error => { throw error; });
}

const getJob = (id: any) => {
    return axiosInstance.get(`/jobs/get/${id}`)
        .then(res => res.data)
        .catch(error => { throw error; });
}

const applyJob = (id: any, applicant: any) => {
    return axiosInstance.post(`/jobs/apply/${id}`, applicant)
        .then(res => res.data)
        .catch(error => { throw error; });
}

const getJobPostedBy = (id: any) => {
    return axiosInstance.get(`/jobs/postedJob/${id}`)
        .then(res => res.data)
        .catch(error => { throw error; });
}

const changeAppStatus = (application: any) => {
    return axiosInstance.post(`/jobs/changeAppStatus`, application)
        .then(res => res.data)
        .catch(error => { throw error; });
}
const closeJob = (id: any) => {
    return axiosInstance.put(`/jobs/closeJob/${id}`)
        .then(res => res.data)
        .catch(error => { throw error; });
}

const reopenJob = (id: any) => {
    return axiosInstance.put(`/jobs/reopenJob/${id}`)
        .then(res => res.data)
        .catch(error => { throw error; });
}

export { postJob, getAllJobs, getJob, applyJob, getJobPostedBy, changeAppStatus, closeJob, reopenJob };