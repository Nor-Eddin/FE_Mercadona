import { productDTO } from "./products.model";
import css from './IndividualProduct.module.css'
import Card from 'react-bootstrap/Card';

export default function IndividualProduct(props: productDTO) {

    const buildLink = () => `/product/${props.IdProduct}`


    return (
        <div className={css.div}>
            <a href={buildLink()}><img alt="Image" src={props.Image} /></a>
            <p><a href={buildLink()}>{props.ProductName}</a></p>
            <p><a href={buildLink()}>{props.DescriptionProduct}</a></p>
            <p><a href={buildLink()}>Prix : {props.Price} $</a></p>

        </div>

       /* <Card className={css.div} style={{ width: '18rem' }}>
            <Card.Img variant="top" src={props.Image} />
            <Card.Body>
                <Card.Title >{props.ProductName}</Card.Title>
                <Card.Text >{props.DescriptionProduct}</Card.Text>
                <Card.Text >{props.Price}</Card.Text>
            </Card.Body>
        </Card>*/
    );
}