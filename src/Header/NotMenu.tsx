import { Menu, Indicator, Notification, Stack } from '@mantine/core';
import { IconBell } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../Slices/UserSlice';
import { getAllNotifications, updateNotification } from '../Services/NotificationService';
import { useNavigate } from 'react-router-dom';


const NotMenu = () => {
    const [opened, setOpened] = useState(false);
    const navigate = useNavigate();
    const [notification, setNotification] = useState<any>([]);
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user);

    const handleLogout = () => {
        dispatch(removeUser());
    };

    useEffect(() => {
        getAllNotifications(user.id)
            .then((res) => {
                setNotification(res);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [user]);

    const handleUnread = (index: number) => {
        let notis = [...notification];
        notis = notis.filter((not: any, i: number) => i != index);
        setNotification(notis);
        updateNotification(notification[index].id).then((res) => console.log(res)).catch((error) => console.log(error));
    }
    return (
        <Menu shadow="md" width={320} onOpen={() => setOpened(true)} onClose={() => setOpened(false)}>
            <Menu.Target>
                <div className="flex gap-4 items-center cursor-pointer">
                    {
                        notification.length == 0 ?
                            <IconBell stroke={1.5} /> : <Indicator color="red.8" size={9} processing>
                                <IconBell stroke={1.5} />
                            </Indicator>
                    }

                </div>
            </Menu.Target>

            <Menu.Dropdown p={5}>
                <div className='flex flex-col gap-1'>
                    {
                        notification.map((noti: any, index: number) => <Notification
                            onClick={() => navigate(noti.route)}
                            title={noti.action}
                            color="yellow"
                            withCloseButton
                            radius={2}
                            className="cursor-pointer hover:bg-mine-shaft-700"
                            onClose={() => handleUnread(index)}
                        >
                            {noti.message}
                        </Notification>)
                    }
                    {
                        notification.length == 0 && <div className='flex justify-center items-center p-1'>No Notifications</div>
                    }
                </div>
            </Menu.Dropdown>
        </Menu>
    );
};

export default NotMenu;
