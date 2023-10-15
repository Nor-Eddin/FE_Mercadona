import { useEffect } from "react";
import { Link } from "react-router-dom";
import { urlProduct } from "../../endpoints";
import { productDTO } from "../../Products/products.model";
import axios, { AxiosResponse } from "axios";

export default function IndexProducts() {

    useEffect(() => {
        axios.get(urlProduct)
            .then((response: AxiosResponse<productDTO[]>) => {
                console.log(response.data);
            })
    },[])

    return (
        <>
            <h3>Produits</h3>
            <Link className="btn btn-primary" to={"./admincomponent/create"}>Créer un produit</Link>
        </>
    )
}