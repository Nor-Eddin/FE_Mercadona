import { FormEvent, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { urlPromotion } from '../../endpoints';
import { promotionDTO } from '../../Models/promotionDTO.model';
import axios, { AxiosResponse } from 'axios';
import ConfirmDeletePromotion from './ConfirmDeletePromotion';

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
    const [promotions, setPromotions] = useState<promotionDTO[]>();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        getPromotions();

    }, [promotions])

    async function getPromotions() {
        await axios.get(urlPromotion)
            .then((response: AxiosResponse<promotionDTO[]>) => {
                setPromotions(response.data);
            })
    }
   

    return (
        <>
            <Button variant="danger" onClick={() => setShow(true)}>Supprimer une promotion</Button>

            <Modal
                size="lg"
                show={show}
                scrollable={true}
                onHide={() => setShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Suppression de promotion
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table className="table table-striped">
                        <thead>
                            <th>Date de debut</th>
                            <th>Date de fin</th>
                            <th>Taux de promotion</th>
                            <th></th>
                        </thead>
                        <tbody>
                            {promotions?.map(promotion =>
                                <>
                                    <tr key={promotion.idPromotion}>
                                        <td>{promotion.dateToStart}</td>
                                        <td>{promotion.dateToEnd}</td>
                                        <td>{promotion.tauxPromotion}</td>
                                        <td><ConfirmDeletePromotion
                                            idPromotion={promotion.idPromotion}
                                        ></ConfirmDeletePromotion></td>
                                    </tr>
                                    <tr></tr>
                                </>
                            )}
                        </tbody>
                    </table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleClose}>Fermer</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}