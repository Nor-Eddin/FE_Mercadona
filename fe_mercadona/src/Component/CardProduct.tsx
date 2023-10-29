/* eslint-disable @typescript-eslint/no-explicit-any */
import Card from 'react-bootstrap/Card';


export default function CardProduct(props: any) {


    return (
        <>
            <Card style={{ width: '15rem', borderRadius:10 }} className="d-inline-flex m-1" >
                <Card.Img variant="top" src={props.image} />
            <Card.Body >
                <Card.Title>{props.title}</Card.Title>
                <Card.Title>Prix : {props.price} $</Card.Title>
                <Card.Title>Categorie : {props.category}</Card.Title>
                <Card.Text>
                    {props.description}
                </Card.Text>
            </Card.Body>
            </Card>
        </>
    );
}
