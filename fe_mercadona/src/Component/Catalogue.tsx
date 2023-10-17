/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import { Component } from 'react';
import {urlProduct}from '../endpoints'
import CardProduct from "./CardProduct";
import { Spinner } from 'react-bootstrap';


export default class Catalogue extends Component {
    static displayName = Catalogue.name;
    constructor(props:any) {
        super(props);
        this.state = { catalogueProducts: [], loading: true };
    }
    componentDidMount(){
        this.listProductsData();
    
    }
    componentDidUpdate(){
        this.listProductsData();
    }
    static renderProductsTable(catalogueProducts: any[]) {

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
            ? <p><Spinner animation="border" /><em>En chargement...</em></p>
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



