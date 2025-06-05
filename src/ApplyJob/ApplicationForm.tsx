import { Button, FileInput, LoadingOverlay, NumberInput, Textarea, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { IconCheck, IconPaperclip, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { applyJob } from "../Services/JobService";
import { useNavigate, useParams } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { useSelector } from "react-redux";

const ApplicationForm = () => {
    const [preview, setPreview] = useState(false);
    const [submit, setSubmit] = useState(false);
    const { id } = useParams();
    const user = useSelector((state: any) => state.user);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handlePreview = () => {
        form.validate();
        window.scroll({ top: 0, behavior: 'smooth' });
        if (!form.isValid()) {
            return;
        }
        // If we get here, form is valid, so toggle preview
        setPreview(!preview);
    };

    const handleSubmit = () => {
        setSubmit(true);
        const applicant = form.getValues();

        // Convert the resume file to Base64 string
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64Resume = reader.result as string;
            const dataToSend = {
                ...applicant,
                resume: base64Resume,
                applicantId: user.id
            };

            applyJob(id, dataToSend)
                .then(() => {
                    setSubmit(false);
                    setLoading(true);
                    notifications.show({
                        title: 'Success',
                        message: "Application Submitted Successfully",
                        icon: <IconCheck />,
                        color: "teal",
                        autoClose: 3000,
                    });
                    setTimeout(() => {
                        setLoading(false);
                        navigate("/job-history")
                    }, 3000)

                })
                .catch((error) => {
                    setSubmit(false);
                    notifications.show({
                        title: 'Failed',
                        message: "Application Already Submitted",
                        icon: <IconX />,
                        color: "red.6",
                        autoClose: 3000,
                    });
                });
        };

        if (applicant.resume instanceof File) {
            reader.readAsDataURL(applicant.resume); // This converts file to base64
        } else {
            notifications.show({
                title: 'Error',
                message: "Resume must be a PDF file",
                icon: <IconX />,
                color: "red.6",
                autoClose: 3000,
            });
            setSubmit(false);
        }
    };
    const form = useForm({
        mode: 'controlled',
        initialValues: { name: '', email: '', phone: '', website: '', resume: null, coverLetter: '' },
        validateInputOnChange: true,
        validate: {
            name: isNotEmpty("Name is required!"),
            email: isNotEmpty("Email is required!"),
            phone: isNotEmpty("Phone number is required!"),
            website: isNotEmpty("Links are required!"),
            resume: isNotEmpty("Attach the resume!")
        }

    });
    return (
        <>
            <LoadingOverlay
                visible={loading}
                zIndex={200}
                overlayProps={{ radius: 'sm', blur: 2 }}
                loaderProps={{ color: 'web-orange', type: 'bars' }}
            />
            <div className="text-xl font-semibold mt-4 mb-4">Submit your Application</div>
            <div className="flex flex-col gap-5 mt-2">
                <div className="flex gap-10 [&>*]:w-1/2">
                    <TextInput
                        label="Full Name"
                        placeholder="Enter name"
                        withAsterisk
                        readOnly={preview}
                        variant={preview ? "unstyled" : "default"}
                        className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`}
                        {...form.getInputProps('name')}
                    />
                    <TextInput
                        label="Email"
                        placeholder="Enter email"
                        withAsterisk
                        readOnly={preview}
                        variant={preview ? "unstyled" : "default"}
                        className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`}
                        {...form.getInputProps('email')}
                    />
                </div>
                <div className="flex gap-10 [&>*]:w-1/2">
                    <NumberInput
                        label="Phone Number"
                        placeholder="Enter number"
                        withAsterisk
                        hideControls
                        min={0}
                        max={9999999999}
                        clampBehavior="strict"
                        readOnly={preview}
                        variant={preview ? "unstyled" : "default"}
                        className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`}
                        {...form.getInputProps('phone')}
                    />
                    <TextInput
                        label="Links"
                        placeholder="Enter url"
                        withAsterisk
                        readOnly={preview}
                        variant={preview ? "unstyled" : "default"}
                        className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`}
                        {...form.getInputProps('website')}

                    />
                </div>

                <FileInput
                    leftSection={<IconPaperclip stroke={1.5} />}
                    label="Attach Resume"
                    placeholder="Attach Resume"
                    accept="application/pdf"
                    withAsterisk
                    readOnly={preview}
                    variant={preview ? "unstyled" : "default"}
                    className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`}
                    {...form.getInputProps('resume')}

                />
                <Textarea
                    label="Cover Letter"
                    placeholder="Type something about yourself...."
                    autosize
                    minRows={4}
                    withAsterisk
                    readOnly={preview}
                    variant={preview ? "unstyled" : "default"}
                    className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`}
                    {...form.getInputProps('coverLetter')}
                />
                {!preview && <Button onClick={handlePreview} className="!w-1/5 mt-5" variant="outline">Preview</Button>}
                {preview && (
                    <div className="flex gap-3">
                        <Button onClick={handlePreview} className="!w-1/5 mt-5" variant="outline">Edit</Button>
                        <Button onClick={handleSubmit} className="!w-1/5 mt-5" variant="outline">Submit</Button>
                    </div>
                )}
            </div>
        </>
    )
}
export default ApplicationForm;