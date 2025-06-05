import { ActionIcon, NumberInput, TextInput } from "@mantine/core";
import { IconBriefcase, IconCheck, IconDeviceFloppy, IconGraph, IconMapPin, IconPencil, IconX } from "@tabler/icons-react";
import SelectInput from "./SelectInput";
import { useState } from "react";
import fields from "../Data/Profile";
import { hasLength, isEmail, useForm } from '@mantine/form';
import { useDispatch, useSelector } from "react-redux";
import { changeProfile, setProfile } from "../Slices/ProfileSlice";
import { notifications } from "@mantine/notifications";

const Info = () => {
    const profile = useSelector((state: any) => state.profile);
    const user = useSelector((state: any) => state.user);
    const dispatch = useDispatch();
    const select = fields;
    const [edit, setEdit] = useState([false]);
    const handleEdit = (index: number) => {
        const newEdit = [...edit];

        if (newEdit[index]) {
            const updatedProfile = {
                ...profile,
                ...form.getValues(),
            };
            console.log(updatedProfile)
            dispatch(changeProfile(updatedProfile));
            console.log(profile)
            notifications.show({
                title: 'Success',
                message: 'Profile updated Successfully',
                icon: <IconCheck />,
                color: "teal",
                autoClose: 3000
            })
        } else {
            form.setValues({
                name: profile.name,
                jobTitle: profile.jobTitle || '',
                company: profile.company || '',
                totalExp: profile.totalExp || '0',
                location: profile.location || '',
            });
        }

        newEdit[index] = !newEdit[index];
        setEdit(newEdit);
    };
    const handleCancel = (index: any) => {
        const newEdit = [...edit];
        newEdit[index] = !newEdit[index];
        setEdit(newEdit);

    }

    const form = useForm({
        mode: 'controlled',
        initialValues: { name: '', jobTitle: '', company: '', totalExp: '', location: '' }

    });

    return (
        <>
            <div className="flex justify-between text-3xl font-semibold">

                {user.name}
                <div>
                    {edit[0] && <ActionIcon color="green.8" size={"lg"} variant="subtle">
                        <IconCheck className="w-8 h-8" onClick={() => handleEdit(0)} stroke={1.5} />
                    </ActionIcon>}
                    <ActionIcon color={edit[0] ? "red.8" : "web-orange.5"} size={"lg"} variant="subtle">
                        {edit[0] ? (
                            <IconX className="w-8 h-8" onClick={() => handleCancel(0)} stroke={1.5} />
                        ) : (
                            <IconPencil onClick={() => handleEdit(0)} className="w-8 h-8" stroke={1.5} />
                        )}
                    </ActionIcon>
                </div>

            </div>

            {edit[0] ? (
                <>
                    <div className="flex gap-10 [&>*]:w-1/2 h-20 mt-2 ">

                        <SelectInput form={form} name="jobTitle" {...select[0]} />
                        <SelectInput form={form} name="company" {...select[1]} />
                        <NumberInput {...form.getInputProps('totalExp')} label="Total Experience" withAsterisk min={0} max={40} />
                    </div>
                    <SelectInput form={form} name="location" {...select[2]} />

                </>
            ) : (
                <>
                    <div className="text-xl flex gap-1 items-center">
                        <IconBriefcase stroke={1.5} /> {profile.jobTitle} &#x2022; {profile.company}
                    </div>
                    <div className="flex gap-1 text-lg items-center text-mine-shaft-300">
                        <IconMapPin stroke={1.5} /> {profile.location}

                    </div>
                    <div className="flex gap-1 text-lg items-center text-mine-shaft-300">
                        <IconGraph stroke={1.5} /> {profile.totalExp > 1 ? `${profile.totalExp} Years` : profile.totalExp == null || profile.totalExp == 0 ? "Fresher" : `${profile.totalExp} Year`}

                    </div>

                </>
            )}
        </>
    );
};

export default Info;
