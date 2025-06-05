import { Link, useParams } from "react-router-dom";
import { timeAgo } from "../Services/Utilities";

const PostedJobCard = (props: any) => {
    const { id } = useParams();
    return (
        <Link to={`/posted-job/${props.id}`} className={` ${props.id == id ? "bg-web-orange-500 rounded-lg p-2 border-l-2 border-l-mine-shaft-800 text-black" : "bg-mine-shaft-900 rounded-lg p-2 border-l-2 border-l-web-orange-500"}`}>
            <div className="text-sm font-medium ">{props.jobTitle}</div>
            <div className="text-xs ">{props.location}</div>
            <div className="text-xs ">{props.closed ? "Closed" : props.drafted ? "Drafted" : "Posted"} {timeAgo(props.postTime)}</div>
        </Link>
    )
}

export default PostedJobCard;