import React from 'react'
import classes from './ItemCard.module.css'
import Button from '../../../components/UI/Button/Button'
import Salad from '../../../assets/images/salad.png'


export default function ItemCard(props) {
    // let currentItem = props.itemName;
    // let url = '../../../assets/images/'+ props.itemName+'.png';
    return (
        
        <li className={classes.ItemCard}>
            <div className={classes.Image}>
                <img src={props.image_url} className={classes.Photo} alt="MyBurger"/>
            </div>
            <br />
            <div className={classes.CardInfo}>
                Item Name: {props.name}<br />
                Item Id: {props.name}<br />
                Price: {props.price}<br />
                Pcs: {props.pcs}<br />
                Tags: {props.tags}<br />
                Availability: {props.availability === 1? 'Yes': 'No' }<br />
                <button>Add to cart</button>
            </div>
           
            
        </li>
        
    )
}
