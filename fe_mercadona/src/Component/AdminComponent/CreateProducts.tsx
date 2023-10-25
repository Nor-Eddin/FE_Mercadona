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
    const [hide, setHide] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleHide = () => setHide(true);
    const handleNotHide = () => setHide(false);
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
        const options: RequestInit = {
            method: "POST",
            body: JSON.stringify(data),
            headers: { Accept: "application/json,text/plain", "Content-type": "application/json,charset=UTF-8" }
        }
        fetch(urlProduct, options)
            .then(handleClose);


    }

    return (
        <>
            <Button variant="light" onClick={handleShow} >
                Ajouter un nouveau produit
            </Button>

            <Modal show={show}  >
                <Modal.Header>
                    <Modal.Title>Identification du produit</Modal.Title>
                </Modal.Header>
                <Form onSubmit={onSubmitProduct} >
                    <Modal.Body onClick={handleNotHide}>
                    
                        <Form.Group className="mb-3"  >
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
                                    <Button variant="primary"  onClick={handleHide} >
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