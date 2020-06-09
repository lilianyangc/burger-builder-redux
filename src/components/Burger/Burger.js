import React from 'react'
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

// Defines the width and height of the burger
const burger = (props) => {

    //Mapping the number of ingreients for ea bugerIngredient
    //1. turned to an array by object keys
    //2. for every key create an array with a length based on the number of ingredients
    //3. and then map(or return) every array with Burger ingredient with the key and type
    let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => { return [...Array( props.ingredients[igKey] )].map( ( _,i) => {
            return <BurgerIngredient key={igKey + i} type={igKey} />
            //adds the elements into an array, either it's emtpy or contains the ingredients
        });
    }).reduce((arr, el)=>{
        return arr.concat(el)
    }, []);

    
    if(transformedIngredients.length === 0){
        transformedIngredients = <p>Please start adding Ingredients</p>
    }

    // console.log(transformedIngredients);
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );

};

export default burger;