import * as actionTypes from './action';

//  Add the states that needs to be global
const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 4
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const reducer = (state= initialState,action)=>{
    // no need for a break statement since we willretun in each statement 
    switch (action.type){
        case actionTypes.ADD_INGREDIENT:
            // copy the old state and add a new state
            // if it is deeper of 1 level, 
            // copy again that state and then add the new state

            return {
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1           
                },
                totalPrice: state.totalPrice  + INGREDIENT_PRICES[action.ingredientName]
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice  - INGREDIENT_PRICES[action.ingredientName]
            };
        default:
            return state;
    }

};

export default reducer;