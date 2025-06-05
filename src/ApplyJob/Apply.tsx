import { Button, Divider, FileInput, LoadingOverlay, NumberInput, Textarea, TextInput } from "@mantine/core";
import { IconCheck, IconPaperclip } from "@tabler/icons-react";
import { useState } from "react";
import { Notification } from "@mantine/core";
import { timeAgo } from "../Services/Utilities";
import ApplicationForm from "./ApplicationForm";

const Apply = (props: any) => {

    const [submit, setSubmit] = useState(false);
    const [time, setTime] = useState(5);



    return (
        <>
            <div className="w-2/3 mx-auto py-5">
                <LoadingOverlay className="!fixed"
                    visible={submit}
                    zIndex={1000}
                    overlayProps={{ radius: 'xs', blur: 2 }}
                    loaderProps={{ color: 'web-orange', type: 'bars' }}
                />
                <div className="flex gap-2 items-center">
                    <div className="p-2 bg-mine-shaft-800 rounded-md">
                        <img className="w-14 h-14" src={`/Icons/${props.company}.png`} alt="Google" />
                    </div>
                    <div className="p-2">
                        <div className="text-mine-shaft-100 font-semibold text-2xl">{props.jobTitle}</div>
                        <div className="text-mine-shaft-200 text-lg">{props.company} &#x2022;  {timeAgo(props.postTime)} &#x2022; {props.applicants ? props.applicants.length : 0} Applicants </div>
                    </div>
                </div>
                <Divider size="xs" className="mb-2 mt-4" />
                <ApplicationForm />
            </div>

            <Notification
                icon={<IconCheck size={20} />}
                className={`!fixed top-0 left-[70%] transform transition-all duration-500 ease-in-out ${submit ? "translate-y-20" : "-translate-y-20"} z-[1001]`}
                withBorder
                color="teal"
                title="Application Submitted!"
                mt="md"
                withCloseButton={false}

            >
                Redirecting to Find Jobs in {time} seconds...
            </Notification>
        </>
    );
};

export default Apply;
