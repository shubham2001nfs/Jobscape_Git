import { Button, Divider } from "@mantine/core";
import Searchbar from "../FindTalent/Searchbar";
import Talents from "../FindTalent/Talents";
import { useNavigate } from "react-router-dom";
const Unauthorize = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-mine-shaft-950 flex items-center justify-center font-['Poppins']">
            <div className="bg-mine-shaft-900 text-center rounded-xl shadow-lg p-10">
                <h1 className="text-6xl font-bold text-red-500 mb-4">403</h1>
                <h2 className="text-2xl font-semibold text-yellow-400 mb-2">Unauthorized Access</h2>
                <p className="text-yellow-300 mb-6">
                    Sorry, you don’t have permission to view this page.
                </p>
                <Button variant="outline" onClick={() => navigate("/home")} className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-6 rounded transition duration-200">Go to Homepage</Button>
            </div>
        </div>
    );
};

export default Unauthorize;