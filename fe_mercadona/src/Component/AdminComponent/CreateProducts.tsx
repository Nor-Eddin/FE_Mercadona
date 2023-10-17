import { FormEvent, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { urlProduct } from '../../endpoints';

interface CustomElements extends HTMLFormControlsCollection {
    productName: HTMLInputElement;
    descriptionProduct: HTMLInputElement;
    price: HTMLInputElement;
    image: HTMLInputElement;
    category: HTMLInputElement;
}
interface CustomForm extends HTMLFormElement {
    readonly elements: CustomElements;
}

export default function CreateProduct() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const onSubmitProduct = (event: FormEvent<CustomForm>) => {
        event.preventDefault();
        const target = event.currentTarget.elements;

        const data = {
            productName: target.productName.value,
            descriptionProduct: target.descriptionProduct.value,
            price: target.price.value,
            image: target.image.value,
            catId: target.category.value,
        };
        console.log(data);
        const options: RequestInit = {
            method: "POST",
            body: JSON.stringify(data),
            headers: { Accept: "application/json,text/plain", "Content-type": "application/json,charset=UTF-8" }
        }
        fetch(urlProduct, options);

    }

    return (
        <>
            <Button variant="light" onClick={handleShow} >
                Ajouter un nouveau produit
            </Button>

            <Modal show={show} >
                <Modal.Header closeButton>
                    <Modal.Title>Identification du produit</Modal.Title>
                </Modal.Header>
                <Form onSubmit={onSubmitProduct }>
                <Modal.Body>
                    
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="productName">Nom du produit</Form.Label><br />
                            <Form.Control id="productName" type="text" placeholder="Nom du produit" autoFocus required/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="descriptionProduct">Description du produit</Form.Label><br />
                            <Form.Control id="descriptionProduct" type="textarea" required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="category">Categorie du produit</Form.Label><br />
                            <Form.Control id="category" type="number" placeholder="Nom du produit" autoFocus required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="price">Prix du produit</Form.Label><br />
                            <Form.Control id="price" type="number" placeholder="Prix du produit" autoFocus required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="image">Photo du produit</Form.Label><br/>
                            <Form.Control id="image" type="text" placeholder="Photo du produit" autoFocus required />
                        </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Annuler
                        </Button>
                        <Button variant="primary" type="submit" >
                            Ajouter
                        </Button>
                        
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}