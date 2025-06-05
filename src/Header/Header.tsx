import { Avatar, Burger, Button, Drawer, Indicator } from "@mantine/core";
import { IconBell, IconBinocularsFilled } from "@tabler/icons-react";
import NavLinks from "./NavLinks";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import { useDispatch, useSelector } from "react-redux";
import NotMenu from "./NotMenu";
import { useEffect } from "react";
import { getProfile } from "../Services/ProfileService";
import { setProfile } from "../Slices/ProfileSlice";
import { jwtDecode } from "jwt-decode";
import { setUser } from "../Slices/UserSlice";
import { setupResponseInterceptor } from "../Interceptor/AxiosIntercepter";
import { useDisclosure } from "@mantine/hooks";

const Header = () => {
    const links = [
        { name: "Find Jobs", url: "find-jobs" },
        { name: "Find Talent", url: "find-talent" },
        { name: "Post Job", url: "post-job/0" },
        { name: "Posted Job", url: "posted-job/0" },
        { name: "Job History", url: "job-history" }
    ];

    const [opened, { open, close }] = useDisclosure(false);
    const user = useSelector((state: any) => state.user);
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const token = useSelector((state: any) => state.jwt);

    useEffect(() => {
        setupResponseInterceptor(navigate);
    }, [navigate]);

    useEffect(() => {
        if (token !== "") {
            const decoded = jwtDecode(localStorage.getItem("token") || "");
            dispatch(setUser({ ...decoded, email: decoded.sub }));
        }
        getProfile(user?.profileId)
            .then((res) => dispatch(setProfile(res)))
            .catch((error) => console.log(error));
    }, [token, navigate]);

    if (location.pathname === "/signup" || location.pathname === "/login") return null;

    return (
        <div className="w-full bg-mine-shaft-950 h-20 flex justify-between px-6 items-center">
            {/* Logo */}
            <div
                className="text-web-orange-500 flex items-center gap-1 hover:text-web-orange-600 cursor-pointer"
                onClick={() => navigate("/home")}
            >
                <IconBinocularsFilled width={40} height={40} stroke={1.5} />
                <div className="text-xl font-semibold xs-mx:hidden">JobScape</div>
            </div>

            {/* Desktop nav */}
            {user ? <NavLinks /> : null}

            {/* Right controls */}
            <div className="flex gap-4 items-center text-white text-xl">
                {user && location.pathname === "/home" ? (
                    <>
                        <ProfileMenu />
                        <div className="bg-mine-shaft-900 p-1 rounded-full">
                            {/* <NotMenu /> */}
                        </div>
                    </>
                ) : !user ? (
                    <Link to="/login">
                        <Button variant="subtle" color="web-orange.5" className="!text-md">Login</Button>
                    </Link>
                ) : <>
                    <ProfileMenu />
                    <div className="bg-mine-shaft-900 p-1 rounded-full">
                        {/* <NotMenu /> */}
                    </div>
                </>}

                <Burger opened={opened} onClick={open} aria-label="Toggle navigation" className="bs:hidden" />

                <Drawer
                    overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
                    position="right"
                    opened={opened}
                    onClose={close}
                    title={<div className="text-2xl font-semibold text-web-orange-500">Explore</div>}
                >
                    <div className="flex flex-col gap-4 mt-4">
                        {links.map((link, index) => (
                            <Link
                                key={index}
                                to={`/${link.url}`}
                                onClick={close}
                                className={`px-2 py-1 rounded ${location.pathname === "/" + link.url
                                    ? "text-web-orange-500 font-semibold"
                                    : "text-white"
                                    } hover:text-web-orange-500 transition-all duration-300`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </Drawer>
            </div>
        </div>
    );
};

export default Header;
