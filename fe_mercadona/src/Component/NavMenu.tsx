import {
    Navbar,
    NavbarBrand,
    Nav} from 'reactstrap';
import './NavMenu.css';
import { NavLink } from "react-router-dom";
import Authorized from '../Auth/Authorized';
import Register from '../Auth/Register';

export default function NavMenu() {
    

    return (
        <div>

            <Navbar className="ng-white border-bottom box-shadow mb-3">
                <NavbarBrand id="fontTitle" ><strong>Mercadona</strong></NavbarBrand>               

                <Nav id="sidebar">                    
                        <NavLink  className="navbar-brand" to="/"  >Catalogue</NavLink>
                        <NavLink className="navbar-brand"  to="/Promotion" >Promotions</NavLink>                                          
                </Nav>

                <Nav id="sidebar">
                    <Authorized
                        authorized={
                            <>
                                <NavLink className="navbar-brand" to="/Admin" >Admin</NavLink>

                            </>}
                        notAuthorized={<>Vous n'avez pas les acces, il faut vous logger</>}
                        role="admin"
                    />
                            </Nav>

                
            </Navbar>
        </div>
    );
}
