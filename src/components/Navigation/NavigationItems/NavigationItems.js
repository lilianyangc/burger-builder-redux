import React from 'react';
import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';

const navigationItems = (props) =>(

    <ul className={classes.NavigationItems}>
        
        <NavigationItem link="/" exact>Home</NavigationItem>
        <NavigationItem link="/bbuilder" exact>Burger Builder</NavigationItem>
        <NavigationItem link="/cart" exact>Cart</NavigationItem>
        
        <NavigationItem link="/admin" exact>Admin</NavigationItem>
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                Dropdown Button
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                
            </Dropdown.Menu>
        </Dropdown>
        { props.isAuthenticated? <NavigationItem link="/orders">Orders</NavigationItem> : null}
        { !props.isAuthenticated?
            <NavigationItem link="/auth">Authenticate</NavigationItem> :
            <NavigationItem link="/logout">Logout</NavigationItem>
        }
    </ul>

);

export default navigationItems;