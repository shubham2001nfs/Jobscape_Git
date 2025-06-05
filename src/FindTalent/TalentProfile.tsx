import { Button, Divider } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Profile from "../TalentProfile/Profile";
import RecommendedTalent from "../TalentProfile/RecommendTalent";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAll } from "../Services/ProfileService";
const TalentProfile = () => {
    const profile = useSelector((state: any) => state.profile)
    const [getAllProfiles, setAllProfiles] = useState<any[]>([]);
    const [selectedProfile, setSelectedProfile] = useState<any>(null);
    const { id } = useParams();

    useEffect(() => {
        getAll().then((res) => {
            const selected = res.find((prof: any) => String(prof.id) === String(id));
            setSelectedProfile(selected);

            const filtered = res.filter((prof: any) =>
                String(prof.id) !== String(profile.id) && String(prof.id) !== String(id)
            );
            setAllProfiles(filtered);
        }).catch((error) => {
            console.log(error);
        });
    }, [id, profile.id]);

    const navigate = useNavigate();
    return (
        <div>
            <div className="min-h-[100vh] bg-mine-shaft-950 font-['poppins']">
                <Divider size="xs" className="mb-2" />
                <div className="my-1 mx-9 inline-block px-2" >
                    <Button leftSection={<IconArrowLeft size={20} />} variant="outline" onClick={() => navigate(-1)}>Back</Button>
                </div>
                <div className="flex gap-5 mx-7">
                    <Profile {...profile} />
                    <RecommendedTalent getAllProfiles={getAllProfiles} />
                </div>
            </div>
        </div>
    )
}

export default TalentProfile;