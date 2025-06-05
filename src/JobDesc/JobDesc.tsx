import { Button } from "@mantine/core";
import { IconBookmark, IconBookmarkFilled, IconCheck, IconMapPin, IconX } from "@tabler/icons-react";
import { Link, useParams } from "react-router-dom";
import { Divider } from "@mantine/core";
import { ActionIcon } from "@mantine/core";
import { card, desc, skills } from "../Data/JobDescData";
import DOMpurify from 'dompurify';
import RecommendedJobs from "./RecommendedJobs";
import { timeAgo } from "../Services/Utilities";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";
import { useEffect, useState } from "react";
import { closeJob, reopenJob } from "../Services/JobService";
import { notifications } from "@mantine/notifications";

const JobDesc = (props: any) => {
    const profile = useSelector((state: any) => state.profile);
    const { id } = useParams();
    const user = useSelector((state: any) => state.user);
    const [applied, setApplied] = useState(false);
    const dispatch = useDispatch();
    const handleSavedJob = () => {
        let savedJobs = [...(profile.savedJobs ?? [])];
        if (savedJobs?.includes(props.id)) {
            savedJobs = savedJobs?.filter((id: any) => id !== props.id);
        }
        else {
            savedJobs = [...savedJobs, props.id];
        }
        let updatedProfile = { ...profile, savedJobs: savedJobs }
        dispatch(changeProfile(updatedProfile));
    }

    useEffect(() => {
        if (props.applicants?.filter((applicant: any) => applicant.applicantId == user.id).length > 0) {
            setApplied(true);
        }
        else {
            setApplied(false);
        }

    }, [props])

    const handleCloseJob = () => {
        closeJob(id)
            .then((res) => {
                notifications.show({
                    title: "Success",
                    message: "Job marked as closed",
                    color: "teal",
                    icon: <IconCheck />,
                });

            })
            .catch((err) => {
                notifications.show({
                    title: "Error",
                    message: err.response?.data?.message,
                    color: "red",
                    icon: <IconX />,
                });
            });
    };

    const handleReopenJob = () => {
        reopenJob(id)
            .then((res) => {
                notifications.show({
                    title: "Success",
                    message: "Job marked as open",
                    color: "teal",
                    icon: <IconCheck />,
                });

            })
            .catch((err) => {
                notifications.show({
                    title: "Error",
                    message: err.response?.data?.message,
                    color: "red",
                    icon: <IconX />,
                });
            });
    }
    const data = DOMpurify.sanitize(props.description);
    return (
        <div className="w-2/3 mb-10">
            <div className="flex justify-between py-5">
                <div className="flex gap-2 items-center">
                    <div className="p-2 bg-mine-shaft-800 rounded-md">
                        <img className="w-14 h-14" src={`/Icons/${props.company}.png`} alt="Google" />
                    </div>
                    <div className="p-2">
                        <div className="text-mine-shaft-100 font-semibold text-2xl">{props.jobTitle}</div>
                        <div className="text-mine-shaft-200 text-lg">{props.company} &#x2022; {timeAgo(props.postTime)} &#x2022; {props.applicants ? props.applicants.length : 0} Applicants </div>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                    {applied ? (
                        <Button variant="light" color="green.8" className="!w-40">Applied</Button>
                    ) : props.closed ? (
                        <Button variant="outline" className="!w-40" onClick={handleReopenJob}>Reopen</Button>
                    ) : props.edit ? (
                        <Link to={`/post-job/${id}`}>
                            <Button variant="outline" className="!w-40">Edit</Button></Link>

                    ) : <Link to={`/apply-job/${id}`}>
                        <Button variant="outline" className="!w-40">Apply</Button></Link>
                    }


                    {props.edit && !props.closed ? <Button variant="outline" className="!w-40" onClick={handleCloseJob} color="red.6">Close</Button> : profile.savedJobs?.includes(props.id) ? < IconBookmarkFilled onClick={handleSavedJob} className="text-web-orange-400" /> : < IconBookmark onClick={handleSavedJob} className="text-mine-shaft-300 cursor-pointer hover:text-web-orange-400" />}
                </div>
            </div>
            <Divider size="xs" className="mb-2 mt-4" />
            <div className="py-3 flex gap-1 justify-between">
                {
                    card.map((item, index) => <div key={index} className="flex flex-col items-center gap-1">
                        <ActionIcon
                            className="!h-12 !w-12 !bg-mine-shaft-900 !text-web-orange-500"
                            variant="light"
                            radius="xl"
                            aria-label="Settings"
                        >
                            <item.icon style={{ width: '70%', height: '70%' }} stroke={1.5} />
                        </ActionIcon>
                        <div className="text-sm">{item.name}</div>
                        <div className="font-semibold">{props ? props[item.id] : "NA"} {item.id === "packageOffered" && <>LPA</>}</div>
                    </div>)
                }
            </div>
            <Divider size="xs" className="mb-2 mt-4" />
            <div>
                <div className="text-xl text-mine-shaft-200 font-semibold my-5">Required Skills</div>
                <div className="gap-3 flex flex-wrap mt-6 ">
                    {
                        props?.skillsRequired?.map((item, index) => <ActionIcon key={index}
                            className="!h-fit !w-fit !p-2  !border-2 !border-web-orange-500 !bg-mine-shaft-900 !text-web-orange-500 !text-web-orange-500 !text-sm"
                            variant="light"
                            radius="xl"
                            aria-label="Settings"
                        >
                            {item}
                        </ActionIcon>)
                    }
                </div>
            </div>
            <Divider size="xs" className="mb-2 mt-10" />
            <div className="[&_h4]:text-xl [&_h4]:text-mine-shaft-200 [&_h4]:my-5 [&_h4]:font-semibold [&_p]:text-justify [&_li]:marker:text-web-orange-500 [&_li]:my-1" dangerouslySetInnerHTML={{ __html: data }}>

            </div>
            <Divider size="xs" className="mb-2 mt-10" />
            <div>
                <div className="text-xl text-mine-shaft-200 font-semibold my-5">About Companies</div>
                <div className="flex justify-between py-1 mb-3">
                    <div className="flex gap-2 items-center">
                        <div className="p-2 bg-mine-shaft-800 rounded-md">
                            <img className="w-10 h-10" src={`/Icons/${props.company}.png`} alt="Google" />
                        </div>
                        <div className="p-2">
                            <div className="text-mine-shaft-100 font-medium text-lg">{props.company}</div>
                            <div className="text-mine-shaft-200 text-md">10k+ Employees</div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <Link to={`/company/${props.company}`} state={{ jobId: props.id }}>
                            <Button variant="outline" className="!w-40">Company Page</Button>
                        </Link>

                    </div>
                </div>
                <div className="text-justify">
                    Major IT companies like Microsoft, Google, Meta, Apple, Amazon, Netflix, Adobe, and Spotify are global leaders in technology and digital innovation. They shape how people work, communicate, shop, create, and consume content. From Microsoft’s productivity tools and Google’s search and cloud services to Meta’s social platforms and Apple’s hardware and software ecosystem, each plays a key role in the digital landscape. Companies like Amazon lead in e-commerce and cloud computing, while Netflix and Spotify transform entertainment through streaming. Adobe empowers creators with design tools, reflecting the diverse impact of these tech giants.
                </div>
            </div>
        </div >
    );
}

export default JobDesc;
