/* eslint-disable @typescript-eslint/no-unused-vars */
import { FormEvent, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { urlCategory } from '../../endpoints';
import axios, { AxiosResponse } from 'axios';
import { categoryDTO } from '../../Models/categories.model';

interface CustomElements extends HTMLFormControlsCollection {
    categoryName: HTMLInputElement;
}
interface CustomForm extends HTMLFormElement {
    readonly elements: CustomElements;
}
export default function DeleteCategory() {
    const [show, setShow] = useState(false);
    const [categories, setCategories] = useState<categoryDTO[]>();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        axios.get(urlCategory)
            .then((response: AxiosResponse<categoryDTO[]>) => {
                setCategories(response.data);
            })

            
    },[])
    

/*    const onSubmitCategory = (event: FormEvent<CustomForm>) => {
        event.preventDefault();
        const target = event.currentTarget.elements;

        const data = {
            categoryName: target.categoryName.value
        };
        const options: RequestInit = {
            method: "",
            body: JSON.stringify(data),
            headers: { Accept: "application/json,text/plain", "Content-type": "application/json,charset=UTF-8" }
        }
        fetch(urlCategory, options);

    }*/

    return (
        <>
            <Button variant="danger" onClick={() => setShow(true)}>Supprimer une categorie</Button>
            
            <Modal
                size="lg"
                show={show}
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
                            <th>Nom des categories</th>
                            <th></th>
                        </thead>
                        <tbody>
                            {categories?.map(category =>
                                <>
                                    <tr key={category.catId}>
                                        <td>{category.categoryName}</td>
                                        <td><Button className="bg-danger">Supprimer</Button></td>
                                    </tr>
                                <tr></tr>
                                </>
                            )}
                        </tbody>
                    </table>
                </Modal.Body>
            </Modal>
        </>
    );

}
