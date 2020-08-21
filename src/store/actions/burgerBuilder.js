import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';


export const addIngredient = (name) =>{
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
}

export const removeIngredient = (name) =>{
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
}

export const setIngredients = (ingredients)=>{
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const fetchIngredientsFailed = () =>{
    return{
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

// once this async code is done it will call setIngredients
export const initIngredients = () =>{
    return dispatch =>{

        // check if there thigns that are dependent 
        //on the ingredients an handle the data while it is loading
        // axios.get('https://react-burger-8cf71.firebaseio.com/ingredients.json')
        axios.get('http://localhost:3000/ingredients/')
        .then(response =>{
            // this.setState({ingredients: response.data})
            dispatch(setIngredients(response.data))
        }).catch(error => {
            // this.setState({error: true})
            dispatch(fetchIngredientsFailed());
        });


    }
}