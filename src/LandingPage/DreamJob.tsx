import { Avatar, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

const DreamJob = () => {
    return (
        <div className="flex items-center px-20 ">
            <div className="flex flex-col w-[40%]">
                <div className="text-6xl font-bold text-mine-shaft-100 [&>span]:text-web-orange-500 leading-snug">Find your own <span>dream</span> <span>job</span> with JobScape</div>
                <div className="text-lg font-bold text-mine-shaft-300 w-[30 rem] leading-7 py-3">Good life begins with a good company.Start explore thousands of jobs that can change your life.</div>
                <div className="flex gap-5 mt-5">
                    <TextInput className="bg-mine-shaft-900 rounded-lg p-1 px-2 text-mine-shaft-100 [&_input]:text-mine-shaft-100"
                        variant="unstyled"
                        label="Job Title"
                        placeholder="Software Engineer"
                    />
                    <TextInput className="bg-mine-shaft-900 rounded-lg p-1 px-2 text-mine-shaft-100 [&_input]:text-mine-shaft-100"
                        variant="unstyled"
                        label="Job Type"
                        placeholder="Full Time"
                    />
                    <div className="flex items-center bg-web-orange-500 rounded-xl p-1 px-2 text-mine-shaft-900 justify-center hover:bg-web-orange-600 cursor-pointer">
                        <IconSearch stroke={1.5} height={40} width={40} />
                    </div>
                </div>

            </div>
            <div className="w-[60%] flex justify-center items-center">
                <div className="w-[40rem] relative">
                    <img src="boy.png" />
                    <div className="absolute -right-1 w-fit border border-web-orange-500 rounded-lg p-2 backdrop-blur-md top-[70%]">
                        <div className="text-center mb-1 text-mine-shaft-100">10k+ got job</div>
                        <Avatar.Group>
                            <Avatar src="av1.png" />
                            <Avatar src="av2.png" />
                            <Avatar src="av3.png" />
                            <Avatar>+9k</Avatar>
                        </Avatar.Group>
                    </div>
                    <div className="absolute -left-1 w-fit border border-web-orange-500 rounded-lg p-2 backdrop-blur-md top-[50%]">
                        <div className="flex gap-2 items-center">
                            <div className="w-12 bg-mine-shaft-900 rounded-lg p-1">
                                <img src="Google.png" />
                            </div>
                            <div className="  text-mine-shaft-100">
                                <div className="text-sm">Software Engineer</div>
                                <div className="text-xs">New York</div>
                            </div>
                        </div>
                        <div className="flex gap-2 items-center text-mine-shaft-100 text-xs mt-2 justify-around">
                            <span>1 day ago</span><span>120 applicants</span>
                        </div>
                    </div>
                </div>
            </div >
        </div >

    )
}

export default DreamJob;