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

    }, [])
    async function getPromotion() {
        await axios.get(urlPromotion)
            .then((response: AxiosResponse<promotionDTO[]>) => {
                setListPromotions(response.data);

            })
    }


   const promo:any = listPromotions.find(l => (props.promotion === l.idPromotion));
    
        return (
            <>
                
                <Card style={{ width: '15rem', borderRadius: 10 }} className="d-inline-flex m-1" >
                    <Card.Img variant="top" src={props.image} />
                    <Card.Body >
                        
                        <Card.Title>{props.title}</Card.Title>
                        {
                            props.promotion ?

                                <Card.Title className="text-danger">Prix PROMO
                                    <strong>  {(Math.round((props.price * (1 - (promo?.tauxPromotion / 100))) * 100)) / 100} &euro;</strong>
                                </Card.Title> : <Card.Title>Prix : {props.price} &euro; </Card.Title>}

                        <Card.Title>Categorie : {props.category}</Card.Title>
                        <Card.Text>
                            {props.description}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </>
        );
    
}

