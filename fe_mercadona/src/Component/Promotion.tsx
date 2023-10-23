/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import { Component } from "react";
import CardProduct from "./CardProduct";
import { urlProduct } from "../endpoints";
import Catalogue from './Catalogue';
import { Spinner } from "react-bootstrap";

export default class Promotion extends Component {
    static displayName = Promotion.name;
    constructor(props:any) {
        super(props);
        this.state = { promotionProducts: [], loading: true };
    }
    componentDidMount() {
        this.listProductsData();

    }
    componentDidUpdate() {
        this.listProductsData();
    }
    static renderProductsTable(promotionProducts: any[]) {

        return (
            <>
                {
                    promotionProducts.map(product =>
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
    render() {
        let contents = this.state.loading
            ? <p><Spinner animation="border" /><em>En chargement...</em></p>
            : Promotion.renderProductsTable(this.state.promotionProducts);
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
        this.setState({ promotionProducts: data, loading: false });

    }
}