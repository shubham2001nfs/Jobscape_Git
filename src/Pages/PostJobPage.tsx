import { Button, Divider } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import Profile from "../TalentProfile/Profile";
import { profile } from "../Data/TalentData";
import RecommendedTalent from "../TalentProfile/RecommendTalent";
import PostJob from "../PostJob/PostJob";
const PostJobPage = () => {
    return (
        <div>
            <div className="min-h-[100vh] bg-mine-shaft-950 font-['poppins']">
                <Divider size="xs" className="mb-2" />
                <PostJob />

            </div>
        </div>
    )
}

export default PostJobPage;