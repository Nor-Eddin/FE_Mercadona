/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { urlPromotion } from '../endpoints';
import { promotionDTO } from '../Models/promotionDTO.model';
import axios, { AxiosResponse } from 'axios';


export default function CardProduct(props: any) {
    const [listPromotions, setListPromotions] = useState<promotionDTO[]>([]);

    useEffect(() => {
        getPromotion();

    },[listPromotions])
    async function getPromotion() {
        await axios.get(urlPromotion)
            .then((response: AxiosResponse<promotionDTO[]>) => {
                setListPromotions(response.data);
            })
    }

    return (
        <>
            <Card style={{ width: '15rem', borderRadius:10 }} className="d-inline-flex m-1" >
                <Card.Img variant="top" src={props.image} />
            <Card.Body >
                    <Card.Title>{props.title}</Card.Title>
                    {props.promotion !== null ? <Card.Title>Prix : {props.price * 1.2} $</Card.Title> : <Card.Title>Prix : {props.price} $</Card.Title>}
                
                <Card.Title>Categorie : {props.category}</Card.Title>
                <Card.Text>
                    {props.description}
                </Card.Text>
            </Card.Body>
            </Card>
        </>
    );
}

