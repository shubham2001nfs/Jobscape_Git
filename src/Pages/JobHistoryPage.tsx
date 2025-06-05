import { Divider } from "@mantine/core";
import JobHistory from "../JobHistory/JobHistory";

const JobHistoryPage = () => {
    return (
        <div className="min-h-[100vh] bg-mine-shaft-950 font-['poppins'] ">
            <Divider size="xs" className="mb-2" />
            <div className="flex gap-5  mx-10 pl-2">
                <JobHistory />
            </div>

        </div>

    )
}

export default JobHistoryPage;