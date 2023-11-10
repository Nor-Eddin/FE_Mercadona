/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import { Component} from 'react';
import {urlCategory, urlProduct, urlPromotion}from '../endpoints'
import CardProduct from "./CardProduct";
import { Form, Spinner } from 'react-bootstrap';
import { productDTO } from '../Models/productDTO.model';
import { categoryDTO } from '../Models/categoryDTO.model';
import { promotionDTO } from '../Models/promotionDTO.model';
import { isString } from 'formik';




type MyProps = { props:any };
type MyState = { loading: boolean, catalogueProducts: productDTO[], catalogueCategories: categoryDTO[], cataloguePromotions: promotionDTO[] }
export default class Catalogue extends Component <MyProps,MyState>{
    static displayName = Catalogue.name;
    constructor(props: any ) {
        super(props);
        this.state = { catalogueProducts: [], catalogueCategories: [], cataloguePromotions: [], loading: true };
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

        const select = document.querySelector("select");
        const choise:any = select?.selectedIndex;
        const choiseCategory = select?.options[choise].value ;
        
        let cat: any[];

        cat = catalogueCategories.map((c) => (cat = c.categoryName));

        return (
            <>
                <div style={{ display: "flex", justifyContent: "center" }} className="m-3">
                    <Form.Group style={{ width: 500,display:"flex", justifyContent: "space-around" }}>
                        <Form.Select id="categoryFilter" style={{ width: 300 }} autoFocus  >
                            <option>Choisissez une categorie a flitrer</option>
                            {catalogueCategories?.map(category =>
                                <>
                                    <option value={category.catId}>{category.categoryName}</option>
                                </>
                            )}
                        </Form.Select>
                    </Form.Group>
                </div>


                {catalogueProducts.map(product => (choiseCategory ==="Choisissez une categorie a flitrer"?
                    <CardProduct key={product.idProduct}
                        title={product.productName}
                        description={product.descriptionProduct}
                        price={product.price}
                        image={product.image}
                        category={cat[product.catId]}
                        promotion={product.idPromotion}
                    /> : (product.catId +1 ==choiseCategory ?
                        <CardProduct key={product.idProduct}
                            title={product.productName}
                            description={product.descriptionProduct}
                            price={product.price}
                            image={product.image}
                            category={cat[product.catId]}
                            promotion={product.idPromotion}
                        />:<></>))                  
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

