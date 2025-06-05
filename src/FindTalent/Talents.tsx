import { useEffect, useState } from "react";
import { talents } from "../Data/TalentData";
import Sort from "../FindJobs/Sort";
import TalentCard from "./TalentCard";
import { getAll } from "../Services/ProfileService";
import { useDispatch, useSelector } from "react-redux";
import { resetFilter } from "../Slices/FilterSlice";

const Talents = () => {
    const [talents, setTalents] = useState<any>([]);
    const sort = useSelector((state: any) => state.sort);
    const dispatch = useDispatch();
    const filter = useSelector((state: any) => state.filter);
    const user = useSelector((state: any) => state.user);
    const [filteredTalent, setFilteredTalent] = useState<any>([]);
    useEffect(() => {
        dispatch(resetFilter());
        getAll().then((res) => {
            const filtered = res.filter((talent: any) => talent.id !== user.id && talent.accountType !== "EMPLOYER");
            setTalents(filtered);
        }).catch((error) => {
            console.log(error);
        })
    }, [])

    useEffect(() => {
        let filtered = talents.filter((talent: any) =>
            filter.name
                ? (talent.name ?? '').toLowerCase().includes(filter.name.toLowerCase())
                : true
        );

        if (filter["Job Title"] && filter["Job Title"].length > 0) {
            filtered = filtered.filter((talent: any) => filter["Job Title"].includes(talent.jobTitle));
        }
        if (filter["Location"] && filter["Location"].length > 0) {
            filtered = filtered.filter((talent: any) => filter["Location"].includes(talent.location));
        }
        if (filter.Skills && filter.Skills.length > 0) {
            filtered = filtered.filter((talent: any) =>
                talent.skills?.some((skill: string) => filter.Skills.includes(skill))
            );

        }
        if (filter.exp && filter.exp.length > 0) {
            filtered = filtered.filter((talent: any) => filter.exp[0] <= talent.totalExp && talent.totalExp <= filter.exp[1]);
        }
        setFilteredTalent(filtered);
    }, [filter, talents]);

    useEffect(() => {

        if (sort == "Experience (Low to High)") {
            setTalents([...talents].sort((a: any, b: any) => a.totalExp - b.totalExp));
        }
        else if (sort == "Experience (High to Low)") {
            setTalents([...talents].sort((a: any, b: any) => b.totalExp - a.totalExp));
        }

    }, [sort])


    return (
        <div className="px-6 mt-10">
            <div className="flex justify-between">
                <div className="text-2xl font-semibold">Talents</div>
                <Sort />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10 w-full">
                {
                    filteredTalent.length ? filteredTalent.map((item: any, index: any) => (
                        <div className="px-2"> {/* Adding padding to each JobCard */}
                            <TalentCard key={index} {...item} />
                        </div>
                    )) : <div className="text-2xl font-semibold items-center justify-center">No Talents Found</div>
                }
            </div>
        </div>
    );
}

export default Talents;
