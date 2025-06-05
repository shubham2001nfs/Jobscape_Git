import { Avatar, Divider, Tabs } from "@mantine/core";
import { IconMapPin } from "@tabler/icons-react";
import AboutComp from "./AboutComp";
import JobsComp from "./JobsComp";
import EmployeesComp from "./EmployeesComp";

const CompanyProfile = () => {
    return (
        <div className="max-w-6xl mx-auto px-6 py-10">
            {/* Banner */}
            <div className="relative">
                <img
                    className="rounded-t-2xl w-full h-60 object-cover"
                    src="/banner.jpg" // make sure this is in public/ or use import
                    alt="banner"
                />
                <img
                    className="rounded-full bg-mine-shaft-950 w-36 h-36 absolute -bottom-16 left-6 border-8 border-mine-shaft-950 shadow-lg"
                    src="/Google.png"
                    alt="Company avatar"
                />
            </div>

            {/* Company Info */}
            <div className="mt-20 flex flex-col gap-2 px-2">
                <div className="flex justify-between items-center text-3xl font-semibold">
                    <span>Google</span>
                    <Avatar.Group>
                        <Avatar src="/avatar.png" />
                        <Avatar src="/avatar2.png" />
                        <Avatar src="/avatar1.png" />
                        <Avatar>+10k</Avatar>
                    </Avatar.Group>
                </div>
                <div className="flex gap-1 text-lg items-center text-mine-shaft-300">
                    <IconMapPin stroke={1.5} /> New York, United States
                </div>
            </div>

            <Divider size="xs" className="mt-8" />

            {/* Tabs Section */}
            <div className="mt-8">
                <Tabs defaultValue="about" variant="outline">
                    <Tabs.List className="[&_button]:text-lg font-semibold mb-6 [&_button[data-active='true']]:text-web-orange-500">
                        <Tabs.Tab value="about">About</Tabs.Tab>
                        <Tabs.Tab value="jobs">Jobs</Tabs.Tab>
                        <Tabs.Tab value="employees">Employees</Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="about"><AboutComp /></Tabs.Panel>
                    <Tabs.Panel value="jobs"><JobsComp /></Tabs.Panel>
                    <Tabs.Panel value="employees"><EmployeesComp /></Tabs.Panel>
                </Tabs>
            </div>
        </div>
    );
};

export default CompanyProfile;
