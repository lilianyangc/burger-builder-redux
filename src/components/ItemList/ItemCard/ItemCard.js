import React from 'react'
import classes from './ItemCard.module.css'
import Button from '../../../components/UI/Button/Button'
import Salad from '../../../assets/images/salad.png'


export default function ItemCard(props) {
    let currentItem = props.itemName;
    let url = '../../../assets/images/'+ props.itemName+'.png';
    console.log(Salad);
    return (
        
        <li className={classes.ItemCard}>
            <div className={classes.Image}>
            <img src={props.url} className={classes.Photo} alt="MyBurger"/>
            </div>
            <br />
            <div className={classes.CardInfo}>
                Item Name: {props.itemName}<br />
                Item Id: <br />
                Availability:<br />
                <button>Add to cart</button>
            </div>
           
            
        </li>
        
    )
}
