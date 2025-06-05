import { talents } from "../Data/TalentData";
import TalentCard from "../FindTalent/TalentCard";

const EmployeesComp = () => {
    return (
        <div className="flex flex-wrap gap-10 mt-10">
            {
                talents.map((item, index) => index < 6 && (
                    <div className="px-2"> {/* Adding padding to each JobCard */}
                        <TalentCard key={index} {...item} />
                    </div>
                ))
            }
        </div>
    )
}
export default EmployeesComp;