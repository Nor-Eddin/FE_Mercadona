import axios from "axios";
import { authenticationResponse, userCredentials } from "./auth.models";
import { urlAccounts } from "../endpoints";
import { useState } from "react";
import AuthForm from "./AuthForm";
import { FormikHelpers } from "formik";


export default function Register() {
    const [errors, setErrors] = useState<string[]>([]);
    async function register(credentiels: userCredentials) {
        try {
            const response = await axios
                .post<authenticationResponse>(`${urlAccounts}/create`, credentiels);
            console.log(response);
        } catch(error) {
            /*setErrors(error.response.data);*/
        }
    }

    return (
        <>
            <h3>Register </h3>
            {/*<DisplayErrors error={errors} />*/}
            <AuthForm model={{ email: '', password: '' }} onSubmit={async values=>await register(values)}/>
        </>
    )
}