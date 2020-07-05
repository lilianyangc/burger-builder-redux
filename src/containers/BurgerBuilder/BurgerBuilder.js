import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal.js';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/action';

// const INGREDIENT_PRICES = {
//     salad: 0.5,
//     cheese: 0.4,
//     meat: 1.3,
//     bacon: 0.7
// }

class BurgerBuilder extends Component {
    state = {
        // totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }
    
    componentDidMount(){
        console.log(this.props.match)
        // check if there thigns that are dependent 
        //on the ingredients an handle the data while it is loading
        // axios.get('https://react-burger-8cf71.firebaseio.com/ingredients.json')
        // .then(response =>{
        //     this.setState({ingredients: response.data})
        // }).catch(error => {
        //     this.setState({error: true})
        // });
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
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        });

    }

    purchaseContinueHandler = () =>{
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

        this.props.history.push('/checkout');
    }

    render () {
        
        const disableInfo= {...this.props.ings};

        for ( let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0;
        }
        let orderSummary= null;
    
        let burger = this.state.error ? <p>Ingredients can't be loaded</p>:<Spinner />;
        if(this.props.ings){
            burger = <>
            <Burger ingredients={this.props.ings}/>
            <BuildControls 
                ingredientAdded={this.props.onIngredientAdded} 
                ingredientRemove={this.props.onIngredientRemove}
                disabled={disableInfo}
                purchasable={this.updatePurchaseState(this.props.ings)}
                ordered={this.purchaseHandler}
                price={this.props.price}/>
            </>
            orderSummary = <OrderSummary 
            price={this.props.price}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            ingredients={this.props.ings}/> 
        }
        if(this.state.loading){
            orderSummary = <Spinner />
        }

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
        ings: state.ingredients,
        price: state.totalPrice,
        
    }
}

const mapDispatchToProps= dispatch =>{
    return {
        onIngredientAdded: (ingName)=> dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemove: (ingName)=> dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));
