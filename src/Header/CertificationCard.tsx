import { ActionIcon } from "@mantine/core";
import { IconBookmark, IconCheck, IconTrash } from "@tabler/icons-react";
import { formatDate } from "../Services/Utilities";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";
import { notifications } from "@mantine/notifications";
import { useState } from "react";

const CertificationCard = (props: any) => {
    const profile = useSelector((state: any) => state.profile);
    const [edit, setEdit] = useState(false);
    const dispatch = useDispatch();
    const handleDelete = () => {
        let cer = [...profile.certificates];
        cer.splice(props.index, 1);
        let updatedProfile = { ...profile, certificates: cer };
        setEdit(false);
        dispatch(changeProfile(updatedProfile));
        notifications.show({
            title: 'Success',
            message: "Certification deleted successfully",
            icon: <IconCheck />,
            color: "teal",
            autoClose: 3000,
        });
    }
    return (
        <div>
            <div className="flex justify-between mt-4 px-1">
                <div className="flex gap-2 items-center mt-1">
                    <div className="p-2 bg-mine-shaft-800 rounded-md">
                        <img className="w-7 h-7" src={`/Icons/${props.issuer}.png`} alt="Issuer logo" />
                    </div>
                    <div className="p-2">
                        <div className="text-mine-shaft-100 font-semibold">{props.name}</div>
                    </div>
                </div>

                {/* Dates aligned at the end and centered vertically */}
                <div className="flex items-center gap-2">
                    <div className="text-sm flex flex-col ml-auto justify-center items-center">
                        <div>Issue date: {formatDate(props.issueDate)}</div>
                        <div>ID: {props.certificateId}</div>
                    </div>
                    {props.edit && <ActionIcon color="red.6" size={"lg"} variant="subtle" onClick={handleDelete}>

                        <IconTrash className="w-4/5 h-4/5" stroke={1.5} />
                    </ActionIcon>}
                </div>

            </div>
        </div>
    );
};

export default CertificationCard;
