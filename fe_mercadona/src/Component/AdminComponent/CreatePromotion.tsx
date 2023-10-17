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
export default function CreatePromotion() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const onSubmitPromotion = (event: FormEvent<CustomForm>) => {
        event.preventDefault();
        const target = event.currentTarget.elements;

        const data = {
            dateToStart: target.dateToStart.value,
            dateToEnd: target.dateToEnd.value,
            tauxPromotion:target.tauxPromotion.value
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
            <Button variant="light" onClick={handleShow} >
                Ajouter une nouvelle promotion
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Contenu de la nouvelle promotion</Modal.Title>
                </Modal.Header>
                <Form onSubmit={onSubmitPromotion }>
                <Modal.Body>

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="dateToStart">Date de debut</Form.Label>
                            <Form.Control id="dateToStart" type="date" autoFocus required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="dateToEnd">date de fin</Form.Label>
                            <Form.Control id="dateToEnd" type="date" autoFocus required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="tauxPromotion">Taux de promotion</Form.Label>
                            <Form.Control id="tauxPromotion" type="number" autoFocus required/>
                        </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                        </Button>
                        <Button variant="primary" type="submit" onClick={handleClose}>
                        Save Changes
                    </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}