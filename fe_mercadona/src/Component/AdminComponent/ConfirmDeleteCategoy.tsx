import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { urlCategory } from '../../endpoints';

export default function ConfirmDeleteCategory(props: any) {
    const [show, setShow] = useState(false);

    const handleClose = () => { setShow(false) };
    const handleShow = () => setShow(true);

    async function deleteCategory(id: number) {
        try {
            await fetch(`${urlCategory}/${id}`, { method: 'DELETE' })
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
                    Etes vous sur de vouloir supprimer la categorie "{props.catName}"?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleClose}>NON</Button>
                    <Button variant="danger" onClick={() => deleteCategory(props.catId)}>OUI</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

