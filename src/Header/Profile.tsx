import {
    IconBriefcase,
    IconCheck,
    IconDeviceFloppy,
    IconEdit,
    IconMapPin,
    IconPencil,
    IconPlus,
    IconX,
} from "@tabler/icons-react";
import {
    ActionIcon,
    Avatar,
    Button,
    Divider,
    FileInput,
    Overlay,
    TagsInput,
    Textarea,
} from "@mantine/core";

import { useEffect, useState } from "react";
import fields from "../Data/Profile";
import { getProfile, updateProfile } from "../Services/ProfileService";
import { useDispatch, useSelector } from "react-redux";
import Info from "./Info";
import { changeProfile, setProfile } from "../Slices/ProfileSlice";
import AboutSection from "./AboutSection";
import SkillsSection from "./SkillsSection";
import ExperienceSection from "./ExperienceSection";
import CertificationSection from "./CertificationSection";
import { useHover } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";

const Profile = () => {
    const user = useSelector((state: any) => state.user);
    const profile = useSelector((state: any) => state.profile);
    const dispatch = useDispatch();
    const select = fields;
    const [edit, setEdit] = useState([false, false, false, false, false]);
    const [addExp, setAddExp] = useState(false);
    const { hovered, ref } = useHover();
    const [skills, setSkills] = useState([
        "React", "SpringBoot", "MongoDB", "HTML", "CSS", "JavaScript", "Node.js",
        "Express", "MySQL", "Python", "Django", "Figma", "Sketch", "Docker", "AWS",
    ]);
    const [about, setAbout] = useState(
        "As a Software Engineer at Google, I specialize in building scalable and high-performance applications. My expertise lies in integrating front-end and back-end technologies to deliver seamless user experiences. With a strong foundation in React and SpringBoot, and a focus on MongoDB for database solutions, I am passionate about leveraging the latest technologies to solve complex problems and drive innovation. My goal is to create impactful software that enhances productivity and meets user needs effectively."
    );

    const handleEdit = (index: number) => {
        const newEdit = [...edit];
        newEdit[index] = !newEdit[index];
        setEdit(newEdit);
        console.log(newEdit);
    };

    useEffect(() => {
        getProfile(user.id)
            .then((data: any) => {
                dispatch(setProfile(data));
                console.log("Fetched data:", data);
            })
            .catch((error: any) => {
                console.log("Profile fetch error:", error);
            });
    }, []);

    const handleFileChange = async (image: any) => {
        try {
            if (!image) {
                notifications.show({
                    title: "Error",
                    message: "No image selected.",
                    icon: <IconX />,
                    color: "red",
                    autoClose: 3000,
                });
                return;
            }

            // Handle file validation
            const file = image[0];  // Assuming `image` is an array of files
            if (file && !["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
                notifications.show({
                    title: "Error",
                    message: "Please upload a valid image (JPG/PNG).",
                    icon: <IconX />,
                    color: "red",
                    autoClose: 3000,
                });
                return;
            }

            let base64 = await getBase64(file);  // 🧠 use image, not file
            base64 = base64.split(",")[1];        // strip MIME type

            const updatedProfile = {
                ...profile,
                picture: base64,
            };

            await updateProfile(updatedProfile);
            dispatch(changeProfile(updatedProfile));

            notifications.show({
                title: "Success",
                message: "Profile picture updated successfully",
                icon: <IconCheck />,
                color: "teal",
                autoClose: 3000,
            });
        } catch (error) {
            console.error("Error updating profile picture:", error);
            notifications.show({
                title: "Error",
                message: "Failed to update profile picture.",
                icon: <IconX />,
                color: "red",
                autoClose: 3000,
            });
        }
    };

    const getBase64 = (file: any) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        });
    };

    return (
        <div className="w-4/5 mx-auto px-4 py-10 mb-10">
            <div className="relative">
                <img className="rounded-t-xl w-full" src="banner.jpg" alt="banner" />
                <div className="absolute -bottom-3 left-3 flex items-center justify-center cursor-pointer" ref={ref}>
                    <Avatar
                        src={
                            profile?.picture
                                ? `data:image/jpg;base64,${profile.picture}`
                                : "avatar.png"
                        }
                        alt="avatar"
                        radius="xl"
                        className="!w-48 !h-48 !rounded-full border-8 border-white shadow-lg"
                    />
                    {hovered && (
                        <>
                            <Overlay
                                color="#000"
                                backgroundOpacity={0.25}
                                className="!rounded-full absolute z-[300]"
                            />
                            <FileInput
                                className="absolute z-[301] w-full h-full [&_*]:!h-full [&_*]:!rounded-full"
                                variant="transparent"
                                accept="image/png,image/jpeg,image/jpg"
                                onChange={handleFileChange}
                            />
                            <IconEdit className="absolute z-[302] text-mine-shaft-100 !w-16 !h-16" stroke={1.5} />
                        </>
                    )}
                </div>
            </div>

            <div className="mt-10">
                <Info />
                <Divider size="xs" className="mt-10" />
                <AboutSection />
                <SkillsSection />
                <Divider size="xs" className="mt-10" />
                <ExperienceSection />
                <Divider size="xs" className="mt-10" />
                <CertificationSection />
            </div>
        </div>
    );
};

export default Profile;
