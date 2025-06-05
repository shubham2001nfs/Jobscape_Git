import { Divider } from "@mantine/core";
import Searchbar from "../FindTalent/Searchbar";
import Talents from "../FindTalent/Talents";
const FindTalent = () => {
    return (
        <div className="min-h-[100vh] bg-mine-shaft-950 font-['poppins'] ">
            <Divider size="xs" className="mb-2" />
            <Searchbar />
            <div className="mt-2">
                <Divider size="xs" className="mb-2" />
            </div>
            <Talents />
        </div>
    )
}

export default FindTalent;