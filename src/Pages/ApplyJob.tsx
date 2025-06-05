import { Divider } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { Button } from "@mantine/core";
import { Link, useNavigate, useParams } from "react-router-dom";
import Apply from "../ApplyJob/Apply";
import { useEffect, useState } from "react";
import { getJob } from "../Services/JobService";
const ApplyJob = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [job, setJob] = useState<any>(null);
    useEffect(() => {
        window.scrollTo(0, 0);
        getJob(id).then((res) => {
            setJob(res);
        })
            .catch((error) => {
                console.log(error);
            })
    })
    return (
        <div className="min-h-[100vh] bg-mine-shaft-950 font-['poppins'] ">
            <Divider size="xs" className="mb-2" />
            <Button leftSection={<IconArrowLeft size={20} />} variant="outline" className="mx-11 my-1" onClick={() => navigate(-1)}>Back</Button>
            <div className="flex gap-5 mx-9 px-2 my-1 ">
                <Apply {...job} />
            </div>
        </div>
    )
}

export default ApplyJob;