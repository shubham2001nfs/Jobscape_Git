import { Anchor, Button, Checkbox, LoadingOverlay, PasswordInput, TextInput } from "@mantine/core";
import { IconAt, IconCheck, IconLock, IconUser, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginValidation } from "../Services/FormValidation";
import { notifications } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";
import ResetPassword from "./ResetPasword";
import { useDispatch } from "react-redux";
import { setUser } from "../Slices/UserSlice";
import { loginUser } from "../Services/AuthService";
import { setJwt } from "../Slices/AuthSlice";
import { jwtDecode } from "jwt-decode";
const form = {
    email: "",
    password: ""
}
const Login = () => {
    const [data, setData] = useState<{ [key: string]: string }>(form);
    const [formError, setFormError] = useState<{ [key: string]: string }>(form);
    const [opened, { open, close }] = useDisclosure(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const handleChange = (event: any) => {
        let name = event.target.name, value = event.target.value;
        setData({ ...data, [name]: value })
        setFormError({ ...formError, [name]: loginValidation(name, value) });
    }

    const handleSubmit = () => {

        let valid = true, newFormError: { [key: string]: string } = {};
        for (let key in data) {
            newFormError[key] = loginValidation(key, data[key]);
            if (newFormError[key]) {
                valid = false;
            }
        }
        setFormError(newFormError);

        if (valid === true) {
            setLoading(true);
            loginUser(data).then((res) => {
                setData(form);
                dispatch(setJwt(res.jwt))
                const decoded = jwtDecode(res.jwt);
                console.log(decoded);
                setFormError(form);
                console.log(res)
                notifications.show({
                    title: 'Login Successfully',
                    message: 'Redirecting to home page...',
                    icon: <IconCheck />,
                    color: "teal",
                    autoClose: 3000
                })
                setTimeout(() => {
                    setLoading(false);
                    dispatch(setUser({ ...decoded, email: decoded.sub }));
                    navigate("/home");
                }, 3000)

            }).catch((error) => {
                console.log(error);
                setLoading(false);

                // Safe error handling
                const errorMessage = error?.response?.data?.errorMessage || "An error occurred during login";

                notifications.show({
                    title: 'Login failed',
                    message: errorMessage,
                    icon: <IconX />,
                    color: "red.6",
                    autoClose: 3000
                });
            });
        }

    }
    return (
        <>
            <LoadingOverlay
                visible={loading}
                zIndex={1000}
                overlayProps={{ radius: 'sm', blur: 2 }}
                loaderProps={{ color: 'web-orange', type: 'bars' }}
            />
            <div className="w-1/2 px-20 flex flex-col justify-center">
                <div className="text-2xl text-web-orange-500 font-semibold">Log in to Your Account</div>
                <div className="w-4/5 gap-3 mt-3 space-y-3">

                    <TextInput
                        rightSectionPointerEvents="none"
                        label="Email"
                        placeholder="Enter Email"
                        withAsterisk
                        leftSection={<IconAt size={18} />}
                        value={data.email}
                        name="email"
                        onChange={handleChange}
                        error={formError.email}
                    />

                    <PasswordInput
                        leftSection={<IconLock size={18} />}
                        label="Password"
                        placeholder="Enter Password"
                        withAsterisk
                        value={data.password}
                        name="password"
                        onChange={handleChange}
                        error={formError.password}
                    />

                    <Button onClick={handleSubmit} autoContrast className="!w-full !mt-4" loading={loading}>Login</Button>
                    <div className="text-center">Don't have an account? <span className="text-web-orange-400 hover:underline cursor-pointer" onClick={() => { navigate("/signup"); setFormError(form); setData(form) }}>SignUp</span></div>
                    <div onClick={open} className="text-web-orange-400 cursor-pointer hover:underline text-center">Forget Password?</div>
                </div>

            </div>
            <ResetPassword opened={opened} close={close} />

        </>
    )
}

export default Login;