import { useEffect, useState } from "react";
import { jobList } from "../Data/JobsData";
import JobCard from "./JobCard";
import Sort from "./Sort";
import { getAllJobs } from "../Services/JobService";
import { useDispatch, useSelector } from "react-redux";
import { resetFilter } from "../Slices/FilterSlice";
import { resetSort } from "../Slices/SortSlice";

const Jobs = () => {
    const [jobList, setJobList] = useState<any[]>([]);
    const [filteredJob, setFilteredJob] = useState<any[]>([]);
    const dispatch = useDispatch();
    const filter = useSelector((state: any) => state.filter);
    const sort = useSelector((state: any) => state.sort);

    useEffect(() => {
        dispatch(resetFilter());
        dispatch(resetSort());
        getAllJobs()
            .then((res) => setJobList(res))
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        let filtered = jobList.filter((job: any) => job.jobStatus === "OPEN");

        if (filter["Job Title"] && filter["Job Title"].length > 0) {
            filtered = filtered.filter((job: any) =>
                filter["Job Title"].includes(job.jobTitle)
            );
        }

        if (filter["Location"] && filter["Location"].length > 0) {
            filtered = filtered.filter((job: any) =>
                filter["Location"].includes(job.location)
            );
        }
        if (filter.Experience && filter.Experience.length > 0) {
            filtered = filtered.filter((job: any) =>
                filter.Experience.includes(job.experience)
            );
        }

        if (filter["Job Type"] && filter["Job Type"].length > 0) {
            filtered = filtered.filter((job: any) =>
                filter["Job Type"].includes(job.jobType)
            );
        }


        if (filter.sal && filter.sal.length > 0) {
            filtered = filtered.filter((job: any) =>
                filter.sal[0] <= job.packageOffered && job.packageOffered <= filter.sal[1]
            );
        }

        setFilteredJob(filtered);
    }, [filter, jobList]);

    useEffect(() => {
        let filtered = jobList.filter((job: any) => job.jobStatus == "OPEN")
        if (sort == "Most Recent") {
            setFilteredJob([...filtered].sort((a: any, b: any) => new Date(b.postTime).getTime() - new Date(a.postTime).getTime()));
        }
        else if (sort == "Salary (Low to High)") {
            setFilteredJob([...filtered].sort((a: any, b: any) => a.packageOffered - b.packageOffered));
        }
        else if (sort == "Salary (High to Low)") {
            setFilteredJob([...filtered].sort((a: any, b: any) => b.packageOffered - a.packageOffered));
        }

    }, [sort])

    return (
        <div className="px-6 mt-10">
            <div className="flex justify-between">
                <div className="text-2xl font-semibold">Recommended Jobs</div>
                <Sort sort="job" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10 w-full">
                {
                    filteredJob.length ? filteredJob.map((item, index) => (
                        <div className="px-2"> {/* Adding padding to each JobCard */}
                            <JobCard key={index} {...item} />
                        </div>
                    )) : <div className="text-2xl font-semibold items-center justify-center">No Jobs Found</div>
                }
            </div>
        </div>
    );
}

export default Jobs;
