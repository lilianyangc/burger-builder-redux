import React,{Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route, Redirect} from 'react-router-dom'
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
class Checkout extends Component {
    // state = { 
    //     ingredients: null, 
    //     totalPrice: 0
    // }
    
    // componentWillMount(){
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price = 0;
    //     //to loop through the different query params
    //     for(let param of query.entries()){
    //         //['salad', '1']
    //         //place in an object
    //         // if price set it to price, else add it in ingredients object
    //         if(param[0]=== 'price'){
    //             price= param[1]
    //         }else{
    //             ingredients[param[0]]= + param[1];
    //         }
    //     }
    //     this.setState({ingredients: ingredients, totalPrice: price})
    // }

    checkoutCancelledHandler = () => {
        console.log('hello')
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        console.log('hello')
        this.props.history.replace('/checkout/contact-data');
    }

    render() { 
        let summary = <Redirect to="/" />
        if (this.props.ings){
            const purchasedRedirect = this.props.purchased? <Redirect to="/" />: null ;
            summary = (
                <>
                    {purchasedRedirect}
                    <CheckoutSummary ingredients={this.props.ings}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}/>
                    <Route path={this.props.match.path +'/contact-data'} 
                        component={ContactData}/>
                </>
            
            )
        }
        return summary;
    }
}
 
const mapStateToProps = state =>{
    return{
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);