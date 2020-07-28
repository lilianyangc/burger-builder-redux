import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../../store/actions/index';
import { updateObject, checkValidity } from '../../../shared/utility';

class ContactData extends Component {
    state = { 
       orderForm:{
            name: {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Name'
                }, 
                value:'',
                validation: {
                    required:true
                },
                valid: false,
                touched: false
            },
            street:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Street'
                }, 
                value:'',
                validation: {
                    required:true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'ZIP CODE'
                }, 
                value:'',
                validation: {
                    required:true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Country'
                }, 
                value:'',
                validation: {
                    required:true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Your E-mail'
                }, 
                value:'',
                validation: {
                    required:true
                },
                valid: false,
                touched: false
            },
            deliveryMethod:{
                elementType:'select',
                elementConfig:{
                    options:[
                        {value:'fastest', displayValue:'Fastest'},
                        {value:'cheapest', displayValue:'Cheap'}]
                }, 
                value:'fastest',
                valid: true,
                validation: {}
            }
       },
        formIsValid: false
     }

     orderHandler = (event) =>{
        event.preventDefault();
        // console.log(this.props.ingredients)
        // this.setState({loading:true});
        // Create an updated object container
        const formData = {}
        // formElementIdentifier = name, street
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier];
        }

        const order ={
            ingredients: this.props.ings,
            // on the real backend, you calculate the ingredients there
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId
        }
        this.props.onOrderBurger(order, this.props.token);
        // for firebase only, nodename+.json
        // it will create orders node in the database
        // axios.post('/orders.json', order)
        //     .then(response=>{ 
        //         this.setState({ loading: false });
        //         this.props.history.push('/');})
        //     .catch(error=> {
        //         this.setState({ loading:false })
        //         console.log(error)}); 
     }

     inputChangedHandler=(event, inputIdentifier)=>{
        // console.log(event.target.value)
        //Now we mutate the state
        // old updating code--------
        // const updatedOrderForm = {
        //     ...this.state.orderForm
        // };
        //Now since it cannot deeply copy, we still need to clone it deeply
        // const updatedFormElement = {
        //     ...updatedOrderForm[inputIdentifier]
        // }
        // updatedFormElement.value= event.target.value;
        // updatedFormElement.touched= true;
        // // pass the value and validation object
        // updatedFormElement.valid = this.checkValidity(updatedFormElement.value,updatedFormElement.validation);
        // updatedOrderForm[inputIdentifier] = updatedFormElement;
        // ------------
        const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation),
            touched: true
        });
        const updatedOrderForm = updateObject(this.state.orderForm, {
            [inputIdentifier]: updatedFormElement
        });
        
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
     }

    render() { 

        //Create an array of objects to be able to use the map
        //Mapping makes it easier to extract individual objects from an array of objects
        //We will bring it back to an object if we want to send it back to a server
        const formElementsArray= [];
        //we create an array of js objects
        for (let key in this.state.orderForm){
            // pushing an object to formElementsArray
            formElementsArray.push({
                id:key,
                config:this.state.orderForm[key]
            });
        }

        let form =(
            <form onSubmit={this.orderHandler}>
                {/* now we loopthrough formELementsArray to create the form */}
                {formElementsArray.map(formElement=>(
                    // we then store the right side of the state setup
                    <Input key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        touched={formElement.config.touched}
                        shouldValidate={formElement.config.validation}
                        changed={(event)=>this.inputChangedHandler(event,formElement.id)}/>
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );
        if(this.props.loading){
            form =<Spinner />;
        }
        return ( 
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
               {form}
            </div>
         );
    }
}

const mapStateToProps= state =>{
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger : (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));