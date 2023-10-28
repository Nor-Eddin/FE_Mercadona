import { FormEvent, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { urlCategory } from '../../endpoints';

interface CustomElements extends HTMLFormControlsCollection {
    categoryName: HTMLInputElement;
}
interface CustomForm extends HTMLFormElement {
    readonly elements: CustomElements;
}
export default function CreateCategory() {
    const [show, setShow] = useState(false);
    const [hide, setHide] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleHide = () => setHide(true);
    const handleNotHide = () => setHide(false);
    const onSubmitCategory = (event: FormEvent<CustomForm>) => {
        event.preventDefault();
        const target = event.currentTarget.elements;

        const data = {
            categoryName: target.categoryName.value
        };
        const options: RequestInit = {
            method: "POST",
            body: JSON.stringify(data),
            headers: { Accept:"application/json,text/plain", "Content-type": "application/json,charset=UTF-8" }
        }
        fetch(urlCategory, options)
            .then(handleClose);

    }

    return (
        <>
            <Button variant="light" onClick={handleShow} >
                Ajouter une nouvelle categorie
            </Button>

            <Modal show={show}  >
                <Modal.Header>
                    <Modal.Title>Nom de la categorie</Modal.Title>
                </Modal.Header>
                <Form onSubmit={onSubmitCategory}>
                    <Modal.Body onClick={handleNotHide}>
                    
                        <Form.Control id="categoryName" type="text" placeholder="Nom de la categorie" required autoFocus/>
                    
                </Modal.Body>
                <Modal.Footer>
                        {
                            hide ?
                                <>
                                    <div ><strong>Valider votre choix?   </strong></div>
                                    <Button variant="secondary" onClick={handleNotHide}>
                                        Non
                                    </Button>
                                    <Button variant="primary" type="submit" >
                                        Oui
                                    </Button>
                                </> :
                                <>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Annuler
                                    </Button>
                                    <Button variant="primary" onClick={handleHide} >
                                        Ajouter
                                    </Button>
                                </>
                        }
                </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}