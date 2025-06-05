import { IconBookmark, IconBookmarkFilled, IconClock } from "@tabler/icons-react";
import { Button, Divider, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { timeAgo } from "../Services/Utilities";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";

const JobCard = (props: any) => {
    const profile = useSelector((state: any) => state.profile);
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

    return (
        <div className="w-[23rem] bg-mine-shaft-900 p-4 rounded-xl mt-5 hover:shadow-[0_0_2px_1px_orange] cursor-pointer border border-transparent hover:border-web-orange-500">
            <div
                className="w-full block"
                aria-label={`View details for job: ${props.jobTitle}`}
            >
                <div className="flex justify-between items-center w-full">
                    <div className="flex gap-2 items-center">
                        <div className="p-2 bg-mine-shaft-800 rounded-md">
                            <img className="w-7 h-7" src={`/Icons/${props.company}.png`} alt={`${props.company} logo`} />
                        </div>
                        <div className="p-2">
                            <div className="text-mine-shaft-100 font-semibold">{props.jobTitle}</div>
                            <div className="text-mine-shaft-200 text-xs">{props.company} &#x2022; {props.applicants ? props.applicants.length : 0} Applicants</div>
                        </div>
                    </div>
                    {profile.savedJobs?.includes(props.id) ? < IconBookmarkFilled onClick={handleSavedJob} className="text-web-orange-400" /> : < IconBookmark onClick={handleSavedJob} className="text-mine-shaft-300 cursor-pointer hover:text-web-orange-400" />}
                </div>

                <div className="flex gap-2 mt-2 [&>div]:rounded-lg text-sm p-1 [&>div]:p-2 [&>div]:bg-mine-shaft-700 [&>div]:text-web-orange-500 [&>div]:text-xs">
                    <div>{props.experience}</div>
                    <div>{props.jobType}</div>
                    <div>{props.location}</div>
                </div>

                <Text className="!text-xs !mt-2 !text-mine-shaft-300 !mb-2" lineClamp={2}>
                    {props.about}
                </Text>

                <Divider size="xs" color="web-orange" className="mt-4" />

                <div className="flex justify-between mt-4">
                    <div className="!text-md text-mine-shaft-100 font-semibold">&#8377;{props.packageOffered} LPA</div>
                    <div className="flex gap-1 text-xs items-center text-mine-shaft-300">
                        <IconClock stroke={1.5} />Posted {timeAgo(props.postTime)}
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-center mt-6">
                <Link
                    to={`/jobs/${props.id}`}>
                    <Button variant="outline" className="!w-80">View Job</Button>
                </Link>

            </div>


        </div>
    );
};

export default JobCard;
