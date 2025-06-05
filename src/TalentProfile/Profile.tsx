import { IconBriefcase, IconMapPin } from "@tabler/icons-react";
import { Avatar, Button } from "@mantine/core";
import { Divider } from "@mantine/core";
import ExperienceCard from "./ExperienceCard";
import CertificationCard from "./CertificationCard";
import { profile } from "../Data/TalentData";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProfile } from "../Services/ProfileService";
import { useSelector } from "react-redux";

const Profile = () => {
    const user = useSelector((state: any) => state.user);
    const { id } = useParams();
    const [profile, setProfile] = useState<any>({});
    useEffect(() => {
        window.scrollTo(0, 0)
        getProfile(id).then((res) => {
            setProfile(res);
        })
            .catch((error) => {
                console.log(error);
            })
    }, [id])
    return (
        <div className="w-2/3 px-4 py-4 mb-10">
            <div className="relative"> {/* <-- Add this */}
                <img className="rounded-t-xl w-full" src="/banner.jpg" alt="banner" />
                <div className="absolute -bottom-3 left-3 flex items-center justify-center cursor-pointer">
                    <Avatar
                        src="/avatar.png"
                        alt="avatar"
                        radius="xl"
                        className="!w-48 !h-48 !rounded-full border-8 border-white shadow-lg"
                    />
                </div>
            </div>


            <div className="mt-10 px-2">
                <div className="flex justify-between text-3xl font-semibold">{profile.name}<Button variant="light" color="web-orange" className="!w-3/3" >Message</Button></div>
                <div className="text-xl flex gap-1 items-center"><IconBriefcase stroke={1.5} />{profile?.jobTitle} &#x2022; {profile?.company}</div>
                <div className="flex gap-1 text-lg items-center text-mine-shaft-300">
                    <IconMapPin stroke={1.5} /> {profile?.location}
                </div>
            </div>
            <Divider size="xs" className="mt-10" />
            <div>
                <div className="text-2xl font-semibold mt-4 mx-1">About</div>

                <div className="text-sm text-mine-shaft-200 text-justify mt-2 px-1">
                    {profile?.about}
                </div>
            </div>
            <Divider size="xs" className="mt-10" />
            <div>
                <div className="text-2xl font-semibold mt-4 mx-1">Skills</div>
                <div className="text-sm text-mine-shaft-200 text-justify mt-2 px-1">
                    <div className="flex flex-wrap mt-1 gap-4 my-3">
                        {
                            profile?.skills?.map((item: any, index: any) => <div key={index} className="bg-mine-shaft-900 text-web-orange-500 rounded-full border-2 border-web-orange-500 text-md px-2 py-1">{item}</div>
                            )
                        }
                    </div>

                </div>
                <Divider size="xs" className="mt-10" />
                <div>
                    <div className="text-2xl font-semibold mt-4 mx-1">Experience</div>
                    {
                        profile?.experiences?.map((item: any, index: any) => <ExperienceCard key={index} {...item} />)
                    }

                </div>
                <Divider size="xs" className="mt-10" />
                <div>
                    <div className="text-2xl font-semibold mt-4 mx-1">Certification</div>
                    {
                        profile?.certificates?.map((item: any, index: any) => <CertificationCard key={index} {...item} />)
                    }
                </div>
            </div>
        </div >
    )
}

export default Profile;