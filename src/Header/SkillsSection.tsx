import { ActionIcon, TagsInput } from "@mantine/core";
import { IconCheck, IconPencil, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";
import { notifications } from "@mantine/notifications";

const SkillsSection = () => {
    const profile = useSelector((state: any) => state.profile);
    const [edit, setEdit] = useState([false, false, false, false, false]);
    const dispatch = useDispatch();
    const [skills, setSkills] = useState([
        "React", "SpringBoot", "MongoDB", "HTML", "CSS", "JavaScript", "Node.js", "Express",
        "MySQL", "Python", "Django", "Figma", "Sketch", "Docker", "AWS"
    ]);
    const handleEdit = (index: number) => {
        const newEdit = [...edit];

        if (newEdit[index]) {
            const updatedProfile = {
                ...profile,
                skills: skills,
            };

            dispatch(changeProfile(updatedProfile));
            setSkills(profile?.skills);
            notifications.show({
                title: 'Success',
                message: 'Skills updated Successfully',
                icon: <IconCheck />,
                color: "teal",
                autoClose: 3000
            })
        }
        else {
            setSkills(profile?.skills);
        }

        newEdit[index] = !newEdit[index];
        setEdit(newEdit);
    };

    const handleCancel = (index: any) => {
        const newEdit = [...edit];
        newEdit[index] = !newEdit[index];
        setEdit(newEdit);
        setSkills(profile?.skills);

    }
    return (
        <>
            <div className="text-2xl font-semibold mt-4 mx-1 flex justify-between mb-8">
                Skills
                <div>
                    {edit[2] && <ActionIcon color="green.8" size={"lg"} variant="subtle">
                        <IconCheck className="w-8 h-8" onClick={() => handleEdit(2)} stroke={1.5} />
                    </ActionIcon>}
                    <ActionIcon color={edit[2] ? "red.8" : "web-orange.5"} size={"lg"} variant="subtle">
                        {edit[2] ? (
                            <IconX className="w-8 h-8" onClick={() => handleCancel(2)} stroke={1.5} />
                        ) : (
                            <IconPencil onClick={() => handleEdit(2)} className="w-8 h-8" stroke={1.5} />
                        )}
                    </ActionIcon>
                </div>
            </div>
            <div className="text-sm text-mine-shaft-200 text-justify mt-2 px-1">
                {edit[2] ? (
                    <TagsInput
                        placeholder="Add Skill"
                        value={skills}
                        onChange={setSkills}
                        splitChars={[',', ' ', '|']}
                    />
                ) : (
                    <div className="flex flex-wrap mt-1 gap-4 my-3">
                        {profile?.skills?.map((item: any, index: number) => (
                            <div
                                key={index}
                                className="bg-mine-shaft-900 text-web-orange-500 rounded-full border-2 border-web-orange-500 text-md px-2 py-1"
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}

export default SkillsSection;