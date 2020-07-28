import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';
//  Add the states that needs to be global
const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

// const addIngredient = (state, action) => {
//     const updatedIngredient = {[action.ingredientName]:state.ingredientName + 1}
//     const updatedIngredients = updateObject(state.ingredients, updatedIngredient)
//     const updatedSt = {
//         ingredients: updatedIngredients,
//         totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
//     }
//     return updateObject( state, updatedSt);
// };

const addIngredient = ( state, action ) => {
    const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
    const updatedIngredients = updateObject( state.ingredients, updatedIngredient );
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
    }
    return updateObject( state, updatedState );
};

const removeIngredient = (state, action)=>{
    const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 }
    const updatedIngredients = updateObject( state.ingredients, updatedIngredient );
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building: true
    }
    return updateObject( state, updatedState );
}

const reducer = (state= initialState, action)=>{
    // no need for a break statement since we willretun in each statement 
    switch (action.type){
        // case actionTypes.ADD_INGREDIENT:
        //     // copy the old state and add a new state
        //     // if it is deeper of 1 level, 
        //     // copy again that state and then add the new state
        //     // //previoud code with the function
        //     return {
        //         ...state,
        //         ingredients:{
        //             ...state.ingredients,
        //             [action.ingredientName]: state.ingredients[action.ingredientName] + 1           
        //         },
        //         totalPrice: state.totalPrice  + INGREDIENT_PRICES[action.ingredientName]
        //     };
        case actionTypes.ADD_INGREDIENT: 
            return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT:
            return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat
                },
                totalPrice: 4,
                error: false,
                building: false
            }
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            } 
        default:
            return state;
    }

};

export default reducer;