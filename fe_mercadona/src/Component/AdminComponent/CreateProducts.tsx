import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

interface CustomElements extends HTMLFormControlsCollection {
    IdProduct: HTMLInputElement;
    ProductName: HTMLInputElement;
    DescriptionProduct: HTMLInputElement;
    Price: HTMLInputElement;
    Image: HTMLInputElement;
    Category: HTMLInputElement;
    Promotion: HTMLInputElement;
}
interface CustomForm extends HTMLFormElement {
    readonly elements: CustomElements;
}

export default function CreateProduct() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="light" onClick={handleShow} >
                Ajouter un nouveau produit
            </Button>

            <Modal show={show} >
                <Modal.Header closeButton>
                    <Modal.Title>Identification du produit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Nom du produit</Form.Label>
                            <Form.Control type="text" placeholder="Nom du produit" autoFocus/>
                        </Form.Group>
                         <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Description du produit</Form.Label>
                            <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Categorie du produit</Form.Label>
                            <Form.Control type="text" placeholder="Nom du produit" autoFocus />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Prix du produit</Form.Label>
                            <Form.Control type="number" placeholder="Prix du produit" autoFocus />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Photo du produit</Form.Label>
                            <Form.Control type="image" placeholder="Photo du produit" autoFocus />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Annuler
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Ajouter
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}