import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, ButtonGroup } from 'react-bootstrap';
import './NavMenu.css';


export default function Admin() {
   
    return (
        <>
            <h1>Gestion des produits</h1>
            
            <Button className="btn btn-light ">Ajouter un nouveau produit</Button>
            <Button className="btn btn-light ">Ajouter une nouvelle categorie</Button>
            <Button className="btn btn-light ">Ajouter une nouvelle promotion</Button>

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
                    <tr>
                        <th scope="row"></th>
                        <td>1</td>
                        <td>2</td>
                        <td>3</td>
                        <td>4</td>
                        <td>5</td>
                        <td>6</td>
                        <td  ><ButtonGroup className="buttonUpdate" >
                            <Button className="btn btn-light ">Editer</Button>
                            <Button className="btn btn-light ">Ajouter une promotion</Button>
                            <Button className="btn btn-danger light">Suprimer</Button>
                        </ButtonGroup></td>
                    </tr>
                </tbody>
                </table>
            
        </>
    );
}
