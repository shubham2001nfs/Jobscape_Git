import Searchbar from "../FindJobs/Searchbar";
import { Divider } from "@mantine/core";
import Jobs from "../FindJobs/Jobs"
import { useSelector } from "react-redux";
const FindJobs = () => {
    const user = useSelector((state: any) => state.user);
    return (

        <div className="min-h-[100vh] bg-mine-shaft-950 font-['poppins'] ">
            <Divider size="xs" className="mb-2" />
            <Searchbar />
            <div className="mt-2">
                <Divider size="xs" className="mb-2" />
            </div>
            <Jobs />
        </div>

    )
}
export default FindJobs;