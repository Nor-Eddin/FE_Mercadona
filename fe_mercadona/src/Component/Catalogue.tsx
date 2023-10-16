/* eslint-disable prefer-const */
import axios, { AxiosResponse } from "axios";
import { Component, useEffect, useState } from 'react';
import { productDTO } from '../Products/products.model';
import {urlProduct}from '../endpoints'
import CardProduct from "./CardProduct";


export default class Catalogue extends Component {
    static displayName = Catalogue.name;
    constructor(props) {
        super(props);
        this.state = { catalogueProducts: [], loading: true };
    }
    componentDidMount(){
        this.listProductsData();
    
    }
    static renderProductsTable(catalogueProducts) {

        return (
            <>
                {
                    catalogueProducts.map(product =>
                        <CardProduct key={product.idProduct}
                            title={product.productName}
                            description={product.descriptionProduct}
                            price={product.price}
                            image={product.image}
                            category={product.category} />)
                }
            </>
        );
    }
    render(){
        let contents = this.state.loading
            ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See  for more details.</em></p>
            : Catalogue.renderProductsTable(this.state.catalogueProducts);
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
}


