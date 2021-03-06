import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal.js';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
// import * as actionTypes from '../../store/actions/actionTypes';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';


// const INGREDIENT_PRICES = {
//     salad: 0.5,
//     cheese: 0.4,
//     meat: 1.3,
//     bacon: 0.7
// }

export class BurgerBuilder extends Component {
    state = {
        // totalPrice: 4,
        purchasable: false,
        purchasing: false,
        // loading: false,
        // error: false
    }
    
    componentDidMount(){
        this.props.onInitIngredients();
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
        return sum > 0;
    }

    // addIngredientHandler= (type)=>{
    //     const oldCount = this.state.ingredients[type]; //get a copy of the current count
    //     const updatedCount = oldCount + 1; //create an updatedCount by adding to the copied count
    //     const updatedIngredients = {...this.state.ingredients}; //get a copy of the state of the ingredients
    //     //from the copied ingredients[type], place the copied updated count
    //     updatedIngredients[type] = updatedCount; 


    //     //update the price
    //     const priceAddition = INGREDIENT_PRICES[type]; //get a copy the price of the type
    //     const oldPrice = this.state.totalPrice; //get a copy the old total price
    //     // createa new price by adding the copied old price and the priceAddition
    //     const newPrice = oldPrice + priceAddition 
    //     this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
    //     this.updatePurchaseState(updatedIngredients);

    // }

    // removeIngredientHandler = (type) =>{
        
    //     const oldCount = this.state.ingredients[type];
    //     if (oldCount <= 0){
    //         return;
    //     }
    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients = {...this.state.ingredients};
    //     updatedIngredients[type] = updatedCount;

    //     const priceDeduction = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceDeduction;
    //     this.setState({
    //         totalPrice: newPrice,
    //         ingredients: updatedIngredients
    //     })
    //     this.updatePurchaseState(updatedIngredients);
    // }

    purchaseHandler = () => {
        if(this.props.isAuthenticated){
            this.setState({purchasing: true});
        }else{
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push('/auth');
        }  
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        });

    }

    purchaseContinueHandler = () =>{
        this.props.onInitPurchase();
        this.props.history.push('/checkout');

        // // alert('You continue!')
        // //create an array
        // const queryParams= [];
        // for (let i in this.props.ings){
        //     queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.props.ings[i]))
        // }
        // queryParams.push('price='+this.state.totalPrice);
        // //join the array to a string
        // const queryString = queryParams.join('&');
        // //pass the querystring to the address
        // this.props.history.push({
        //     pathname: '/checkout',
        //      search: '?'+ queryString});
        // // this.props.history.push('/checkout');

    }

    render () {
        
        const disableInfo= {...this.props.ings};

        for ( let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0;
        }
        let orderSummary= null;
    
        let burger = this.props.error ? <p>Ingredients can't be loaded</p>:<Spinner />;
        if(this.props.ings){
            burger = <>
            <Burger ingredients={this.props.ings}/>
            <BuildControls 
                ingredientAdded={this.props.onIngredientAdded} 
                ingredientRemove={this.props.onIngredientRemove}
                disabled={disableInfo}
                purchasable={this.updatePurchaseState(this.props.ings)}
                ordered={this.purchaseHandler}
                price={this.props.price}
                isAuth={this.props.isAuthenticated}/>
            </>
            orderSummary = <OrderSummary 
            price={this.props.price}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            ingredients={this.props.ings}/> 
        }
        // if(this.state.loading){
        //     orderSummary = <Spinner />
        // }

        return (
            <>
                <Modal show={this.state.purchasing} 
                    modalClosed={this.purchaseCancelHandler}> 
                    {orderSummary}
                </Modal>
                {burger}
           </>
        ); 
    }
}

const mapStateToProps= state =>{
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps= dispatch =>{
    return {
        onIngredientAdded: (ingName)=> dispatch(actions.addIngredient(ingName)),
        onIngredientRemove: (ingName)=> dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));
