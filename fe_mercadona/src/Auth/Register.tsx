import axios from "axios";
import { authenticationResponse, userCredentials } from "./auth.models";
import { urlAccounts } from "../endpoints";
import AuthForm from "./AuthForm";
export default function Register() {
    async function register(credentiels: userCredentials) {
        try {
            const response = await axios
                .post<authenticationResponse>(`${urlAccounts}/create`, credentiels);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <h3>Register </h3>            
            <AuthForm model={{ email: '', password: '' }} onSubmit={async values=>await register(values)}/>
        </>
    )
}