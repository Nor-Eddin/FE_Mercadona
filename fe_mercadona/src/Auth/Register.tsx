import axios from "axios";
import { authenticationResponse, userCredentials } from "./auth.models";
import { urlAccounts } from "../endpoints";
import { useContext} from "react";
import {  useNavigate } from 'react-router-dom';
import AuthForm from "./AuthForm";
import { getClaim, saveToken } from "./handleJWT";
import AuthenticationContext from "./AuthenticationContext";


export default function Register() {
    //const [errors, setErrors] = useState<string[]>([]);
    const { update } = useContext(AuthenticationContext);
    const navigate = useNavigate();
    async function register(credentiels: userCredentials) {
        try {
            const response = await axios
                .post<authenticationResponse>(`${urlAccounts}/create`, credentiels);
            saveToken(response.data);
            update(getClaim());
            navigate('/');
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