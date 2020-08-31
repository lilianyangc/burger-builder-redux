import React from 'react'
import classes from './ItemCard.module.css'



export default function ItemCard(props) {

    return (
        
        <li className={classes.ItemCard}>
            <div className={classes.Image}>
                <img src={props.image_url} className={classes.Photo} alt="MyBurger"/>
            </div>
            <br />
            <div className={classes.CardInfo}>
                Item Name: {props.name}<br />
                Item Id: {props.id}<br />
                Price: {props.price}<br />
                Pcs: {props.pcs}<br />
                Tags: {props.tags}<br />
                Availability: {props.availability === 'available'? 'Yes': 'No' }<br />
                <button>Add to cart</button>
            </div>       
        </li>
        
    )
}
