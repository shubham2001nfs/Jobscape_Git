import { useDispatch } from "react-redux";
import { dropdownData } from "../Data/JobsData";
import MultiInput from "./MultiInput";
import { Divider, RangeSlider } from "@mantine/core";
import { useState } from "react";
import { updateFilter } from "../Slices/FilterSlice";

const Searchbar = () => {
    const [value, setValue] = useState<[number, number]>([1, 100]);
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const handleChange = (name: any, event: any) => {
        if (name == "sal") {
            dispatch(updateFilter({ sal: event }))
        }
        else {
            (event.target.value)
            dispatch(updateFilter({ name: event.target.value }))
        }
    }
    return (

        <div className=" flex gap-2 px-2">
            {
                dropdownData.map((item, index) => <> <div key={index} className="w-1/5">
                    <MultiInput {...item} />
                </div>  <Divider size="xs" orientation="vertical" /></>
                )
            }
            <div className="w-1/5 [&_.matine-Slider-root]:!translate-y-10">
                <div className="flex justify-between text-sm">
                    <div>Salary</div>
                    <div>&#8377; {value[0]} LPA - &#8377; {value[1]} LPA</div>
                </div>
                <RangeSlider minRange={1} onChangeEnd={(e) => handleChange("sal", e)} color="web-orange" size={"sm"} value={value} onChange={setValue} labelTransitionProps={{
                    transition: 'skew-down',
                    duration: 150,
                    timingFunction: 'linear',
                }} />
            </div>
        </div>

    )
}
export default Searchbar;