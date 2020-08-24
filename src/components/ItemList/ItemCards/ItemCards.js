import React from 'react'
import ItemCard from '../ItemCard/ItemCard'
import classes from './ItemCards.module.css';
import Salad from '../../../assets/images/salad.png'
import Fries from '../../../assets/images/fries.jpg'
import Soda from '../../../assets/images/soda.png'



export default function ItemCards() {
    return (
        <diV className={classes.ItemCards}>
            <ul>
                {/* <p>Item Cards</p> */}
                <ItemCard itemName="salad" url ={Salad}/>
                <ItemCard itemName="fries" url ={Fries}/>
                <ItemCard itemName="soda" url ={Soda}/>
            </ul>
        </diV>
        
    )
}
