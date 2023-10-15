import { Link } from "react-router-dom";
import { urlProduct } from "../endpoints";
import GenericList from "../Utils/GenericList";
import IndividualProduct from "./IndividualProduct";
import { productDTO } from "./products.model";
import css from "./ProductsList.module.css"

export default function ProductsList(props: productsListProps) {
    
    return (
        <>
            <GenericList loadingUI={<>Loading......</>} list={props.products} >
               {/* <div className={css.div}>
                    {props.products?.map(product =>
                        <IndividualProduct {...product} key={product.IdProduct} />)}
                </div>*/}
                <table className="table table-striped">
                    <thead>
                        <th>Titre</th>
                        <th>Description</th>
                        <th>Prix</th>
                        <th>Image</th>
                        <th>Categories</th>
                        <th></th>
                    </thead>
                    <tbody>
                        {props.products?.map(product =>
                            <tr key={product.IdProduct}>
                                <td>{product.ProductName}</td>
                                <td>{product.DescriptionProduct}</td>
                                <td>{ product.Price}</td>
                                <td>{product.Image}</td>
                                <td>{product.Category}</td>
                                <td>
                                    <Link className="btn btn-sucess" to={`{/products/${product.IdProduct}}`}>Modifier</Link>
                                    <button className="btn btn-danger">Supprimer</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </GenericList>
        </>
        )
  
}

interface productsListProps {
    products?: productDTO[];
}


