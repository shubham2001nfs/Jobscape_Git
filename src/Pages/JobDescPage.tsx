import { Button, Divider } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { Link, useParams } from "react-router-dom";
import JobDesc from "../JobDesc/JobDesc";
import RecommendedJobs from "../JobDesc/RecommendedJobs";
import { useEffect, useState } from "react";
import { getJob } from "../Services/JobService";
const JobDescPage = () => {
    const { id } = useParams();
    const [job, setJob] = useState<any>(null);
    useEffect(() => {
        window.scrollTo(0, 0);
        getJob(id).then((res) => {
            setJob(res);
        }).catch((error) => {
            console.log(error);
        })
    }, [id])

    return (
        <div>
            <div className="min-h-[160vh] bg-mine-shaft-950 font-['poppins']">
                <Divider size="xs" className="mb-2" />
                <Link className="my-1 mx-9 inline-block px-2" to={"/find-jobs"}>
                    <Button leftSection={<IconArrowLeft size={20} />} variant="outline">Back</Button>
                </Link>
                <div className="flex gap-5 mx-9 px-2  ">
                    <JobDesc {...job} />
                    <RecommendedJobs />
                </div>

            </div>
        </div>
    )
}

export default JobDescPage;