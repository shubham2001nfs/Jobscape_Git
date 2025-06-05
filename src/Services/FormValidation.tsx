import { PasswordInput } from "@mantine/core";

const signupValidation = (name: string, value: string) => {
    switch (name) {
        case "name":
            if (value.length === 0) {
                return "Name is required!"
            }
            else {
                return "";
            }
        case "email":
            if (value.length === 0) {
                return "Email is required!";
            }
            if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
                return "Email is invalid!"
            }
            else {
                return "";
            }
        case "password":
            if (value.length === 0) {
                return "Password is required!";
            }
            if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/.test(value)) {
                return "Password is invalid!";
            }
            else {
                return "";
            }

        default:
            return "";
    }

}

const loginValidation = (name: string, value: string) => {
    switch (name) {
        case "email":
            if (value.length === 0) {
                return "Email is required!";
            }
            if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
                return "Email is invalid!"
            }
            else {
                return "";
            }
        case "password":
            if (value.length === 0) {
                return "Password is required!";
            }
            if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/.test(value)) {
                return "Password is invalid!";
            }
            else {
                return "";
            }

        default:
            return "";


    }

}
export { signupValidation, loginValidation };