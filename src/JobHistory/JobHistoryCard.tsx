import {
    IconBookmark,
    IconBookmarkFilled,
    IconClock,
    IconCalendarMonth,
} from "@tabler/icons-react";
import { Button, Divider, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { formatInterviewTime, timeAgo } from "../Services/Utilities";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";
import { useState, useEffect } from "react";
import { notifications } from "@mantine/notifications";

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

const formatTimeLeft = (ms: number) => {
    if (ms <= 0) return null;
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours}h ${minutes}m ${seconds}s left to change your decision`;
};

const JobHistoryCard = (props: any) => {
    const dispatch = useDispatch();
    const profile = useSelector((state: any) => state.profile);
    const [accepted, setAccepted] = useState(false);
    const [rejected, setRejected] = useState(false);
    const [fullyDisabled, setFullyDisabled] = useState(false);
    const [timeLeft, setTimeLeft] = useState<number | null>(null);

    useEffect(() => {
        const action = localStorage.getItem(`offerStatus_${props.id}_action`);
        const time = localStorage.getItem(`offerStatus_${props.id}_time`);
        if (action && time) {
            const elapsed = Date.now() - parseInt(time, 10);
            if (elapsed < ONE_DAY_MS) {
                if (action === "accepted") setAccepted(true);
                if (action === "rejected") setRejected(true);
                setFullyDisabled(false);
                setTimeLeft(ONE_DAY_MS - elapsed);
                const interval = setInterval(() => {
                    const newElapsed = Date.now() - parseInt(time, 10);
                    const remaining = ONE_DAY_MS - newElapsed;
                    setTimeLeft(remaining > 0 ? remaining : 0);
                    if (remaining <= 0) {
                        setFullyDisabled(true);
                        setAccepted(false);
                        setRejected(false);
                        clearInterval(interval);
                    }
                }, 1000);
                return () => clearInterval(interval);
            } else {
                setFullyDisabled(true);
                setAccepted(false);
                setRejected(false);
                setTimeLeft(null);
            }
        } else {
            setAccepted(false);
            setRejected(false);
            setFullyDisabled(false);
            setTimeLeft(null);
        }
    }, [props.id]);

    const handleSavedJob = () => {
        let savedJobs = [...(profile.savedJobs ?? [])];
        if (savedJobs.includes(props.id)) {
            savedJobs = savedJobs.filter((id: any) => id !== props.id);
        } else {
            savedJobs.push(props.id);
        }
        dispatch(changeProfile({ ...profile, savedJobs }));
    };

    const statusLabel = props.applied
        ? "Applied"
        : props.offered
            ? "Offered"
            : props.interviewing
                ? "Interview"
                : "Posted";

    const handleAccept = () => {
        setAccepted(true);
        setRejected(false);
        setFullyDisabled(false);
        localStorage.setItem(`offerStatus_${props.id}_action`, "accepted");
        localStorage.setItem(`offerStatus_${props.id}_time`, Date.now().toString());
        notifications.show({
            title: "Offer accepted",
            message: "You have accepted the offer.",
            color: "teal",
            autoClose: 3000,
        });
        setTimeLeft(ONE_DAY_MS);
        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev !== null) {
                    const next = prev - 1000;
                    if (next <= 0) {
                        setFullyDisabled(true);
                        setAccepted(false);
                        setRejected(false);
                        clearInterval(interval);
                        return 0;
                    }
                    return next;
                }
                return null;
            });
        }, 1000);
        setTimeout(() => {
            setFullyDisabled(true);
            setAccepted(false);
            setRejected(false);
            setTimeLeft(null);
            clearInterval(interval);
        }, ONE_DAY_MS);
    };

    const handleReject = () => {
        setRejected(true);
        setAccepted(false);
        setFullyDisabled(false);
        localStorage.setItem(`offerStatus_${props.id}_action`, "rejected");
        localStorage.setItem(`offerStatus_${props.id}_time`, Date.now().toString());
        notifications.show({
            title: "Offer rejected",
            message: "You have rejected the offer.",
            color: "red.6",
            autoClose: 3000,
        });
        setTimeLeft(ONE_DAY_MS);
        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev !== null) {
                    const next = prev - 1000;
                    if (next <= 0) {
                        setFullyDisabled(true);
                        setAccepted(false);
                        setRejected(false);
                        clearInterval(interval);
                        return 0;
                    }
                    return next;
                }
                return null;
            });
        }, 1000);
        setTimeout(() => {
            setFullyDisabled(true);
            setAccepted(false);
            setRejected(false);
            setTimeLeft(null);
            clearInterval(interval);
        }, ONE_DAY_MS);
    };

    return (
        <div className="w-full max-w-[23rem] bg-mine-shaft-900 p-4 rounded-xl mt-5 hover:shadow-[0_0_2px_1px_orange] cursor-pointer border border-transparent hover:border-web-orange-500">
            <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                    <div className="p-2 bg-mine-shaft-800 rounded-md">
                        <img
                            className="w-7 h-7"
                            src={`/Icons/${props.company}.png`}
                            alt={`${props.company} logo`}
                        />
                    </div>
                    <div className="p-2">
                        <div className="text-mine-shaft-100 font-semibold">
                            {props.jobTitle}
                        </div>
                        <div className="text-mine-shaft-200 text-xs">
                            {props.company} &#x2022; {props.applicants?.length ?? 0} Applicants
                        </div>
                    </div>
                </div>
                {profile.savedJobs?.includes(props.id) ? (
                    <IconBookmarkFilled
                        onClick={handleSavedJob}
                        className="text-web-orange-400 cursor-pointer"
                    />
                ) : (
                    <IconBookmark
                        onClick={handleSavedJob}
                        className="text-mine-shaft-300 cursor-pointer hover:text-web-orange-400"
                    />
                )}
            </div>

            <div className="flex gap-2 mt-2 [&>div]:rounded-lg text-sm p-1 [&>div]:p-2 [&>div]:bg-mine-shaft-700 [&>div]:text-web-orange-500 [&>div]:text-xs">
                <div>{props.experience}</div>
                <div>{props.jobType}</div>
                <div>{props.location}</div>
            </div>

            <Text className="!text-xs !mt-2 !text-mine-shaft-300" lineClamp={3}>
                {props.about}
            </Text>

            <Divider size="xs" color="web-orange" className="mt-4" />

            <div className="flex justify-between mt-4 text-xs text-mine-shaft-300">
                <div className="text-lg text-mine-shaft-100 font-semibold">
                    &#8377;{props.packageOffered} LPA
                </div>
                <div className="flex items-center gap-1">
                    <IconClock stroke={1.5} />
                    {props.interviewing && props.interviewTime
                        ? `Interview ${timeAgo(props.interviewTime)}`
                        : `${statusLabel} ${timeAgo(props.postTime)}`}
                </div>
            </div>

            {/* Conditional Sections */}
            {(props.offered || props.interviewing) && (
                <Divider size="xs" color="web-orange" className="mt-4" />
            )}

            {props.offered && (
                <div className="flex flex-col gap-2 mt-4">
                    <div className="flex gap-2">
                        <Button variant="outline" color="green.6" fullWidth onClick={handleAccept} disabled={accepted || fullyDisabled}>
                            Accept
                        </Button>
                        <Button variant="light" color="red.6" fullWidth onClick={handleReject} disabled={rejected || fullyDisabled}>
                            Reject
                        </Button>
                    </div>
                    {timeLeft !== null && !fullyDisabled && (
                        <div className="text-xs text-mine-shaft-300 mt-1 text-center">
                            {formatTimeLeft(timeLeft)}
                        </div>
                    )}
                </div>
            )}

            {
                props.interviewing && props.interviewTime && (
                    <div className="flex mt-4 gap-2 items-center p-1 text-sm text-mine-shaft-300">
                        <IconCalendarMonth stroke={1.5} className="text-web-orange-500" />
                        <span>Interview: {formatInterviewTime(props.interviewTime)}</span>
                    </div>
                )
            }

            <div className="flex justify-center mt-6">
                <Link to={`/jobs/${props.id}`}>
                    <Button variant="outline" className="!w-80">
                        View Job
                    </Button>
                </Link>
            </div>
        </div >
    );
};

export default JobHistoryCard;
