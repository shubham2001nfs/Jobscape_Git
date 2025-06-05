import { Anchor, Button, Checkbox, Textarea } from "@mantine/core";
import fields from "../Data/Profile";
import SelectInput from "./SelectInput";
import { useState } from "react";
import { MonthPickerInput } from "@mantine/dates";
import { useDispatch, useSelector } from "react-redux";
import { isNotEmpty, useForm } from "@mantine/form";
import { useEffect } from "react";
import { changeProfile, setProfile } from "../Slices/ProfileSlice";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";

const ExpInput = (props: any) => {
    const [checked, setChecked] = useState(false);
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [endDate, setEndDate] = useState<Date | null>(new Date());
    const profile = useSelector((state: any) => state.profile);
    const dispatch = useDispatch();

    const form = useForm({
        mode: 'controlled',
        initialValues: { title: '', company: '', location: '', description: '', startDate: new Date(), endDate: new Date(), working: false },
        validateInputOnChange: true,
        validate: {
            title: isNotEmpty("Title is required!"),
            company: isNotEmpty("Company is required!"),
            location: isNotEmpty("Location is required!"),
            description: isNotEmpty("Description is required!")
        }

    });

    const handleSave = async () => {
        const validation = await form.validate();
        if (!validation.hasErrors) {
            let exp = [...profile.experiences];
            const formValues = form.getValues();

            const expEntry = {
                ...formValues,
                startDate: formValues.startDate.toISOString(),
                endDate: formValues.endDate.toISOString(),
            };

            if (props.add) {
                exp.push(expEntry);
            } else {
                exp[props.index] = expEntry;
            }

            const updatedProfile = { ...profile, experiences: exp };
            dispatch(changeProfile(updatedProfile));
            props.setEdit(false);

            notifications.show({
                title: 'Success',
                message: "Experience added successfully",
                icon: <IconCheck />,
                color: "teal",
                autoClose: 3000,
            });
        }
    };



    useEffect(() => {
        if (!props.add) form.setValues({ title: props.title, company: props.company, location: props.location, description: props.description, startDate: new Date(props.startDate), endDate: new Date(props.endDate), working: props.working })
    }, [])
    const select = fields;
    const [desc, setDesc] = useState("As a Software Engineer at Google, I am responsible for designing, developing, and maintaining scalable software solutions that enhance user experience and improve operational efficiency. My role involves collaborating with cross-functional teams to define project requirements, develop technical specifications, and implement robust applications using cutting-edge technologies. I actively participate in code reviews, ensuring adherence to best practices and coding standards, and contribute to the continuous improvement of the development process.");
    return (
        <div className="flex flex-col gap-4">
            <div className="text-lg font-semibold ml-1 mt-3">{props.add ? "Add" : "Edit"} Experience</div>
            <div className="flex gap-10 [&>*]:w-1/2">
                <SelectInput form={form} name="title" {...select[0]} />
                <SelectInput form={form} name="company" {...select[1]} />
            </div>
            <SelectInput form={form} name="location" {...select[2]} />
            <Textarea
                {...form.getInputProps("description")}
                autosize
                label="Summary"
                placeholder="Enter Summary....."
                minRows={3}
                withAsterisk
            />
            <div className="flex gap-10 [&>*]:w-1/2">
                <MonthPickerInput
                    {...form.getInputProps("startDate")}
                    label="Start Date"
                    placeholder="Choose Date"
                    maxDate={form.getValues().endDate || undefined}
                    withAsterisk
                />

                <MonthPickerInput
                    {...form.getInputProps("endDate")}
                    label="End Date"
                    placeholder="Choose Date"
                    maxDate={new Date()}
                    minDate={form.getValues().startDate || undefined}
                    withAsterisk
                    disabled={form.getValues().working}
                />
            </div>
            <Checkbox
                className="!mt-4"
                autoContrast
                label=" Currently Working here"
                checked={form.getValues().working}
                onChange={(event) => form.setFieldValue("working", event.currentTarget.checked)}
            />
            <div className="flex gap-5 mt-2">
                <Button onClick={handleSave} variant="outline" color="web-orange" className="!w-3/3" >Save</Button>
                <Button onClick={() => props.setEdit(false)} variant="light" color="red.6" className="!w-3/3" >Cancel</Button>
            </div>

        </div>
    )
}

export default ExpInput;