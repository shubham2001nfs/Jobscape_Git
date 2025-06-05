
import { Button, Divider } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { Link, useLocation } from "react-router-dom";
import CompanyProfile from "../CompanyProfile/CompanyProfile";
import SimilarCompanies from "../CompanyProfile/SimilarCompanies";

const CompanyPage = () => {
    const location = useLocation();
    const { jobId } = location.state || {};
    return (
        <div className="min-h-[100vh] bg-mine-shaft-950 font-['poppins'] ">
            <Divider size="xs" className="mb-2" />
            <Link className="my-1 mx-9 inline-block px-2" to={`/jobs/${jobId}`}>
                <Button leftSection={<IconArrowLeft size={20} />} variant="outline">Back</Button>
            </Link>
            <div className="mx-7 flex">
                <CompanyProfile />
                <SimilarCompanies />
            </div>



        </div>

    )
}
export default CompanyPage;