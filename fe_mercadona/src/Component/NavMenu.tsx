import {
    Navbar,
    NavbarBrand,
    Nav} from 'reactstrap';
import './NavMenu.css';
import { NavLink } from "react-router-dom";
import Authorized from '../Auth/Authorized';
import { logOut } from '../Auth/handleJWT';
import { Button } from 'react-bootstrap';
import { useContext } from 'react';
import AuthenticationContext from '../Auth/AuthenticationContext';

export default function NavMenu() {

    const { update, claims } = useContext(AuthenticationContext);
    function getUserEmail() {
        return claims.filter(x => x.name === "email")[0]?.value;
    }

    return (
        <div>

            <Navbar className="ng-white border-bottom box-shadow mb-3 bg-white effetNavBar">
                <NavbarBrand id="fontTitle" ><strong>Mercadona</strong></NavbarBrand>               

                <Nav id="sidebar">                    
                        <NavLink  className="navbar-brand" to="/"  >Catalogue</NavLink>
                        <NavLink className="navbar-brand"  to="/Promotion" >Promotions</NavLink>                                          
                </Nav>

                <Nav id="sidebar">
                    <Authorized
                        authorized={
                            <>
                                <span className="nav-link">Bonjours, {getUserEmail()}</span>
                                <NavLink className="navbar-brand" to="/Admin" >Admin</NavLink>
                                <Button onClick={() => {
                                    logOut();
                                    update([]);
                                }} className="nav-link btn btn-light text-danger">Log Out</Button>

                            </>}
                        notAuthorized={
                            <>
                                <NavLink className="navbar-brand" to="/Login" >Login</NavLink>
                                
                            </>}

                    />
                            </Nav>

                
            </Navbar>
        </div>
    );
}
