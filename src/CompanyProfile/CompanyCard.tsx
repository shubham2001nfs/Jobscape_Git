import { ActionIcon } from "@mantine/core";
import { IconAdjustments, IconBookmark, IconExternalLink } from "@tabler/icons-react";

const CompanyCard = (props: any) => {
    return (
        <div className="flex justify-between items-center w-full bg-mine-shaft-900 rounded-md p-4">
            <div className="flex gap-2 items-center">
                <div className="p-2 bg-mine-shaft-800 rounded-md">
                    <img className="w-7 h-7" src={`/Icons/${props.name}.png`} />
                </div>
                <div className="p-2">
                    <div className="text-mine-shaft-100 font-semibold">{props.name}</div>
                    <div className="text-mine-shaft-200 text-xs">{props.employees} Employees</div>
                </div>
            </div>
            <ActionIcon variant="subtle" aria-label="Settings">
                <IconExternalLink className="text-web-orange-500" />
            </ActionIcon>
        </div>
    )
}

export default CompanyCard;