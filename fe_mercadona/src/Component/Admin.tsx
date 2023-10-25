/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, ButtonGroup, Spinner } from 'react-bootstrap';
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

export default class Admin extends Component {
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
    static renderListTable(listProducts: any[],listCategories:any[]) {
        let cat: any[];
        cat = listCategories.map((c) => (cat = c.categoryName));
        console.log(cat);
        return (
            <>
                {
                    listProducts.map(product =>
                        <tr>
                            <th scope="row">{product.idProduct}</th>
                            <td>{product.productName}</td>
                            <td>{product.descriptionProduct}</td>
                            <td>{product.price}</td>
                            <td>{product.image}</td>
                            <td>{cat[product.catId]}</td>
                            <td>{product.promotion}</td>
                            <td  ><ButtonGroup className="buttonUpdate" >
                                <Button className="btn btn-light ">Editer</Button>
                                <Button className="btn btn-light ">Ajouter une promotion</Button>
                                <Button className="btn btn-danger light">Suprimer</Button>
                            </ButtonGroup></td>
                        </tr>)
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
                            <CreateProduct />
                            <CreateCategory /><DeleteCategory/>
                            <CreatePromotion /><DeletePromotion/>
                            <table id="tableStyle" className="hover responsive table table-striped" >
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


