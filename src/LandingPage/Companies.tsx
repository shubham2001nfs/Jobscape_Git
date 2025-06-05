import Marquee from "react-fast-marquee";
import { companies } from "../Data/Data";

const Companies = () => {
    return (
        <div className="mt-20 flex flex-col items-center">
            <div className="text-4xl text-mine-shaft-100 font-bold mb-10">Trusted by <span className="text-web-orange-500">1000+</span> companies</div>
            <Marquee pauseOnHover={true}>
                {
                    companies.map((company, index) => <div key={index} className="px-4 mx-2">
                        <img className="hover:bg-mine-shaft-900 rounded-lg cursor-pointer h-20 mt-3" src={`/Companies/${company}.png`} />
                    </div>)
                }
            </Marquee>
        </div>
    )
}

export default Companies;