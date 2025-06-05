import { Link, useLocation } from "react-router-dom";

const NavLinks = () => {
    const links = [
        { name: "Find Jobs", url: "find-jobs" },
        { name: "Find Talent", url: "find-talent" },
        { name: "Post Job", url: "post-job/0" },
        { name: "Posted Job", url: "posted-job/0" },
        { name: "Job History", url: "job-history" }
    ]

    const location = useLocation();
    return (
        <div className="flex gap-5 text-mine-shaft-300 h-full items-center bs-mx:hidden">
            {
                links.map((link, index) =>
                    <div className={`${location.pathname === "/" + link.url ? "border-web-orange-500 text-web-orange-500" : "border-transparent"} border-t-[3px] h-full flex items-center hover:text-web-orange-500 hover:translate-y-1 transition-all duration-300`}>
                        <Link
                            key={index}
                            to={link.url}
                        >
                            {link.name}
                        </Link>
                    </div>)
            }
        </div >
    )
}

export default NavLinks;