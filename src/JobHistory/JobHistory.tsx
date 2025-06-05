import { Tabs } from "@mantine/core";
import JobHistoryCard from "./JobHistoryCard";
import { useEffect, useState } from "react";
import { getAllJobs } from "../Services/JobService";
import { useSelector } from "react-redux";

const JobHistory = () => {
    const [activeTab, setActiveTab] = useState("APPLIED");
    const [jobList, setJobList] = useState([]);
    const [showList, setShowList] = useState([]);
    const profile = useSelector((state: any) => state.profile);
    const user = useSelector((state: any) => state.user);

    useEffect(() => {
        if (!user?.id) return;
        getAllJobs()
            .then((res) => {
                setJobList(res);
                setShowList(
                    res.filter((job: any) =>
                        job.applicants?.some(
                            (a: any) =>
                                a.applicantId === profile.id && a.applicationStatus === "APPLIED"
                        )
                    )
                );
            })
            .catch(console.error);
    }, [profile?.id]);

    const handleTabChange = (value: string | null) => {
        if (!value) return;
        setActiveTab(value);

        if (value === "SAVED") {
            setShowList(jobList.filter((job: any) => profile.savedJobs?.includes(job.id)));
        } else {
            setShowList(
                jobList.filter((job: any) =>
                    job.applicants?.some(
                        (a: any) => {
                            if (a.applicantId === user.id && a.applicationStatus === value) {
                                // If it's an interview, make sure to include the interview time
                                if (value === "INTERVIEWING") {
                                    job.interviewTime = a.interviewTime;
                                }
                                return true;
                            }
                            return false;
                        }
                    )
                )
            );
        }
    };

    return (
        <div>
            <div className="text-2xl font-semibold mt-4 mb-8">Job History</div>
            <Tabs
                value={activeTab}
                onChange={handleTabChange}
                variant="outline"
                className="w-full"
            >
                <Tabs.List className="[&_button]:text-lg mb-5 font-semibold [&_button[data-active='true']]:text-web-orange-500">
                    <Tabs.Tab value="APPLIED">Applied</Tabs.Tab>
                    <Tabs.Tab value="SAVED">Saved</Tabs.Tab>
                    <Tabs.Tab value="OFFERED">Offered</Tabs.Tab>
                    <Tabs.Tab value="INTERVIEWING">Interviewing</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value={activeTab}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
                        {showList.map((job: any, idx: number) => (
                            <JobHistoryCard
                                key={job.id || idx}
                                {...job}
                                {...{ [activeTab.toLowerCase()]: true }}
                            />
                        ))}
                    </div>
                </Tabs.Panel>
            </Tabs>
        </div>
    );
};

export default JobHistory;
