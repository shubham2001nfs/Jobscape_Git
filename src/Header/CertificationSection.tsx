import { ActionIcon } from "@mantine/core";
import { IconDeviceFloppy, IconPencil, IconPlus, IconX } from "@tabler/icons-react";
import CertificationCard from "./CertificationCard";
import CertiInput from "./CertiInput";
import { useState } from "react";
import { useSelector } from "react-redux";

const CertificationSection = () => {
    const [edit, setEdit] = useState([false, false, false, false, false]);
    const [addCerti, setAddCerti] = useState(false);
    const profile = useSelector((state: any) => state.profile);
    const handleEdit = (index: number) => {
        const newEdit = [...edit];
        newEdit[index] = !newEdit[index];
        setEdit(newEdit);
        console.log(newEdit);
    };
    return (
        <div>
            <div className="text-2xl font-semibold mt-4 mx-1 flex justify-between">
                Certification
                <div className="flex gap-4">
                    <ActionIcon onClick={() => setAddCerti(true)} color="web-orange.5" size={"lg"} variant="subtle">
                        <IconPlus className="w-4/5 h-4/5" stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon color={edit[4] ? "red.8" : "web-orange.5"} size={"lg"} variant="subtle">
                        {edit[4] ? (
                            <IconX onClick={() => handleEdit(4)} className="w-8 h-8" stroke={1.5} />
                        ) : (
                            <IconPencil onClick={() => handleEdit(4)} className="w-4/5 h-4/5" stroke={1.5} />
                        )}
                    </ActionIcon>
                </div>
            </div>
            {profile?.certificates?.map((item: any, index: number) => (
                <CertificationCard key={index} index={index} {...item} edit={edit[4]} />
            ))}
            {addCerti && <CertiInput setEdit={setAddCerti} addCerti={true} />}
        </div>
    )
}

export default CertificationSection;