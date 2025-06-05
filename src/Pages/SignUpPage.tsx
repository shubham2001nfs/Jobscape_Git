import { Button, Divider } from "@mantine/core";
import { IconArrowLeft, IconBinocularsFilled } from "@tabler/icons-react";
import SignUp from "../SignUpLogin/SignUp";
import Login from "../SignUpLogin/Login";
import { Link, useLocation, useNavigate } from "react-router-dom";

const SignUpPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isSignup = location.pathname === '/signup';

    return (
        <div className="min-h-[100vh] bg-mine-shaft-950 font-['poppins'] overflow-hidden relative">


            <div className={`w-[100vw] h-[100vh] flex [&>*]:flex-shrink-0 transition-all ease-in-out duration-700 ${isSignup ? "-translate-x-1/2" : "translate-x-0"}`}>
                <Login />
                <div className={`w-1/2 bg-mine-shaft-800 h-full transition-all ease-in-out duration-700 ${!isSignup ? "rounded-l-[200px]" : "rounded-r-[200px]"} flex items-center justify-center flex-col gap-5`}>
                    <div className="text-web-orange-500 flex items-center gap-1 hover:text-web-orange-600 cursor-pointer">
                        <IconBinocularsFilled width={80} height={80} stroke={1.5} />
                        <div className="text-6xl font-semibold">JobScape</div>
                    </div>
                    <div className="text-3xl font-semibold text-justify text-mine-shaft-200">Connecting Talent with Opportunity</div>
                </div>
                <SignUp />
            </div>
        </div>
    )
}

export default SignUpPage;