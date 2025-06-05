import { useState } from 'react';
import { Button, Combobox, useCombobox, Text, Box } from '@mantine/core';
import { IconAdjustments } from '@tabler/icons-react';
import { useDispatch } from 'react-redux';
import { updateSort } from '../Slices/SortSlice';

const opt = ['Relevance', 'Most Recent', 'Salary (Low to High)', 'Salary (High to Low)'];
const opt2 = ['Relevance', 'Experience (Low to High)', 'Experience (High to Low)'];

const Sort = (props: any) => {
    const [selectedItem, setSelectedItem] = useState<string | null>('Relevance');
    const dispatch = useDispatch();
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });

    const options = props.sort == "job" ? opt.map((item) => (
        <Combobox.Option value={item} key={item} className='!text-xs '>
            {item}
        </Combobox.Option>
    )) : opt2.map((item) => (
        <Combobox.Option value={item} key={item} className='!text-xs '>
            {item}
        </Combobox.Option>
    ))

    return (

        <Combobox
            store={combobox}
            width={180}
            position="bottom-start"
            withArrow
            onOptionSubmit={(val) => {
                dispatch(updateSort(val));
                setSelectedItem(val);
                combobox.closeDropdown();
            }}
        >
            <Combobox.Target>
                <div onClick={() => combobox.toggleDropdown()} className='border border-web-orange-500 flex p-2  rounded-md cursor-pointer text-sm w-[15rem] ml-2 justify-between'>
                    {selectedItem} <IconAdjustments className="text-web-orange-500 hover:text-web-orange-300" />
                </div>
            </Combobox.Target>

            <Combobox.Dropdown>
                <Combobox.Options>{options}</Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    );
}
export default Sort;