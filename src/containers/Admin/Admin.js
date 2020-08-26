import React, { Component } from 'react'
import classes from './Admin.module.css';
import Input from '../../components/UI/Input/Input'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Admin extends Component {

    state = { 
        itemForm:{
             name: {
                 elementType:'input',
                 elementConfig:{
                     type:'text',
                     placeholder:'Item Name'
                 }, 
                 value:'',
                 validation: {
                     required:true
                 },
                 valid: false,
                 touched: false
             },
             price:{
                 elementType:'input',
                 elementConfig:{
                     type:'text',
                     placeholder:'Item Price'
                 }, 
                 value:'',
                 validation: {
                     required:true
                 },
                 valid: false,
                 touched: false
             },
             pcs: {
                 elementType:'input',
                 elementConfig:{
                     type:'text',
                     placeholder:'Number of pieces'
                 }, 
                 value:'',
                 validation: {
                     required:true
                 },
                 valid: false,
                 touched: false
             },
             tags: {
                 elementType:'input',
                 elementConfig:{
                     type:'text',
                     placeholder:'Tags'
                 }, 
                 value:'',
                 validation: {
                     required:true
                 },
                 valid: false,
                 touched: false
             },
             availability:{
                 elementType:'select',
                 elementConfig:{
                     options:[
                         {value:'available', displayValue:'Available'},
                         {value:'unavailable', displayValue:'Unavailable'}]
                 }, 
                 value:'available',
                 valid: true,
                 validation: {}
             },
             image_url: {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Upload image here'
                }, 
                value:'Upload image here',
                validation: {
                    required:true
                },
                valid: false,
                touched: false
            }

        },
         formIsValid: false
      }




// form for new item
    render() {
        const formElementsArray= [];

        for (let key in this.state.itemForm){
            formElementsArray.push({
                id:key, //we create a key for the mapping key
                config: this.state.itemForm[key] //adding the config of each element
            })
        }

        console.log(formElementsArray)

        let form = (
            <form>
                {/* <Input elementType='input'/> */}
                {formElementsArray.map(formElement=>(
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
        
                    />
                ))}
            </form>
        );

        return (
            <>
            <div className={classes.Admin}>
                <h1>Admin</h1>
                <h2>~ Add a new item ~</h2>
                {form}
                <Button variant="primary">Add to Menu</Button>
            </div>
            </>
        )
    }
}
