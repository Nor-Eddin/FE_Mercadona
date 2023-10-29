/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import { Component, useState } from 'react';
import {urlCategory, urlProduct, urlPromotion}from '../endpoints'
import CardProduct from "./CardProduct";
import { Spinner } from 'react-bootstrap';


export default class Catalogue extends Component {
    static displayName = Catalogue.name;
    constructor(props:any) {
        super(props);
        this.state = { catalogueProducts: [], catalogueCategories: [], cataloguePromotions: [],  loading: true };
    }
    

    componentDidMount(){
        this.listProductsData();
        this.listCategoriesData();
        this.listPromotionsData();

    
    }
    componentDidUpdate(){
        this.listProductsData();

    }
    static renderProductsTable(catalogueProducts: any[], catalogueCategories: any[],cataloguePromotions:any[]) {

        let cat: any[];

        cat = catalogueCategories.map((c) => (cat = c.categoryName));

        return (
            <>
                
                
                {  catalogueProducts.map(product =>
                    <CardProduct key={product.idProduct}
                        title={product.productName}
                        description={product.descriptionProduct}
                        price={product.price}
                        image={product.image}
                        category={cat[product.catId]}
                        promotion={product.idPromotion}
                    />)
                }
            </>
        );
    }
    render() {
        
        let contents = this.state.loading
            ? <p><Spinner animation="border" /><em>En chargement...</em></p>
            : Catalogue.renderProductsTable(this.state.catalogueProducts, this.state.catalogueCategories,this.state.cataloguePromotions);

    return (
    <>
            <h3>Catalogue des produits</h3>
            {contents}
    </>
    )
    }
    async listProductsData() {
        const response = await fetch(urlProduct);
        const data = await response.json();
        this.setState({ catalogueProducts: data, loading: false });

    }
    async listCategoriesData() {
        const response = await fetch(urlCategory);
        const data = await response.json();
        this.setState({ catalogueCategories: data, loading: false });


    }
    async listPromotionsData() {
        const response = await fetch(urlPromotion);
        const data = await response.json();
        this.setState({ cataloguePromotions: data, loading: false });

    }
}



