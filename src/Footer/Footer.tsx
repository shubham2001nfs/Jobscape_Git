import { IconBinocularsFilled, IconBrandInstagram, IconBrandMeta, IconBrandX } from "@tabler/icons-react";
import { footerLinks } from "../Data/Data";
import { useLocation } from "react-router-dom";

const Footer = () => {
    const location = useLocation();
    return (
        location.pathname != "/signup" && location.pathname != "/login" ? <div className="pt-20 p-10 bg-mine-shaft-950 font-['poppins']">
            <div className="flex items-start justify-between gap-16">
                <div className="flex flex-col gap-4 w-1/4">
                    <div className="text-web-orange-500 flex items-center gap-1  cursor-pointer">
                        <IconBinocularsFilled width={40} height={40} stroke={1.5} />
                        <div className="text-xl font-semibold">JobScape</div>
                    </div>
                    <div className="text-mine-shaft-100 text-sm font-semibold pl-1">Job portal with user profiles, skill updates, certifications, work experience and admin job postings.</div>
                    <div className="flex gap-3 text-web-orange-500 [&>div]:bg-mine-shaft-900 [&>div]:rounded-full [&>div]:p-2 hover:[&>div]:bg-mine-shaft-400">
                        <div className="hover:text-web-orange-400 cursor-pointer"><IconBrandMeta /></div>
                        <div className="hover:text-web-orange-400 cursor-pointer"><IconBrandInstagram /></div>
                        <div className="hover:text-web-orange-400 cursor-pointer"><IconBrandX /></div>
                    </div>
                </div>
                {
                    footerLinks.map((link, index) => <div key={index} className="flex flex-col gap-2">
                        <div className="text-web-orange-500 font-semibold text-lg">{link.title}</div>
                        {
                            link.links.map((link, index) => <div key={index}>
                                <div className="text-mine-shaft-100 hover:text-web-orange-600 hover:translate-x-1 transition-all duration-300 cursor-pointer text-md">{link}</div>
                            </div>)
                        }
                    </div>)
                }
            </div>
        </div> : <></>
    )
}

export default Footer;