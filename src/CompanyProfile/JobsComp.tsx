import { jobList } from "../Data/JobsData";
import JobCard from "../FindJobs/JobCard";

const JobsComp = () => {
    return (
        <div className="flex flex-wrap gap-10 mt-10 ">
            {
                jobList.map((item, index) => index < 6 && (
                    <div className="px-2"> {/* Adding padding to each JobCard */}
                        <JobCard key={index} {...item} />
                    </div>
                ))
            }
        </div>

    )
}

export default JobsComp;