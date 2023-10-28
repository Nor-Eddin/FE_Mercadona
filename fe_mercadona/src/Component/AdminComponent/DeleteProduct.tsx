import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { urlProduct } from '../../endpoints';

export default function DeleteProduct(props: any) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    async function deleteProduct(id: number) {
        try {
            await fetch(`${urlProduct}/${id}`, { method: 'DELETE' })
                .then(handleClose);

        } catch (e) {
            if (e) console.error(e);
        }
    }

    return (
        <>
            <Button variant="danger" onClick={handleShow}>
                Suprimer
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>Suppression du produit!!!!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Etes vous sur de vouloir supprimer ce produit "{props.productName}"?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleClose}>NON</Button>
                    <Button variant="danger" onClick={() => deleteProduct(props.idProduct)}>OUI</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

