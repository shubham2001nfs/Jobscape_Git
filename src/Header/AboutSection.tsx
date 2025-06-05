import { ActionIcon, Textarea } from "@mantine/core";
import { IconCheck, IconDeviceFloppy, IconPencil, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";
import { notifications } from "@mantine/notifications";

const AboutSection = () => {
    const [edit, setEdit] = useState([false, false, false, false, false]);
    const dispatch = useDispatch();
    const profile = useSelector((state: any) => state.profile);
    const [about, setAbout] = useState("As a Software Engineer at Google, I specialize in building scalable and high-performance applications. My expertise lies in integrating front-end and back-end technologies to deliver seamless user experiences. With a strong foundation in React and SpringBoot, and a focus on MongoDB for database solutions, I am passionate about leveraging the latest technologies to solve complex problems and drive innovation. My goal is to create impactful software that enhances productivity and meets user needs effectively.");
    const handleEdit = (index: number) => {
        const newEdit = [...edit];

        if (newEdit[index]) {
            const updatedProfile = {
                ...profile,
                about: about,
            };


            dispatch(changeProfile(updatedProfile));
            setAbout(profile?.about);
            notifications.show({
                title: 'Success',
                message: 'About updated Successfully',
                icon: <IconCheck />,
                color: "teal",
                autoClose: 3000
            })
        }
        else {
            setAbout(profile?.about);
        }

        newEdit[index] = !newEdit[index];
        setEdit(newEdit);
    };

    const handleCancel = (index: any) => {
        const newEdit = [...edit];
        newEdit[index] = !newEdit[index];
        setEdit(newEdit);
        setAbout(profile?.about);

    }

    return (
        <div>
            <div className="text-2xl font-semibold mt-4 mx-1 justify-between flex mb-8">
                About
                <div>
                    {edit[1] && <ActionIcon color="green.8" size={"lg"} variant="subtle">
                        <IconCheck className="w-8 h-8" onClick={() => handleEdit(1)} stroke={1.5} />
                    </ActionIcon>}
                    <ActionIcon color={edit[1] ? "red.8" : "web-orange.5"} size={"lg"} variant="subtle">
                        {edit[1] ? (
                            <IconX className="w-8 h-8" onClick={() => handleCancel(1)} stroke={1.5} />
                        ) : (
                            <IconPencil onClick={() => handleEdit(1)} className="w-8 h-8" stroke={1.5} />
                        )}
                    </ActionIcon>
                </div>

            </div>
            {edit[1] ? (
                <Textarea
                    value={about}
                    autosize
                    placeholder="Enter about yourself......"
                    onChange={(event) => setAbout(event.currentTarget.value)}
                    minRows={3}
                />
            ) : (
                <div className="text-sm text-mine-shaft-200 text-justify mt-2 px-1">
                    {profile?.about}
                </div>
            )}
        </div>

    )
}

export default AboutSection;