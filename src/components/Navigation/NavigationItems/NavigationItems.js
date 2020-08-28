import React from 'react';
import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import 'bootstrap/dist/css/bootstrap.min.css';
import CustomDropdown from './CustomDropdown/CustomDropdown';

const navigationItems = (props) =>(

    <ul className={classes.NavigationItems}>
        
        <NavigationItem link="/" exact>Home</NavigationItem>
        <NavigationItem link="/bbuilder" exact>Burger Builder</NavigationItem>
        <NavigationItem link="/cart" exact>Cart</NavigationItem>
        {/* <NavigationItem link="/admin" exact>Admin</NavigationItem> */}
        <Dropdown>
            <Dropdown.Toggle className={classes.NavMenu} key='1' variant="success" id="dropdown-basic">
                Admin
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item href="/item">Items</Dropdown.Item>
                <Dropdown.Item href="/staff">Staff</Dropdown.Item>
                <Dropdown.Item href="/member">Members</Dropdown.Item>
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