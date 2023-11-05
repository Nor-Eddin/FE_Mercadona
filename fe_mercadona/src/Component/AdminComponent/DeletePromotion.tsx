import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { urlPromotion } from '../../endpoints';
import { promotionDTO } from '../../Models/promotionDTO.model';
import axios, { AxiosResponse } from 'axios';
import ConfirmDeletePromotion from './ConfirmDeletePromotion';


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
            <Button variant="danger" onClick={handleShow}>Supprimer une promotion</Button>

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
                            <th>Id</th>
                            <th>Date de debut</th>
                            <th>Date de fin</th>
                            <th>Taux de promotion</th>
                            <th></th>
                        </thead>
                        <tbody>
                            {promotions?.map(promotion =>
                                <>
                                    <tr >
                                        <td>{promotion.idPromotion}</td>
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