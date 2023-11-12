/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { FormEvent, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { urlCategory, urlProduct, urlPromotion } from '../../endpoints';
import axios, { AxiosResponse } from 'axios';
import { categoryDTO } from '../../Models/categoryDTO.model';
import { promotionDTO } from '../../Models/promotionDTO.model';


interface CustomElements extends HTMLFormControlsCollection {
    promotion: HTMLInputElement;
}
interface CustomForm extends HTMLFormElement {
    readonly elements: CustomElements;
}
export default function AddPromToProduct(props: any) {

    const [show, setShow] = useState(false);
    const [hide, setHide] = useState(false);
    const [listCategories, setListCategories] = useState<categoryDTO[]>();
    const [listPromotions, setListPromotions] = useState<promotionDTO[]>();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleHide = () => setHide(true);
    const handleNotHide = () => setHide(false);

    const onSubmitProduct = (event: FormEvent<CustomForm>) => {
        event.preventDefault();
        const target = event.currentTarget.elements;

        const data = {
            productName: props.productName,
            descriptionProduct: props.descriptionProduct,
            price: props.price,
            image: props.image,
            catId: props.catId,
            idPromotion: target.promotion.value == "choisir une promotion" ? null : target.promotion.value

        };
        const options: RequestInit = {
            method: "PUT",
            body: JSON.stringify(data),
            headers: { Accept: "application/json,text/plain", "Content-type": "application/json,charset=UTF-8" }
        }
        fetch(`${urlProduct}/${props.idProduct}`, options)
            .then(handleClose)
        console.log(data);
    }
    useEffect(() => {
        getCategories();
        getPromotions();
    }, [listCategories])
    async function getCategories() {
        await axios.get(urlCategory)
            .then((response: AxiosResponse<categoryDTO[]>) => {
                setListCategories(response.data);
            })
    }
    async function getPromotions() {
        await axios.get(urlPromotion)
            .then((response: AxiosResponse<promotionDTO[]>) => {
                setListPromotions(response.data);
            })
    }

    return (
        <>
            <Button variant="light" onClick={handleShow}>Ajouter une promotion</Button>

            <Modal
                size="lg"
                show={show}
                onHide={() => setShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Ajouter une promotion a un produit
                    </Modal.Title>
                </Modal.Header>
                <Form onSubmit={onSubmitProduct}>
                    <Modal.Body onClick={handleNotHide}>

                        <Form.Group className="mb-3"  >
                            <Form.Label htmlFor="productName"><b>Nom du produit :</b> {props.productName}</Form.Label><br />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="descriptionProduct"><b>Description du produit :</b> {props.descriptionProduct} </Form.Label><br />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="category"><b>Categorie du produit :</b> {props.catId}</Form.Label><br />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="price"><b>Prix du produit :</b> {props.price}</Form.Label><br />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="image"><b>Photo du produit :</b> {props.image}</Form.Label><br />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="promotion"><b>choix de la promotion</b> </Form.Label><br />
                            <Form.Select id="promotion" autoFocus required>
                                <option>choisir une promotion</option>
                                {listPromotions?.map(promotion => (
                                    <>
                                        <option value={promotion.idPromotion}>Du : {promotion.dateToStart} Au : {promotion.dateToEnd} A : {promotion.tauxPromotion} %</option>
                                        
                                    </>
                                    
                                )
                                )}
                            </Form.Select>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        {
                            hide ?
                                <>
                                    <div ><b>Valider votre choix?   </b></div>
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
