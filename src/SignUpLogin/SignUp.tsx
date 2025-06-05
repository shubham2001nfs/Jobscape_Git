import {
    Anchor,
    Button,
    Checkbox,
    Group,
    LoadingOverlay,
    PasswordInput,
    Radio,
    TextInput
} from "@mantine/core";
import {
    IconAt,
    IconCheck,
    IconLock,
    IconUser,
    IconX
} from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../Services/UserService";
import { signupValidation } from "../Services/FormValidation";
import { notifications } from "@mantine/notifications";

const form = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    accountType: "APPLICANT",
    termsAccepted: false
};

const SignUp = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [data, setData] = useState<{ [key: string]: any }>(form);
    const [formError, setFormError] = useState<{ [key: string]: string }>({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        accountType: "",
        termsAccepted: ""
    });

    const handleChange = (event: any) => {
        if (typeof event === "string") {
            setData({ ...data, accountType: event });
            return;
        }

        const { name, type, value, checked } = event.target;
        const newValue = type === "checkbox" ? checked : value;

        setData({ ...data, [name]: newValue });

        if (name !== "termsAccepted") {
            setFormError({ ...formError, [name]: signupValidation(name, newValue) });
        }

        if (name === "password" && data.confirmPassword !== "") {
            setFormError({
                ...formError,
                password: signupValidation(name, newValue),
                confirmPassword: newValue !== data.confirmPassword ? "Password do not match" : ""
            });
        }

        if (name === "confirmPassword") {
            setFormError({
                ...formError,
                confirmPassword: data.password !== newValue ? "Password do not match!" : ""
            });
        }
    };

    const handleSubmit = () => {
        let valid = true;
        let newFormError: { [key: string]: string } = {};

        for (let key in data) {
            if (key === "accountType" || key === "termsAccepted") continue;
            newFormError[key] = signupValidation(key, data[key]);
            if (newFormError[key]) valid = false;
        }

        if (!data.termsAccepted) {
            newFormError.termsAccepted = "You must accept the terms and conditions.";
            valid = false;
        }

        setFormError(newFormError);
        if (!valid) return;

        setLoading(true);
        registerUser(data)
            .then((res) => {
                setData(form);
                notifications.show({
                    title: "Registered Successfully",
                    message: "Redirecting to login page...",
                    icon: <IconCheck />,
                    color: "teal",
                    autoClose: 3000
                });
                setTimeout(() => {
                    setLoading(false);
                    navigate("/login");
                }, 3000);
            })
            .catch((error) => {
                notifications.show({
                    title: "Registration failed",
                    message: error.response?.data?.errorMessage || "An error occurred.",
                    icon: <IconX />,
                    color: "red.6",
                    autoClose: 3000
                });
                setLoading(false);
            });
    };

    return (
        <>
            <LoadingOverlay
                visible={loading}
                zIndex={1000}
                overlayProps={{ radius: "sm", blur: 2 }}
                loaderProps={{ color: "web-orange", type: "bars" }}
                className="translate-x-1/2"
            />
            <div className="w-1/2 px-20 flex flex-col justify-center">
                <div className="text-2xl text-web-orange-500 font-semibold">Create Account</div>
                <div className="w-4/5 gap-4 mt-3 space-y-3">
                    <TextInput
                        value={data.name}
                        leftSectionPointerEvents="none"
                        label="Full Name"
                        placeholder="Enter Full Name"
                        leftSection={<IconUser size={18} />}
                        onChange={handleChange}
                        withAsterisk
                        name="name"
                        error={formError.name}
                    />
                    <TextInput
                        value={data.email}
                        rightSectionPointerEvents="none"
                        label="Email"
                        placeholder="Enter Email"
                        withAsterisk
                        leftSection={<IconAt size={18} />}
                        onChange={handleChange}
                        name="email"
                        error={formError.email}
                    />
                    <PasswordInput
                        value={data.password}
                        leftSection={<IconLock size={18} />}
                        label="Password"
                        placeholder="Enter Password"
                        withAsterisk
                        onChange={handleChange}
                        name="password"
                        error={formError.password}
                    />
                    <PasswordInput
                        value={data.confirmPassword}
                        leftSection={<IconLock size={18} />}
                        label="Confirm Password"
                        placeholder="Enter Confirm Password"
                        withAsterisk
                        onChange={handleChange}
                        name="confirmPassword"
                        error={formError.confirmPassword}
                    />
                    <Radio.Group
                        value={data.accountType}
                        onChange={handleChange}
                        label="You are?"
                        withAsterisk
                        name="accountType"
                    >
                        <Group mt="xs">
                            <Radio
                                className="border rounded-lg has-[:checked]:border-web-orange-500 border-mine-shaft-900 px-3 py-3 hover:bg-mine-shaft-800 hover:text-mine-shaft-100 hover:border-web-orange-500 transition-all duration-800 ease-in-out"
                                autoContrast
                                value="APPLICANT"
                                label="Applicant"
                            />
                            <Radio
                                className="border rounded-lg has-[:checked]:border-web-orange-500 border-mine-shaft-900 px-3 py-3 hover:bg-mine-shaft-800 hover:text-mine-shaft-100 hover:border-web-orange-500 transition-all duration-800 ease-in-out"
                                autoContrast
                                value="EMPLOYER"
                                label="Employer"
                            />
                        </Group>
                    </Radio.Group>

                    <Checkbox
                        className="!mt-4"
                        autoContrast
                        name="termsAccepted"
                        checked={data.termsAccepted}
                        onChange={handleChange}
                        label={
                            <div>
                                I accept{" "}
                                <Anchor href="#" onClick={(e) => e.preventDefault()}>
                                    Terms and Conditions
                                </Anchor>
                            </div>
                        }
                        error={formError.termsAccepted}
                    />

                    <Button onClick={handleSubmit} autoContrast className="!w-full !mt-4">
                        SignUp
                    </Button>
                    <div className="text-center">
                        Have an account?{" "}
                        <span
                            className="text-web-orange-400 hover:underline cursor-pointer"
                            onClick={() => {
                                navigate("/login");
                                setFormError(form);
                                setData(form);
                            }}
                        >
                            Login
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;
