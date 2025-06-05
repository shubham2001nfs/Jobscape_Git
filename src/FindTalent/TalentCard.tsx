import { IconCalendarMonth, IconCheck, IconHeart, IconMapPin } from "@tabler/icons-react";
import { Avatar, Button, Divider, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link, useParams } from "react-router-dom";
import dayjs from 'dayjs';
import { DateInput, TimeInput } from '@mantine/dates';
import { useEffect, useRef, useState } from 'react';
import { getProfile } from "../Services/ProfileService";
import { changeAppStatus } from "../Services/JobService";
import { notifications } from "@mantine/notifications";
import { formatInterviewTime, openResumeFromBase64 } from "../Services/Utilities";
import { useSelector } from "react-redux";

const TalentCard = (props: any) => {
    const [opened, { open, close }] = useDisclosure(false);
    const [app, { open: openApp, close: closeApp }] = useDisclosure(false);
    const ref = useRef<HTMLInputElement>(null);
    const [profile, setProfile] = useState<any>({});
    const [date, setDate] = useState<Date | null>(null);
    const [time, setTime] = useState<any>(null);
    const { id } = useParams();

    useEffect(() => {
        if (props.applicantId) {
            getProfile(props.applicantId).then((res) => {
                setProfile(res);
            }).catch((error) => {
                console.log(error);
            });
        } else {
            setProfile(props);
        }
    }, [props]);

    const showCustomNotification = (title: string, message: string) => {
        notifications.show({
            title,
            message,
            icon: <IconCheck />,
            color: "teal",
            autoClose: 3000,
            styles: (theme) => ({
                root: {
                    padding: theme.spacing.md,
                    minHeight: 80,
                },
                title: {
                    fontSize: theme.fontSizes.md,
                    fontWeight: 600,
                },
                description: {
                    fontSize: theme.fontSizes.sm,
                },
            }),
        });
    };

    const handleInterview = (status: string) => {
        let interview: any = { id, applicantId: profile?.id, applicationStatus: status };
        if (status === "INTERVIEWING") {
            const [hours, minutes] = time.split(":").map(Number);
            date?.setHours(hours, minutes);
            interview = { ...interview, interviewTime: date };
        }

        changeAppStatus(interview).then(() => {
            if (status === "INTERVIEWING") {
                showCustomNotification('Interview Scheduled', 'You have scheduled an interview with the candidate.');
            } else if (status === "OFFERED") {
                showCustomNotification('Offered', 'You have made a job offer to the candidate.');
            } else {
                showCustomNotification('Rejected', 'You have rejected the application.');
            }
            window.location.reload();
        }).catch((error) => {
            showCustomNotification('Error', error.response.data.errorMessage);
        });
    };

    return (
        <div className="w-[23rem] bg-mine-shaft-900 p-4 rounded-xl mt-5 hover:shadow-[0_0_2px_1px_orange] cursor-pointer">
            <div className="flex justify-between items-center w-full">
                <div className="flex gap-2 items-center">
                    <div className="p-2 bg-mine-shaft-800 rounded-full">
                        <Avatar className="w-7 h-7" src="/avatar.png" alt="avatar" size="lg" />
                    </div>
                    <div className="p-2">
                        <div className="text-mine-shaft-100 font-semibold">{props.name}</div>
                        <div className="text-mine-shaft-200 text-xs">{profile.jobTitle} &#x2022; {profile.company}</div>
                    </div>
                </div>
                <IconHeart className="text-web-orange-500 cursor-pointer hover:text-web-orange-300" />
            </div>

            <div className="flex gap-2">
                {Array.isArray(profile.skills) && profile.skills.map((item: any, index: any) =>
                    index < 4 && (
                        <div key={index} className="flex gap-2 mt-2 [&>div]:rounded-lg text-sm p-1 [&>div]:p-2  [&>div]:bg-mine-shaft-700 [&>div]:text-web-orange-500 [&>div]:text-xs">
                            <div>{item}</div>
                        </div>
                    )
                )}
            </div>

            <Text className="!text-xs !mt-2  !text-mine-shaft-300" lineClamp={3}>
                {profile.about}
            </Text>

            <Divider size="xs" color="web-orange" className="mt-4" />

            {props.invited ? (
                <div className="flex gap-1 text-mine-shaft-200 text-sm items-center pt-4 ">
                    <IconCalendarMonth stroke={1.5} /> Interview: {formatInterviewTime(props.interviewTime)}
                </div>
            ) : (
                <div className="flex justify-between mt-4">
                    <div className="!text-md text-mine-shaft-100 ">
                        Exp: {profile.totalExp === "0" || profile.totalExp == null
                            ? "Fresher"
                            : profile.totalExp > 1
                                ? `${profile.totalExp} Years`
                                : `${profile.totalExp} Year`}
                    </div>
                    <div className="flex justify-between gap-1 text-xs items-center text-mine-shaft-300">
                        <IconMapPin stroke={1.5} /> {profile.location}
                    </div>
                </div>
            )}

            <Divider size="xs" color="web-orange" className="mt-4" />

            {props.invited ? (
                <div className="flex mt-3 [&>*]:w-1/2 pt-1 pb-1 gap-2">
                    <Button variant="outline" color="green.6" fullWidth onClick={() => handleInterview("OFFERED")}>Accept</Button>
                    <Button variant="light" color="red.6" fullWidth onClick={() => handleInterview("REJECTED")}>Reject</Button>
                </div>
            ) : (
                <div className="flex mt-3 [&>*]:w-1/2 [&>*]:p-1">
                    <Link to={`/talent-profile/${profile?.id}`}>
                        <Button variant="outline" color="web-orange" fullWidth>Profile</Button>
                    </Link>
                    <div>
                        {props.posted ? (
                            <Button onClick={open} variant="light" color="web-orange.5" rightSection={<IconCalendarMonth stroke={1.5} />} fullWidth>Schedule</Button>
                        ) : (
                            <Button variant="light" color="web-orange" fullWidth>Message</Button>
                        )}
                    </div>
                </div>
            )}

            {(props.invited || props.posted) && (
                <Button variant="filled" color="web-orange.5" className="mt-4" fullWidth onClick={openApp}>View Application</Button>
            )}

            <Modal opened={opened} onClose={close} title="Schedule an Interview">
                <div className="flex flex-col gap-5">
                    <DateInput
                        minDate={new Date()}
                        maxDate={dayjs(new Date()).add(1, 'month').toDate()}
                        label="Date"
                        placeholder="Enter Date"
                        value={date}
                        onChange={setDate}
                    />
                    <TimeInput
                        label="Time"
                        ref={ref}
                        onClick={() => ref.current?.showPicker()}
                        value={time}
                        onChange={(event) => setTime(event.currentTarget.value)}
                    />
                    <Button onClick={() => handleInterview("INTERVIEWING")} variant="light" color="web-orange.5" fullWidth>
                        Schedule
                    </Button>
                </div>
            </Modal>

            <Modal opened={app} onClose={closeApp} title="Application">
                <div className="flex flex-col gap-5">
                    <div>
                        Email: &emsp;<a className="text-web-orange-400 hover:underline cursor-pointer" href={`mailto:${props.email}`}>{props.email}</a>
                    </div>
                    <div>
                        Links: &emsp;<a target="_blank" className="text-web-orange-400 hover:underline cursor-pointer" href={props.links}>{props.links}</a>
                    </div>
                    <div>
                        Resume: &emsp;<span className="text-web-orange-400 hover:underline cursor-pointer" onClick={() => openResumeFromBase64(props.resume)}>{props.name} Resume</span>
                    </div>
                    <div>
                        CoverLetter: &emsp;<div>{props.coverLetter}</div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default TalentCard;
