import React, { Component } from 'react'
import classes from './Item.module.css';
import Input from '../../components/UI/Input/Input'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { updateObject, checkValidity } from '../../shared/utility';
import Form from 'react-bootstrap/Form';
import axios from 'axios';


export default class Staff extends Component {

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
             }
            //  ,
            //  image_url: {
            //     elementType:'input',
            //     elementConfig:{
            //         type:'text',
            //         placeholder:'Upload image here'
            //     }, 
            //     value:'Upload image here',
            //     validation: {
            //         required: false
            //     },
            //     valid: false,
            //     touched: false
            // }
        },
        selectedFile: null,
        formIsValid: false
      }

      onFileChange = event =>{
        this.setState({ selectedFile: event.target.files[0] }); 
      }


    // send order
      itemHandler = (event) =>{
        event.preventDefault();
        // Create an updated object container
        const formData = {}
        // formElementIdentifier = name, street
        for(let formElementIdentifier in this.state.itemForm){
            formData[formElementIdentifier] = this.state.itemForm[formElementIdentifier];
        }

        const item ={
            itemData: formData
        }
        item.itemData['image_url'] = this.state.selectedFile

        console.log(item)

        //  axios.post('http://localhost:3000/items/new-item', item)
        //     .then(response=>{ 
        //         this.setState({ loading: false });
        //         this.props.history.push('/');})
        //     .catch(error=> {
        //         this.setState({ loading:false })
        //         console.log(error)});

        // this.props.onOrderBurger(order, this.props.token);
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




    // handling input change and input validations 
      inputChangedHandler=(event, inputIdentifier)=>{

        const updatedFormElement = updateObject(this.state.itemForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.itemForm[inputIdentifier].validation),
            touched: true
        });
        
        const updatedItemForm = updateObject(this.state.itemForm, {
            [inputIdentifier]: updatedFormElement
        });
        
        let formIsValid = true;
        for (let inputIdentifier in updatedItemForm) {
            formIsValid = updatedItemForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({itemForm: updatedItemForm, formIsValid: formIsValid});
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

        let form = (
            <form>
                {/* <Input elementType='input'/> */}
                {formElementsArray.map(formElement=>(
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        touched={formElement.config.touched}
                        shouldValidate={formElement.config.validation}
                        changed={(event)=>this.inputChangedHandler(event,formElement.id)}
                    />
                    
                ))}
                {/* <label>Select image:</label> 
                <input type="file" name="img" accept="image/*" /><br /> */}
                <Form.Group>
                    <Form.File onChange={this.onFileChange} id="exampleFormControlFile1" label="Example file input" accept="image/*"/>
                </Form.Group>

                <Button onClick={this.itemHandler} btntype="Success" 
                    disabled={!this.state.formIsValid}>SUBMIT</Button>
                {/* <button disabled={!this.state.formIsValid}>SUBMIT</button> */}
            </form>
        );

        return (
            <>
            <div className={classes.Item}>
                <h2>~ Add a new item ~</h2>
                {form}
            </div>
            </>
        )
    }
}
