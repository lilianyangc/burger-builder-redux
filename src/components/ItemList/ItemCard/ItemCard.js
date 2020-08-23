import React from 'react'
import classes from './ItemCard.module.css'
import Button from '../../../components/UI/Button/Button'
export default function ItemCard() {
    return (
    
        <li className={classes.ItemCard}>
            <div className={classes.Image}>
            Image
            </div>
            Item Name: <br />
            Item Id: <br />
            Availability:<br />
            <button>Add to cart</button>
        </li>
        
    )
}
