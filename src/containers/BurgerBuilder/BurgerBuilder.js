import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal.js';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    }

    updatePurchaseState (ingredients) {
        //Get the current state of the ingredients after add or remove
        // const ingredients = {...this.state.ingredients};

        const sum = Object.keys(ingredients)
        .map(igKey =>{
            return ingredients[igKey];
        })
        .reduce((sum, el)=>{
            return sum + el;
        },0);
        this.setState({ purchasable: sum > 0 });
    }

    addIngredientHandler= (type)=>{
        const oldCount = this.state.ingredients[type]; //get a copy of the current count
        const updatedCount = oldCount + 1; //create an updatedCount by adding to the copied count
        const updatedIngredients = {...this.state.ingredients}; //get a copy of the state of the ingredients
        //from the copied ingredients[type], place the copied updated count
        updatedIngredients[type] = updatedCount; 


        //update the price
        const priceAddition = INGREDIENT_PRICES[type]; //get a copy the price of the type
        const oldPrice = this.state.totalPrice; //get a copy the old total price
        // createa new price by adding the copied old price and the priceAddition
        const newPrice = oldPrice + priceAddition 
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
        this.updatePurchaseState(updatedIngredients);

    }

    removeIngredientHandler = (type) =>{
        
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;

        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        })
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        });

    }

    purchaseContinueHandler = () =>{
        alert('You continue!')
    }

    render () {
        
        const disableInfo= {...this.state.ingredients};

        for ( let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0;
        }

        
        return (
            <>
                <Modal show={this.state.purchasing} 
                    modalClosed={this.purchaseCancelHandler}> 
                    <OrderSummary 
                        price={this.state.totalPrice}
                        purchaseCancelled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler}
                        ingredients={this.state.ingredients}/> 
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler} 
                    ingredientRemove={this.removeIngredientHandler}
                    disabled={disableInfo}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                    price={this.state.totalPrice}/>
           </>
        ); 
    }
}

export default BurgerBuilder;
