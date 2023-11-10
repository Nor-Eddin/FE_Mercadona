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
                    <Card.Img variant="top" src="https://media.istockphoto.com/id/184276818/fr/photo/pomme-rouge.jpg?s=2048x2048&w=is&k=20&c=fJPExnDOm-czofY8orZKWP3Vn7pQ-66Oubs_mQMVgJ4=" />
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

