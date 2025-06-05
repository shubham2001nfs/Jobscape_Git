import { IconUserCircle } from "@tabler/icons-react";
import { searchFields } from "../Data/TalentData";
import MultiInput from "../FindJobs/MultiInput";
import { Divider, Input, RangeSlider } from "@mantine/core";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateFilter } from "../Slices/FilterSlice";

const Searchbar = () => {
    const [value, setValue] = useState<[number, number]>([0, 50]);
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const handleChange = (name: any, event: any) => {
        if (name == "exp") {
            dispatch(updateFilter({ exp: event }))
        }
        else {
            (event.target.value)
            dispatch(updateFilter({ name: event.target.value }))
        }
    }
    return (

        <div className="flex justify-between gap-3 px-1">
            <div className="flex flex-1">
                <div className="text-web-orange-500 rounded-full bg-mine-shaft-900 p-1 mr-2">
                    <IconUserCircle size={27} />
                </div>
                <Input defaultValue={name} onChange={(e) => handleChange("name", e)} variant="unstyled" placeholder="Talent Name" className="[&_input]:!placeholder-mine-shaft-200" />

            </div>
            <Divider size="xs" orientation="vertical" />
            {
                searchFields.map((item, index) => <>
                    <div key={index} className="min-w-[180px] flex-1">
                        <MultiInput {...item} />
                    </div>
                    <Divider size="xs" orientation="vertical" />
                </>)
            }
            <div className="min-w-[180px] flex-1 [&_.matine-Slider-root]:!translate-y-10">
                <div className="flex justify-between text-sm">
                    <div>Experience</div>
                    <div>{value[1]} Years</div>
                </div>
                <RangeSlider
                    minRange={1}
                    onChangeEnd={(e) => handleChange("exp", e)}
                    color="web-orange"
                    size={"sm"}
                    value={value}
                    onChange={setValue}
                    max={50}
                    min={0}
                    labelTransitionProps={{
                        transition: 'skew-down',
                        duration: 150,
                        timingFunction: 'li near',
                    }}
                />
            </div>
        </div>

    )
}
export default Searchbar;