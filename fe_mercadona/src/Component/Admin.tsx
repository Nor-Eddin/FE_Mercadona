/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import 'bootstrap/dist/css/bootstrap.min.css';
import { ButtonGroup, Spinner } from 'react-bootstrap';
import './NavMenu.css';
import { Component } from 'react';
import { urlCategory, urlProduct, urlPromotion } from '../endpoints';
import CreateProduct from './AdminComponent/CreateProducts';
import CreateCategory from './AdminComponent/CreateCategories';
import CreatePromotion from './AdminComponent/CreatePromotion';
import Authorized from '../Auth/Authorized';
import { Link } from 'react-router-dom';
import DeleteCategory from './AdminComponent/DeleteCategory';
import DeletePromotion from './AdminComponent/DeletePromotion';
import EditProduct from './AdminComponent/EditProducts';
import DeleteProduct from './AdminComponent/DeleteProduct';
import AddPromToProduct from './AdminComponent/AddPromToProduct';
import { productDTO } from '../Models/productDTO.model';
import { categoryDTO } from '../Models/categoryDTO.model';
import { promotionDTO } from '../Models/promotionDTO.model';

type MyProps = { props: any };
type MyState = { loading: boolean, listProducts: productDTO[], listCategories: categoryDTO[], listPromotions: promotionDTO[] }
export default class Admin extends Component<MyProps, MyState> {
    static displayName = Admin.name;
    constructor(props: any) {
        super(props);
        this.state = { listProducts: [], listCategories: [], listPromotions: [], loading: true };
    }
    componentDidMount() {
        this.listProductsData();
        this.listCategoriesData();
        this.listPromotionsData();

    }
    componentDidUpdate() {
        this.listProductsData();
    }
    static renderListTable(listProducts: any[],listCategories: any[]) {
        let cat: any[];
        
        cat = listCategories.map((c) => (cat = c.categoryName));

        return (
            <>
                {
                    listProducts.map(product => (
                        <tr>
                            <th scope="row" key={product.idProduct }>{product.idProduct}</th>
                            <td>{product.productName}</td>
                            <td>{product.descriptionProduct}</td>
                            <td>{product.price}</td>
                            <td>{product.image}</td>
                            <td>{cat[product.catId]}</td>
                            <td>{product.idPromotion}</td>
                            <td  >
                                <ButtonGroup className="buttonUpdate" >
                                    <EditProduct key={product.idProduct}
                                        idProduct={product.idProduct}
                                        productName={product.productName}
                                        descriptionProduct={product.descriptionProduct}
                                        price={product.price}
                                        image={product.image}
                                        catId={product.catId}
                                        promotion={product.promotions}
                                    />
                                    <AddPromToProduct key={product.idProduct}
                                        idProduct={product.idProduct}
                                        productName={product.productName}
                                        descriptionProduct={product.descriptionProduct}
                                        price={product.price}
                                        image={product.image}
                                        catId={product.catId}
                                        promotion={product.promotions}

                                    />
                                    <DeleteProduct
                                        idProduct={product.idProduct}
                                        productName={product.productName}
                                    />
                                </ButtonGroup>
                            </td>
                        </tr>
                    ))
                }
            </>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><Spinner animation="border" /><em>En chargement...</em></p>
            : Admin.renderListTable(this.state.listProducts, this.state.listCategories);
        return (
            <>
                <Authorized
                    authorized={
                        <>
                            <h1>Gestion des produits</h1>
                            <CreateProduct/>
                            <CreateCategory /><DeleteCategory/>
                            <CreatePromotion /><DeletePromotion/>
                            <table className="hover responsive table table-striped" >
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Nom du produit</th>
                                        <th>Descriptions</th>
                                        <th>Prix</th>
                                        <th>Images</th>
                                        <th>Categories</th>
                                        <th>Promotions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {contents}
                                </tbody>
                            </table>
                        </>}
                    notAuthorized={<>
                        Vous n'etes pas les authorisations pour entrer<br />
                        Seul l'administrateur peut y acceder<br />
                            Si c'est le cas alors proceder au login ici : <Link className="navbar-brand" to="/Login" ><strong>Login</strong></Link>
                    </>}

                />
                
            </>
        );
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


