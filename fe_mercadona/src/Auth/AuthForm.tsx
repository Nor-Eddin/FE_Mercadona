import { Form, Formik, FormikHelpers } from "formik";
import { userCredentials } from "./auth.models";
import * as Yup from 'yup';
import TextField from "../Forms/TextField";

import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";



export default function AuthForm(props: authFormProps) {
    return (
        <Formik
            initialValues={props.model}
            onSubmit={props.onSubmit}
            validationSchema={Yup.object({
                email: Yup.string().required('Ce champ est requis')
                    .email('Vous devez entrer un email valide'),
                password:Yup.string().required('Ce champ est requis')
            })}
        >

            <Form style={{ width: 300}}>
                <TextField field="email" displayName="Email" />
                <TextField field="password" displayName="Password" type="password" />
                <Button  type="submit">Envoyer</Button>
                <Link className="btn btn-secondary" to="/">Annuler</Link>
                </Form>
            
            </Formik>
    )
}

interface authFormProps {
    model: userCredentials;
    onSubmit(values: userCredentials, actions: FormikHelpers<userCredentials>): void;
}