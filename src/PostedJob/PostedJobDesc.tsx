import { Badge, Tabs } from "@mantine/core";
import AboutComp from "../CompanyProfile/AboutComp";
import JobsComp from "../CompanyProfile/JobsComp";
import EmployeesComp from "../CompanyProfile/EmployeesComp";
import JobDesc from "../JobDesc/JobDesc";
import { talents } from "../Data/TalentData";
import TalentCard from "../FindTalent/TalentCard";
import { useEffect, useState } from "react";
const PostedJobDesc = (props: any) => {
    const [tab, setTab] = useState("overview");
    const [arr, setArr] = useState<any>([]);
    const handleTabChange = (value: any) => {
        setTab(value);
        if (value == "applicants") {
            setArr(props.applicants?.filter((x: any) => x.applicationStatus == "APPLIED"));
        }
        else if (value == "invited") {
            setArr(props.applicants?.filter((x: any) => x.applicationStatus == "INTERVIEWING"));
        }
        else if (value == "offered") {
            setArr(props.applicants?.filter((x: any) => x.applicationStatus == "OFFERED"));
        }
        else if (value == "rejected") {
            setArr(props.applicants?.filter((x: any) => x.applicationStatus == "REJECTED"));
        }
    }

    useEffect(() => {
        handleTabChange("overview");
    }, [props]);
    return (
        <div className="px-5 mt-5 w-full">
            {props.jobTitle ? <> <div className="text-2xl font-semibold mb-5 flex items-center gap-4">{props.jobTitle} <Badge color="web-orange" className="!text-web-orange-500" variant="light" size="md">{props.jobStatus == "OPEN" ? "ACTIVE" : props.jobStatus}</Badge></div>
                <div className="font-medium text-mine-shaft-300 mb-5">{props.location}</div>
                <Tabs value={tab} onChange={handleTabChange} variant="outline">
                    <Tabs.List className="[&_button]:text-lg mb-5 font-semibold [&_button[data-active='true']]:text-web-orange-500">
                        <Tabs.Tab value="overview">Overview</Tabs.Tab>
                        <Tabs.Tab value="applicants">Applicants</Tabs.Tab>
                        <Tabs.Tab value="invited">Invited</Tabs.Tab>
                        <Tabs.Tab value="offered">Offered</Tabs.Tab>
                        <Tabs.Tab value="rejected">Rejected</Tabs.Tab>
                    </Tabs.List>
                    <Tabs.Panel value="overview" className="[&>*]:w-full"><JobDesc closed={props.jobStatus == "CLOSED"} {...props} edit /></Tabs.Panel>
                    <Tabs.Panel value="applicants">
                        <div className="flex flex-wrap gap-10">
                            {
                                arr?.length ? arr.map((item: any, index: any) => (
                                    <div className="px-2">
                                        <TalentCard key={index} {...item} posted />
                                    </div>
                                )) : <div className="text-2xl font-semibold ">No Applicants</div>
                            }
                        </div>
                    </Tabs.Panel>
                    <Tabs.Panel value="invited">
                        <div className="flex flex-wrap gap-10">
                            {
                                arr?.length ? arr.map((item: any, index: any) => (
                                    <div className="px-2"> {/* Adding padding to each JobCard */}
                                        <TalentCard key={index} {...item} invited />
                                    </div>
                                )) : <div className="text-2xl font-semibold ">No Invited Candidates</div>
                            }
                        </div>
                    </Tabs.Panel>

                    <Tabs.Panel value="offered">
                        <div className="flex flex-wrap gap-10">
                            {
                                arr?.length ? arr.map((item: any, index: any) => (
                                    <div className="px-2"> {/* Adding padding to each JobCard */}
                                        <TalentCard key={index} {...item} offered />
                                    </div>
                                )) : <div className="text-2xl font-semibold ">No Offered Candidates</div>
                            }
                        </div>
                    </Tabs.Panel>

                    <Tabs.Panel value="rejected">
                        <div className="flex flex-wrap gap-10">
                            {
                                arr?.length ? arr.map((item: any, index: any) => (
                                    <div className="px-2"> {/* Adding padding to each JobCard */}
                                        <TalentCard key={index} {...item} rejected />
                                    </div>
                                )) : <div className="text-2xl font-semibold ">No Rejected Candidates</div>
                            }
                        </div>
                    </Tabs.Panel>

                </Tabs> </> : <div className="flex justify-center items-center text-2xl font-bold min-h-[20vh]">No Job Selected</div>}
        </div>
    )
}

export default PostedJobDesc;