import React from 'react';
import classes from './NavigationItem.module.css'
import {NavLink} from 'react-router-dom';

const navigationItem = (props) => (

    <li className={classes.NavigationItem}>
        {/* <a href="/" className={props.active? classes.active : null}>
            {props.children}</a> */}
        <NavLink href="/" 
            to={props.link}
            exact={props.exact}
            activeClassName={classes.active}> 
            {props.children}</NavLink>
    </li>
);

export default navigationItem;