import React from 'react'
import classes from './ItemCard.module.css'
import { useToasts } from 'react-toast-notifications'
import 'bootstrap/dist/css/bootstrap.min.css';


export default function ItemCard(props) {
    const { addToast } = useToasts()

    return (      
        <li className={classes.ItemCard}>
            <div className={classes.Image}>
                <img src={props.image_url} className={classes.Photo} alt="MyBurger"/>
            </div>
            <br />
            <div className={classes.CardInfo}>
                Item Name: {props.name}<br />
                Category: {props.category}<br />
                Item Id: {props.id}<br />
                Price: {props.price}<br />
                Pcs: {props.pcs}<br />
                Tags: {props.tags}<br />
                Availability: {props.availability === 'available'? 'Yes': 'No' }<br />
                {/* Pcs: &nbsp; */}
                {/* <button onClick={props.increasePcs}>+</button> */}
                    {/* <input type='number' onChange={props.qtyChangeHandler}size="1"></input> */}
                {/* <button onClick={props.decreasePcs}>-</button><br /> */}
            <button onClick={()=>{
                props.addToCartHandler();
                addToast([
                <img key={props.id} src={props.image_url} className={classes.PhotoToast} alt="MyBurger"/>,
                ' Added '+ props.name+' to your cart!'
                    ],{
                        appearance: 'success',
                        autoDismiss: true,
                    })}}>Add to cart</button>
            </div>
        </li>
        
        
    )
}
