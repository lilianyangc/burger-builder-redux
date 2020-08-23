import React from 'react'
import ItemCard from '../ItemCard/ItemCard'
import classes from './ItemCards.module.css';

export default function ItemCards() {
    return (
        <ul className={classes.ItemCards}>
            <p>Item Cards</p>
            <ItemCard />
            <ItemCard />
            <ItemCard />
        </ul>
    )
}
