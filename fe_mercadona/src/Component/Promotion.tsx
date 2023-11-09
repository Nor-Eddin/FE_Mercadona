/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import { Component } from "react";
import CardProduct from "./CardProduct";
import { urlCategory, urlProduct, urlPromotion } from "../endpoints";
import { Form, Spinner } from "react-bootstrap";
import { productDTO } from "../Models/productDTO.model";
import { categoryDTO } from "../Models/categoryDTO.model";
import { promotionDTO } from "../Models/promotionDTO.model";

type MyProps = { props: any };
type MyState = { loading: boolean, listProducts: productDTO[], listCategories: categoryDTO[], listPromotions: promotionDTO[] }
export default class Promotion extends Component<MyProps, MyState>{
    static displayName = Promotion.name;
    constructor(props: any) {
        super(props);
        this.state = { listProducts: [], listPromotions: [], listCategories: [], loading: true };
    }
    componentDidMount() {
        this.listProductsData();
        this.listPromotionsData();
        this.listCategoriesData();

    }
    componentDidUpdate() {
        this.listProductsData();
    }
    static renderProductsTable(listProducts: any[], listCategories: any[]) {
        const select = document.querySelector("select");
        const choise: any = select?.selectedIndex;
        const choiseCategory = select?.options[choise].value;
        let cat: any[];

        cat = listCategories.map((c) => (cat = c.categoryName));    
        return (
            <>
                <div style={{ display: "flex", justifyContent: "center" }} className="m-3">
                <Form.Group style={{ width: 300, display: "flex", justifyContent: "space-around" }}>
                    <Form.Select id="categoryFilter" style={{ width: 300 }} autoFocus  >
                            <option>Choisissez une categorie a flitrer</option>
                        {listCategories?.map(category =>
                            <>
                                <option value={category.catId}>{category.categoryName}</option>
                            </>
                        )}
                    </Form.Select>
                    </Form.Group>
                </div>

                {listProducts.map(product => (                       
                        product.idPromotion?
                        (choiseCategory === "Choisissez une categorie a flitrer" ?
                                <CardProduct key={product.idProduct}
                                    title={product.productName}
                                    description={product.descriptionProduct}
                                    price={product.price}
                                    image={product.image}
                                    category={cat[product.catId]}
                                    promotion={product.idPromotion}
                                /> : (product.catId + 1 == choiseCategory ?
                                    <CardProduct key={product.idProduct}
                                        title={product.productName}
                                        description={product.descriptionProduct}
                                        price={product.price}
                                        image={product.image}
                                        category={cat[product.catId]}
                                        promotion={product.idPromotion}
                                    /> : <></>)): <></>)
                    )
                }
            </>
        );
    }
    render() {
        
        let contents = this.state.loading
            ? <p><Spinner animation="border" /><em>En chargement...</em></p>
            : Promotion.renderProductsTable(this.state.listProducts, this.state.listCategories);
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