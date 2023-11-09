/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { urlCategory } from '../../endpoints';
import axios, { AxiosResponse } from 'axios';
import { categoryDTO } from '../../Models/categoryDTO.model';
import ConfirmDeleteCategory from './ConfirmDeleteCategoy';


export default function DeleteCategory() {
    const [show, setShow] = useState(false);
    const [categories, setCategories] = useState<categoryDTO[]>();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        getCategories();

    }, [categories])

    async function getCategories() {
        await axios.get(urlCategory)
            .then((response: AxiosResponse<categoryDTO[]>) => {
                setCategories(response.data);
            })
    }
 
    return (
        <>
            <Button variant="danger" onClick={handleShow}>Supprimer une categorie</Button>
            
            <Modal
                size="lg"
                show={show}
                scrollable={true }
                onHide={() => setShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Suppression de categories
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table className="table table-striped">
                        <thead>
                            <th>Id</th>
                            <th>Nom des categories</th>
                            <th></th>
                        </thead>
                        <tbody>
                            {categories?.map(category =>
                                <>
                                    <tr key={category.catId}>
                                        <td>{category.catId}</td>
                                        <td>{category.categoryName}</td>
                                        <td><ConfirmDeleteCategory
                                            catId={category.catId}
                                            catName={category.categoryName}
                                        ></ConfirmDeleteCategory></td>                                        
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
