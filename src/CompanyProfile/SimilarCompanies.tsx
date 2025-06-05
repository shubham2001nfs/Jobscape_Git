import { similar } from "../Data/Company";
import { talents } from "../Data/TalentData";
import TalentCard from "../FindTalent/TalentCard";
import CompanyCard from "./CompanyCard";

const SimilarCompanies = () => {
    return (
        <div className=" w-1/4 p-3">
            <div className="text-xl font-semibold mb-5">Similar Companies</div>
            <div className="flex flex-col flex-wrap gap-5">
                {
                    similar.map((item, index) => <CompanyCard key={index} {...item} />)
                }

            </div>

        </div>
    )
}

export default SimilarCompanies;