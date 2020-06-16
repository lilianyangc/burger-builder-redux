import React,{Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
    state = { 
        ingredients: {
            salad: 1,
            meat: 1,
            cheese: 1,
            bacon: 1
        } 
    }
    
    componentDidMount(){
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        //to loop through the different query params
        for(let param of query.entries()){
            //['salad', '1']
            //place in an object
            ingredients[param[0]]= + param[1];
        }
        this.setState({ingredients: ingredients})
    }
    
    checkoutCancelledHandler = () => {
        console.log('hello')
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        console.log('hello')
        this.props.history.replace('/checkout/contact-data');
    }

    render() { 
        return ( 
            <div>
                <CheckoutSummary ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}/>
            </div>
        );
    }
}
 


export default Checkout;