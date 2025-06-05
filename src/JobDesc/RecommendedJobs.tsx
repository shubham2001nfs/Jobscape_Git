import { useParams } from "react-router-dom";
import JobCard from "../FindJobs/JobCard";
import { useEffect, useState } from "react";
import { getAllJobs } from "../Services/JobService";

const RecommendedJobs = () => {
    const { id } = useParams();
    const [jobList, setJobList] = useState<any>(null);

    useEffect(() => {
        getAllJobs().then((res) => {
            setJobList(res);
        })
            .catch((error) => {
                console.log(error);
            })
    }, [])
    return (
        <div className="mx-20">
            <div className="text-2xl font-semibold mx-10 flex flex-col flex-wrap">Recommended Jobs</div>
            {
                jobList?.map((job: any, index: any) => index < 5 && id != job.id && <JobCard key={index} {...job} />)
            }
        </div>
    )
}

export default RecommendedJobs;