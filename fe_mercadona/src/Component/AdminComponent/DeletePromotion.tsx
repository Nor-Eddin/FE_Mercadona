import { FormEvent, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { urlPromotion } from '../../endpoints';

interface CustomElements extends HTMLFormControlsCollection {
    dateToStart: HTMLInputElement;
    dateToEnd: HTMLInputElement;
    tauxPromotion: HTMLInputElement;
}
interface CustomForm extends HTMLFormElement {
    readonly elements: CustomElements;
}
export default function DeletePromotion() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const onSubmitPromotion = (event: FormEvent<CustomForm>) => {
        event.preventDefault();
        const target = event.currentTarget.elements;

        const data = {
            dateToStart: target.dateToStart.value,
            dateToEnd: target.dateToEnd.value,
            tauxPromotion: target.tauxPromotion.value
        };
        const options: RequestInit = {
            method: "POST",
            body: JSON.stringify(data),
            headers: { Accept: "application/json,text/plain", "Content-type": "application/json,charset=UTF-8" }
        }
        fetch(urlPromotion, options);

    }

    return (
        <>
            <Button variant="danger" onClick={() => setShow(true)}>Supprimer une promotion</Button>

            <Modal
                size="lg"
                show={show}
                onHide={() => setShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Suppression de promotion
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                </Modal.Body>
            </Modal>
        </>
    );
}