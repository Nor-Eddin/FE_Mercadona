/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import { Component} from 'react';
import {urlCategory, urlProduct, urlPromotion}from '../endpoints'
import CardProduct from "./CardProduct";
import { Spinner } from 'react-bootstrap';
import { productDTO } from '../Models/productDTO.model';
import { categoryDTO } from '../Models/categoryDTO.model';
import { promotionDTO } from '../Models/promotionDTO.model';

type MyProps = { props:any };
type MyState = { loading: boolean, catalogueProducts: productDTO[], catalogueCategories: categoryDTO[], cataloguePromotions: promotionDTO[] }
export default class Catalogue extends Component <MyProps,MyState>{
    static displayName = Catalogue.name;
    constructor(props: any ) {
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
    static renderProductsTable(catalogueProducts: any[], catalogueCategories: any[]) {

        let cat: any[];

        cat = catalogueCategories.map((c) => (cat = c.categoryName));

        return (
            <>
                
                
                {catalogueProducts.map(product =>
                    <CardProduct key={product.idProduct}
                        title={product.productName}
                        description={product.descriptionProduct}
                        price={product.price}
                        image={product.image}
                        category={cat[product.catId]}
                        promotion={product.idPromotion}
                    />                    
                )
                    
                }
            </>
        );
    }
    render() {
        
        let contents = this.state.loading
            ? <p><Spinner animation="border" /><em>En chargement...</em></p>
            : Catalogue.renderProductsTable(this.state.catalogueProducts, this.state.catalogueCategories);

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

