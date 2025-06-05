import { ActionIcon } from "@mantine/core";
import { IconDeviceFloppy, IconPencil, IconPlus, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import ExperienceCard from "./ExperienceCard";
import ExpInput from "./ExpInput";

const ExperienceSection = () => {
    const [edit, setEdit] = useState([false, false, false, false, false]);
    const profile = useSelector((state: any) => state.profile);
    const handleEdit = (index: number) => {
        const newEdit = [...edit];
        newEdit[index] = !newEdit[index];
        setEdit(newEdit);
        console.log(newEdit);
    };

    const [addExp, setAddExp] = useState(false);
    return (
        <div>
            <div className="text-2xl font-semibold mt-4 mx-1 flex justify-between">
                Experience
                <div className="flex gap-4">
                    <ActionIcon onClick={() => setAddExp(true)} color="web-orange.5" size={"lg"} variant="subtle">
                        <IconPlus className="w-4/5 h-4/5" stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon color={edit[3] ? "red.8" : "web-orange.5"} size={"lg"} variant="subtle">
                        {edit[3] ? (
                            <IconX onClick={() => handleEdit(3)} className="w-8 h-8" stroke={1.5} />
                        ) : (
                            <IconPencil onClick={() => handleEdit(3)} className="w-4/5 h-4/5" stroke={1.5} />
                        )}
                    </ActionIcon>
                </div>
            </div>
            {profile?.experiences?.map((item: any, index: number) => (
                <ExperienceCard key={index} {...item} index={index} edit={edit[3]} />
            ))}
            {addExp && <ExpInput add setEdit={setAddExp} />}
        </div>

    )
}

export default ExperienceSection;