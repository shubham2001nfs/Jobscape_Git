import { Button } from "@mantine/core";
import { IconBookmark, IconCheck } from "@tabler/icons-react";
import { useState } from "react";
import ExpInput from "./ExpInput";
import { formatDate } from "../Services/Utilities";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";
import { notifications } from "@mantine/notifications";

const ExperienceCard = (props: any) => {
    const [edit, setEdit] = useState(false);
    const profile = useSelector((state: any) => state.profile);
    const dispatch = useDispatch();
    const handleDelete = () => {
        let exp = [...profile.experiences];
        exp.splice(props.index, 1);
        let updatedProfile = { ...profile, experiences: exp };
        setEdit(false);
        dispatch(changeProfile(updatedProfile));
        notifications.show({
            title: 'Success',
            message: "Experience deleted successfully",
            icon: <IconCheck />,
            color: "teal",
            autoClose: 3000,
        });

    }
    return (
        !edit ? <div>
            <div className="flex justify-between mt-4 px-1 items-center">
                {/* Other content on the left */}
                <div className="flex gap-2 items-center mt-1">
                    <div className="p-2 bg-mine-shaft-800 rounded-md">
                        <img className="w-7 h-7" src={`/Icons/${props.company}.png`} alt="Meta logo" />
                    </div>
                    <div className="p-2">
                        <div className="text-mine-shaft-100 font-semibold">{props.title}</div>
                        <div className="text-mine-shaft-200 text-xs">{props.company} &#x2022; {props.location}</div>
                    </div>
                </div>

                {/* Dates centered at the end of the line */}
                <div className="text-sm py-2 ml-auto flex justify-center">
                    {formatDate(props.startDate)} - {props.working ? "Present" : formatDate(props.endDate)}
                </div>
            </div>
            <div className="text-sm px-1 text-justify mt-1">{props.description}</div>
            {props.edit && <div className="flex gap-5 mt-4">
                <Button onClick={() => setEdit(true)} variant="outline" color="web-orange" className="!w-3/3" >Edit</Button>
                <Button variant="light" color="red.6" className="!w-3/3" onClick={handleDelete} >Delete</Button>
            </div>}
        </div > : <ExpInput {...props} setEdit={setEdit} />
    );
};

export default ExperienceCard;
