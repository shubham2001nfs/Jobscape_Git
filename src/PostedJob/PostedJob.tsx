import { Tabs } from "@mantine/core";
import { useEffect, useState } from "react";
import PostedJobCard from "./PostedJobCard";
import { activeJobs, drafts } from "../Data/PostedJob";
const PostedJob = (props: any) => {
    const [activeTab, setActiveTab] = useState<string | null>('OPEN');
    useEffect(() => {
        setActiveTab(props.job?.jobStatus || 'OPEN')
    }, [props.job])
    const count1 = activeJobs.length;
    const count2 = drafts.length;
    return (
        <div className="w-1/6 mt-5">
            <div className="text-2xl font-semibold mb-8">Jobs</div>
            <div>
                <Tabs value={activeTab} variant="pills" autoContrast onChange={setActiveTab}>
                    <Tabs.List className="[&_button[aria-selected='false']]:bg-mine-shaft-900">
                        <Tabs.Tab value="OPEN">Active [{props.jobList?.filter((job: any) => job.jobStatus == "OPEN").length}]</Tabs.Tab>
                        <Tabs.Tab value="DRAFT">Drafts [{props.jobList?.filter((job: any) => job.jobStatus == "DRAFT").length}] </Tabs.Tab>
                        <Tabs.Tab value="CLOSED">Closed [{props.jobList?.filter((job: any) => job.jobStatus == "CLOSED").length}] </Tabs.Tab>
                    </Tabs.List>
                    <Tabs.Panel value="OPEN">
                        <div className="flex flex-col gap-4 mt-5">
                            {props.jobList
                                ?.filter((job: any) => job?.jobStatus === "OPEN")
                                .map((item: any, index: any) => (
                                    <PostedJobCard key={index} {...item} />
                                ))}
                        </div>
                    </Tabs.Panel>

                    <Tabs.Panel value="DRAFT">
                        <div className="flex flex-col gap-4 mt-5">
                            {props.jobList
                                ?.filter((job: any) => job?.jobStatus === "DRAFT")
                                .map((item: any, index: any) => (
                                    <PostedJobCard drafted key={index} {...item} />
                                ))}
                        </div>
                    </Tabs.Panel>

                    <Tabs.Panel value="CLOSED">
                        <div className="flex flex-col gap-4 mt-5">
                            {props.jobList
                                ?.filter((job: any) => job?.jobStatus === "CLOSED")
                                .map((item: any, index: any) => (
                                    <PostedJobCard closed key={index} {...item} />
                                ))}
                        </div>
                    </Tabs.Panel>


                </Tabs>
            </div>
        </div>
    )
}

export default PostedJob;