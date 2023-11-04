/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import { Component } from "react";
import CardProduct from "./CardProduct";
import { urlCategory, urlProduct, urlPromotion } from "../endpoints";
import { Spinner } from "react-bootstrap";

export default class Promotion extends Component {
    static displayName = Promotion.name;
    constructor(props:any) {
        super(props);
        this.state = { listProducts: [], listPromotions: [], listCategories:[], loading: true };
    }
    componentDidMount() {
        this.listProductsData();
        this.listPromotionsData();
        this.listCategoriesData();

    }
    componentDidUpdate() {
        this.listProductsData();
    }
    static renderProductsTable(listProducts: any[], listPromotions: any[],listCategories:any[]) {
        let cat: any[];

        cat = listCategories.map((c) => (cat = c.categoryName));    
        return (
            <>
                {
                      
                    listProducts.map(product =>                        
                        product.idPromotion?
                            <CardProduct key={product.idProduct}
                                title={product.productName}
                                description={product.descriptionProduct}
                                price={product.price}
                                image={product.image}
                                category={cat[product.catId]}
                                promotion={product.idPromotion} /> : <></>
                    )
                }
            </>
        );
    }
    render() {
        
        let contents = this.state.loading
            ? <p><Spinner animation="border" /><em>En chargement...</em></p>
            : Promotion.renderProductsTable(this.state.listProducts, this.state.listPromotions, this.state.listCategories);
        return (
            <>
                <h3>Catalogue des produits en promotions</h3>
                {contents}
            </>
        )
    }
    async listProductsData() {
        const response = await fetch(urlProduct);
        const data = await response.json();
        this.setState({ listProducts: data, loading: false });

    }
    async listCategoriesData() {
        const response = await fetch(urlCategory);
        const data = await response.json();
        this.setState({ listCategories: data, loading: false });


    }
    async listPromotionsData() {
        const response = await fetch(urlPromotion);
        const data = await response.json();
        this.setState({ listPromotions: data, loading: false });

    }
}