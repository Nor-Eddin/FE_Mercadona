/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, ButtonGroup, Spinner } from 'react-bootstrap';
import './NavMenu.css';
import { Component } from 'react';
import { urlProduct } from '../endpoints';
import CreateProduct from './AdminComponent/CreateProducts';
import CreateCategory from './AdminComponent/CreateCategories';
import CreatePromotion from './AdminComponent/CreatePromotion';

export default class Admin extends Component {
    static displayName = Admin.name;
    constructor(props: any) {
        super(props);
        this.state = { listProducts: [], loading: true };
    }
    componentDidMount() {
        this.listProductsData();

    }
    componentDidUpdate() {
        this.listProductsData();
    }
    static renderListTable(listProducts: any[]) {

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
                            <td>{product.category}</td>
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
            : Admin.renderListTable(this.state.listProducts);
        return (
            <>
                <h1>Gestion des produits</h1>
                <CreateProduct />
                <CreateCategory />
                <CreatePromotion/>
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
            </>
        );
    }
    async listProductsData() {
        const response = await fetch(urlProduct);
        const data = await response.json();
        this.setState({ listProducts: data, loading: false });

    }
}


