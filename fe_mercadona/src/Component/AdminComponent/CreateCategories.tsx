import { Field, Formik,Form } from 'formik';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Label } from 'reactstrap';

export default function CreateCategory() {
    const history = useHistory();

    return (
        <>
            <h3>Creation d'une categorie</h3>
            <Formik initialValues={{
                nameame: ''
            }} onSubmit={value => {
                //quand le formulaire est envoyé
                console.log(value);
            }
            }>
                <Form>
                    <div className="form-group">
                        <Label htmlFor="name">Nom du produit</Label>
                        <Field name="name" className="form-control"></Field>
                    </div>
                    <Button type='submit'>Sauvegarder le produit</Button>
                    <Link className="btn btn-secondary" to="/product">Annuler</Link>
                </Form>
            </Formik>
           
        </>
    )
}