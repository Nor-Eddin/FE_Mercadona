import { useEffect, useState } from "react";
import { productDTO } from "../Products/products.model";
import CardProduct from "./CardProduct";
import axios, { AxiosResponse } from "axios";
import { urlProduct } from "../endpoints";

export default function Promotion() {
    const [promotionsProduct, setPromotionsProduct] = useState<productDTO[]>();
    useEffect(() => {
        setInterval(() => axios.get(urlProduct)
            .then((response: AxiosResponse<productDTO[]>) => {
                console.log(response.data);
                setPromotionsProduct(response.data);
            }), 5000) });
    
    return (

            <>
            <h3>Produits en promotion</h3>
            
                
                {promotionsProduct?.map(product =>
                    <CardProduct key={product.idProduct}
                        title={product.productName}
                        description={product.descriptionProduct}
                        price={product.price}
                        image={product.image}
                        category={product.cat} />)}
            
                
            </>
       
    );
}