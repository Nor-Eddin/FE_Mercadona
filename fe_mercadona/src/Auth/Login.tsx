import { FormikHelpers } from "formik";
import AuthForm from "./AuthForm";
import { authenticationResponse, userCredentials } from "./auth.models";
import { useNavigate } from 'react-router-dom';
import { urlAccounts } from "../endpoints";
import axios from "axios";
import { useContext, useState } from "react";
import { getClaim, saveToken } from "./handleJWT";
import AuthenticationContext from "./AuthenticationContext";

export default function Login() {
    const [errors, setErrors] = useState<string[]>([]);
    const { update } = useContext(AuthenticationContext);
    const navigate = useNavigate();
    async function login(credentials: userCredentials) {
        try {
            const response = await axios
                .post<authenticationResponse>(`${urlAccounts}/login`, credentials)
            saveToken(response.data);
            update(getClaim());
            navigate('/');
        } catch (error) {
            setErrors(error.response.data)
        }
    }

    return (
        <>
            <h3>Login</h3>
            {/*<DisplayErrors errors={errors} />*/}
            <div style={{ display: "flex", justifyContent: "space-around" }}>
            <AuthForm  model={{ email: '', password: '' }}
                    onSubmit={async values => await login(values)} />
            </div>
        </>
    )
}