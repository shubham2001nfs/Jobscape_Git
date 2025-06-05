import { Menu, Button, Text, Avatar, Switch } from '@mantine/core';
import {
    IconSettings,
    IconSearch,
    IconPhoto,
    IconMessageCircle,
    IconTrash,
    IconArrowsLeftRight,
    IconLogout2,
    IconUserCircle,
    IconFile,
    IconFileText,
    IconMoon,
    IconSun,
    IconMoonStars,
} from '@tabler/icons-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { removeUser } from '../Slices/UserSlice';
import { removeJwt } from '../Slices/AuthSlice';

const ProfileMenu = () => {
    const location = useLocation();
    const [checked, setChecked] = useState(false);
    const [opened, setOpened] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user);
    const handleLogout = () => {
        dispatch(removeUser());
        dispatch(removeJwt());
    }
    return (

        <Menu shadow="md" width={200} opened={opened} onChange={setOpened}>
            <Menu.Target>
                <div className="flex gap-4 items-center">
                    <div className='text-sm font-semibold xs-mx:hidden'>{user.name}</div>
                    <Avatar src="avatar-9.png" alt="it's me" />
                </div>
            </Menu.Target>
            {
                location.pathname == "/home" ? <Menu.Dropdown onChange={() => setOpened(true)}>
                    <Link to={'/profile'}>
                        <Menu.Item leftSection={<IconUserCircle size={14} />}>
                            Profile
                        </Menu.Item></Link>




                    <Menu.Divider />

                    <Menu.Item
                        color="red"
                        leftSection={<IconLogout2 size={14} />}
                        onClick={handleLogout}
                    >
                        Logout
                    </Menu.Item>
                </Menu.Dropdown> : <></>
            }


        </Menu>
    );
}
export default ProfileMenu;