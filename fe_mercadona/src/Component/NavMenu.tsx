/*import Navbar from 'react-bootstrap/Navbar';
import { Collapse, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';


export default function NavMenu() {
    return (
        <>
            <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" >
                <NavbarBrand  to="/">Project3</NavbarBrand>
                <NavbarToggler  className="mr-2" />
                <Collapse className="d-sm-inline-flex flex-sm-row-reverse"  navbar>
                    <ul className="navbar-nav flex-grow">
                        <NavItem>
                            <NavLink  className="text-dark" to="/">Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink  className="text-dark" to="/counter">Counter</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink  className="text-dark" to="/fetch-data">Fetch data</NavLink>
                        </NavItem>
                    </ul>
                </Collapse>
            </Navbar>
        </>
    );
}*/


import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem
} from 'reactstrap';
import './NavMenu.css';
import { NavLink } from "react-router-dom";

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
                        <NavLink className="navbar-brand"  to="/Admin" >Admin</NavLink>
                </Nav>
            </Navbar>
        </div>
    );
}
