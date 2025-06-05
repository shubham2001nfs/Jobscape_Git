import { Button, Modal, PasswordInput, PinInput, TextInput } from "@mantine/core";
import { IconAt, IconCheck, IconLock, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { changePassword, sendOtp, verifyOtp } from "../Services/UserService";
import { notifications } from "@mantine/notifications";
import { signupValidation } from "../Services/FormValidation";
import { useNavigate } from "react-router-dom";

const ResetPassword = (props: any) => {
    const [email, setEmail] = useState("");
    const [optSend, setOtpSend] = useState(false);
    const [otpLoading, setOtpLoading] = useState(false);
    const [verified, setVerified] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [emailError, setEmailError] = useState("");
    const handleSendOtp = () => {
        setOtpLoading(true);

        sendOtp(email).then((res) => {
            setOtpSend(true);
            notifications.show({
                title: 'OTP sent Successfully',
                message: 'Enter OTP to reset.',
                icon: <IconCheck />,
                color: "teal",
                autoClose: 3000
            })

            setOtpLoading(false);
            console.log(res);
        })
            .catch((error) => {
                setOtpLoading(true);
                setOtpLoading(false);
                notifications.show({
                    title: 'OTP sent failed',
                    message: error.response.data.errorMessage,
                    icon: <IconX />,
                    color: "red.6",
                    autoClose: 3000
                })
                console.log(error);
            })
    }
    const handleVerifyOtp = (otp: string) => {
        verifyOtp(email, otp).then((res) => {
            notifications.show({
                title: 'OTP verified..',
                message: 'Enter new password',
                icon: <IconCheck />,
                color: "teal",
                autoClose: 3000
            })
            setVerified(true)
        }).catch((error) => {
            notifications.show({
                title: 'OTP verification failed',
                message: error.response.data.errorMessage,
                icon: <IconX />,
                color: "red.6",
                autoClose: 3000
            })
        })
        console.log(otp);
    };

    const resendOtp = () => {
        handleSendOtp();
    }

    const changeEmail = () => {
        setOtpSend(false);
    }

    const resetPasswordHandler = () => {
        changePassword(email, password).then((res) => {
            notifications.show({
                title: 'Password changed Successfully.',
                message: 'Your password is reset now.',
                icon: <IconCheck />,
                color: "teal",
                autoClose: 3000
            })

            setTimeout(() => {
                props.close();
            }, 1000)
            setVerified(true)
        }).catch((error) => {
            notifications.show({
                title: '',
                message: error.response.data.errorMessage,
                icon: <IconX />,
                color: "red.6",
                autoClose: 3000
            })
        })
    }

    return (
        <Modal opened={props.opened} onClose={props.close} title="Reset Password">
            <div>
                <TextInput
                    label="Email"
                    size="sm"
                    placeholder="Enter Email"
                    withAsterisk
                    leftSection={<IconAt size={16} />}
                    value={email}
                    name="email"
                    onChange={(e) => { setEmail(e.target.value); setEmailError(signupValidation("email", e.target.value)) }}
                    disabled={optSend}
                    error={emailError}
                />

                {optSend && !verified && (
                    <div className="items-center flex flex-col mt-4">
                        <PinInput
                            length={6}
                            className="!mb-4 !mt-4"
                            type="number"
                            onComplete={handleVerifyOtp}
                        />
                        <div className="flex gap-4">
                            <Button
                                loading={otpLoading}
                                onClick={resendOtp}
                                autoContrast
                                size="xs"
                                className="!mx-auto !mt-3"
                            >
                                Resend OTP
                            </Button>
                            <Button
                                onClick={changeEmail}
                                autoContrast
                                size="xs"
                                className="!mx-auto !mt-3"
                                variant="outline"
                                
                            >
                                Change Email
                            </Button>
                        </div>
                    </div>
                )}

                {verified && (
                    <div>
                        <PasswordInput
                            leftSection={<IconLock size={18} />}
                            label="Password"
                            placeholder="Enter New Password"
                            withAsterisk
                            value={password}
                            name="password"
                            onChange={(e) => { setPassword(e.target.value); setPasswordError(signupValidation("password", e.target.value)) }}
                            error={passwordError}
                            className="mt-4"
                        />
                        <div className="items-center flex mt-2">
                            <Button
                                loading={otpLoading}
                                onClick={resetPasswordHandler}
                                autoContrast
                                disabled={email === ""}
                                size="xs"
                                className="!mx-auto !mt-3"
                            >
                                Change Password
                            </Button>
                        </div>

                    </div>

                )}

                {!optSend && (
                    <div className="items-center flex">
                        <Button
                            loading={otpLoading && !optSend}
                            onClick={handleSendOtp}
                            autoContrast
                            disabled={email === ""}
                            size="xs"
                            className="!mx-auto !mt-3"
                        >
                            Send OTP
                        </Button>
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default ResetPassword;