import { Divider } from "@mantine/core";
import PostedJob from "../PostedJob/PostedJob";
import PostedJobDesc from "../PostedJob/PostedJobDesc";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getJobPostedBy } from "../Services/JobService";

const PostedJobPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const user = useSelector((state: any) => state.user);
    const [jobList, setJobList] = useState<any[]>([])
    const [job, setJob] = useState<any>({});
    useEffect(() => {
        window.scrollTo(0, 0);
        getJobPostedBy(user.id).then((res) => {
            setJobList(res);
            if (res && res.length > 0 && Number(id) == 0) {
                navigate(`/posted-job/${res[0].id}`)
            }
            setJob(res.find((item: any) => item.id == id));
        }).catch((error) => {
            console.log(error);
        })
    }, [id])
    return (
        <div className="min-h-[100vh] bg-mine-shaft-950 font-['poppins'] ">
            <Divider size="xs" className="mb-2" />
            <div className="flex gap-5  mx-10 pl-2">
                <PostedJob job={job} jobList={jobList} />
                <div className="px-20 mx-10 pl-2 w-3/4">
                    <PostedJobDesc {...job} />

                </div>

            </div>

        </div>

    )
}
export default PostedJobPage;