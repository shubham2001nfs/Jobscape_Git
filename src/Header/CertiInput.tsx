import { Button, TextInput } from "@mantine/core";
import fields from "../Data/Profile";
import SelectInput from "./SelectInput";
import { MonthPickerInput } from "@mantine/dates";
import { useState } from "react";
import { isNotEmpty, useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";


const CertiInput = (props: any) => {
    const [issueDate, setIssueDate] = useState<Date | null>(new Date());
    const profile = useSelector((state: any) => state.profile);
    const dispatch = useDispatch();
    const form = useForm({
        mode: 'controlled',
        initialValues: { name: '', issuer: '', issueDate: new Date(), certificateId: '' },
        validateInputOnChange: true,
        validate: {
            name: isNotEmpty("Name is required!"),
            issuer: isNotEmpty("Issuer is required!"),
            issueDate: isNotEmpty("Issue Date is required!"),
            certificateId: isNotEmpty("Certificate Id is required!")
        }

    });
    const handleSave = async () => {
        const validation = await form.validate();
        if (!validation.hasErrors) {
            let cer = [...profile.certificates]
            const formValues = form.getValues();

            const cerEntry = { ...formValues, issueDate: formValues.issueDate.toISOString() }
            if (props.addCerti) {
                cer.push(cerEntry)
            }
            else {
                cer[props.index] = cerEntry;
            }

            const updatedProfile = { ...profile, certificates: cer };
            dispatch(changeProfile(updatedProfile));
            props.setEdit(false);

            notifications.show({
                title: 'Success',
                message: `Certification ${props.addCerti ? "added" : "updated"} successfully`,
                icon: <IconCheck />,
                color: "teal",
                autoClose: 3000,
            });
        }



    }
    const select = fields;
    return (
        <div className="flex flex-col gap-3 mt-2">
            <div className="text-lg font-semibold ml-1 mt-3">Add Certificate</div>
            <div className="flex gap-10 [&>*]:w-1/2">
                <TextInput label="Title" {...form.getInputProps("name")} withAsterisk placeholder="Enter Title" />
                <SelectInput form={form} name="issuer"  {...select[1]} />

            </div>
            <div className="flex gap-10 [&>*]:w-1/2">
                <MonthPickerInput
                    label="Issued Date"
                    placeholder="Choose Date"
                    {...form.getInputProps("issueDate")}
                    value={issueDate}
                    onChange={setIssueDate}
                    maxDate={new Date()}
                    withAsterisk
                />
                <TextInput label="Certificate Id" {...form.getInputProps("certificateId")} withAsterisk placeholder="Enter Id" />
            </div>
            <div className="flex gap-5 mt-2">
                <Button onClick={handleSave} variant="outline" color="web-orange" className="!w-3/3" >Save</Button>
                <Button onClick={() => props.setEdit(false)} variant="light" color="red.6" className="!w-3/3" >Cancel</Button>
            </div>


        </div>
    )
}

export default CertiInput;