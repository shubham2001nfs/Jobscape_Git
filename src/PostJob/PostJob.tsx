import { content, fields } from "../Data/PostJob";
import SelectInput from "./SelectInput";
import { Button, NumberInput, TagsInput, Textarea } from "@mantine/core";
import TextEditor from "./TextEditor";
import { isNotEmpty, useForm } from "@mantine/form";
import { getJob, postJob } from "../Services/JobService";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const PostJob = (props: any) => {
    const { id } = useParams();
    const [editor, setEditor] = useState(content);
    const navigate = useNavigate();
    const user = useSelector((state: any) => state.user);
    const select = fields;
    useEffect(() => {
        window.scrollTo(0, 0);
        if (id !== "0") {
            getJob(id).then((res) => {
                form.setValues(res);
                setEditor(res.description)
            }).catch((error) => {
                console.log(error);
            })
        }
        else {
            form.reset();
            setEditor(content);
        }
    }, [id])
    const form = useForm({
        mode: 'controlled',
        initialValues: { jobTitle: '', company: '', experience: '', jobType: '', location: '', packageOffered: '', skillsRequired: [], about: '', description: content },
        validateInputOnChange: true,
        validate: {
            jobTitle: isNotEmpty("Job Title is required!"),
            company: isNotEmpty("Company is required!"),
            jobType: isNotEmpty("Job Type is required!"),
            location: isNotEmpty("Localtion is required!"),
            packageOffered: isNotEmpty("Package Offered is required!"),
            skillsRequired: isNotEmpty("Skills is required!"),
            about: isNotEmpty("About is required!"),
            description: isNotEmpty("Description is required!")
        }

    });

    const handlePostJob = () => {
        form.validate();
        if (!form.isValid) {
            return;
        }
        const values = form.getValues();
        console.log(form.getValues());
        const jobPayload: {
            id?: string;
            postedBy: any;
            jobStatus: string;
            jobTitle: string;
            company: string;
            experience: string;
            jobType: string;
            location: string;
            packageOffered: string;
            skillsRequired: string[];
            about: string;
            description: string;
        } = {
            ...values,
            postedBy: user.id,
            jobStatus: "OPEN",
        };

        if (id !== "0") {
            jobPayload.id = id; // Only include id for editing
        }

        postJob(jobPayload)
            .then((res) => {
                notifications.show({
                    title: 'Success',
                    message: `Job published successfully`,
                    icon: <IconCheck />,
                    color: "teal",
                    autoClose: 3000,
                });
                navigate(`/posted-job/${res.id}`);
            })
            .catch((error) => {
                console.log(error);
                notifications.show({
                    title: 'Failed',
                    message: error.response.data.errorMessage,
                    icon: <IconX />,
                    color: "red.6",
                    autoClose: 3000
                })
            })
    }

    const handleDraftJob = () => {
        form.validate();
        if (!form.isValid) {
            return;
        }
        const values = form.getValues();
        console.log(form.getValues());
        const jobPayload: {
            id?: string;
            postedBy: any;
            jobStatus: string;
            jobTitle: string;
            company: string;
            experience: string;
            jobType: string;
            location: string;
            packageOffered: string;
            skillsRequired: string[];
            about: string;
            description: string;
        } = {
            ...values,
            postedBy: user.id,
            jobStatus: "Drafted",
        };

        if (id !== "0") {
            jobPayload.id = id; // Only include id for editing
        }

        postJob(jobPayload)
            .then((res) => {
                notifications.show({
                    title: 'Success',
                    message: `Job published successfully`,
                    icon: <IconCheck />,
                    color: "teal",
                    autoClose: 3000,
                });
                navigate(`/posted-job/${res.id}`);
            })
            .catch((error) => {
                console.log(error);
                notifications.show({
                    title: 'Failed',
                    message: error.response.data.errorMessage,
                    icon: <IconX />,
                    color: "red.6",
                    autoClose: 3000
                })
            })
            .catch((error) => {
                console.log(error);
                notifications.show({
                    title: 'Failed',
                    message: error.response.data.errorMessage,
                    icon: <IconX />,
                    color: "red.6",
                    autoClose: 3000
                })
            })
    }
    return (
        <div className="w-4/5 mx-auto mt-8">
            <div className="text-2xl font-semibold mb-8">Publish a Job Opening</div>
            <div className=" flex flex-col gap-10">
                <div className="flex gap-10 [&>*]:w-1/2">
                    <SelectInput form={form} name="jobTitle"{...select[0]} />
                    <SelectInput form={form} name="company" {...select[1]} />
                </div>
                <div className="flex gap-10 [&>*]:w-1/2">
                    <SelectInput form={form} name="experience" {...select[2]} />
                    <SelectInput form={form} name="jobType" {...select[3]} />
                </div>
                <div className="flex gap-10 [&>*]:w-1/2">
                    <SelectInput form={form} name="location" {...select[4]} />
                    <NumberInput {...form.getInputProps('packageOffered')} label="Salary" placeholder="Enter Salary" min={1} max={300} clampBehavior="strict" hideControls withAsterisk />
                </div>
                <TagsInput {...form.getInputProps('skillsRequired')} withAsterisk label="Skills" placeholder="Enter skills" clearable acceptValueOnBlur splitChars={[',', ' ', '|']} />
                <Textarea
                    {...form.getInputProps("about")}
                    autosize
                    label="About Job"
                    placeholder="Enter about job...."
                    minRows={3}
                    withAsterisk
                />
                <div className="[&_button[data-active='true']]:!text-mine-shaft-200 [&_button[data-active='true']]:!bg-web-orange-600">
                    <div>Job Description <span className="text-red-500">*</span></div>
                    <TextEditor form={form} data={editor} />
                </div>
                <div>
                    <div className="flex gap-4 mt-3">
                        <Button onClick={handlePostJob} variant="outline">Publish Job</Button>
                        <Button variant="outline" onClick={handleDraftJob}>Save as Draft</Button>
                    </div>

                </div>

            </div>

        </div>

    );
}

export default PostJob;
