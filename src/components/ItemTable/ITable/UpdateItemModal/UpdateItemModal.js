import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { updateObject, checkValidity } from '../../../../shared/utility';
import axios from 'axios';
import Input from '../../../UI/Input/Input'
import Form from 'react-bootstrap/Form';

export default class UpdateItemModal extends Component {
    constructor(props) {
        super(props);
        
        this.state={
            itemForm:{
                name: {
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Item Name'
                    }, 
                    value: '',
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
                    value: '',
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
                    value: '',
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
                    value: '',
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
           },
           selectedFile: this.props.currentItem.image_url,
           formIsValid: false
        }
      }


    userItemHandler(inputIdentifier){
    // console.log(inputIdentifier)
        // for second subObject
        const updatedFormElement = updateObject(this.state.itemForm[inputIdentifier], {
            value: this.props.currentItem[inputIdentifier],
            valid: checkValidity(this.props.currentItem[inputIdentifier], this.state.itemForm[inputIdentifier].validation),
            touched: true
        });

        // for first subObject
        const updatedItemForm = updateObject(this.state.itemForm, {
            [inputIdentifier]: updatedFormElement
        });
        
        let formIsValid = true;
        for (let inputIdentifier in updatedItemForm) {
            formIsValid = updatedItemForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({itemForm: updatedItemForm, formIsValid: formIsValid});
        console.log(this.state.itemForm);
    }

    onFileChange = event =>{
        this.setState({ selectedFile: event.target.files[0] }); 
      }


    // send order
      itemHandler = (event) =>{
        event.preventDefault();
        // Create an updated object container
        const formData = new FormData();
  
        formData.append('name', this.state.itemForm.name.value);
        formData.append('price', this.state.itemForm.price.value);
        formData.append('availability', this.state.itemForm.availability.value);
        formData.append('pcs', this.state.itemForm.pcs.value);
        formData.append('tags', this.state.itemForm.tags.value);
        formData.append('image', this.state.selectedFile, this.state.selectedFile.name);

        console.log('>> formData >> ', formData);

         axios.post('http://localhost:3000/items/new-item', formData)
            .then(response=>{ 
                console.log(response);
                this.setState({ loading: false });
                this.refreshPage();
                // this.props.history.push('/');
            })
            .catch(error=> {
                this.setState({ loading:false })
                console.log(error)});
     }
     
     refreshPage() {
        window.location.reload(true);
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
    

    render() {
        console.log(this.props.currentItem)
          
        const formElementsArray= [];
        for (let key in this.state.itemForm){
            formElementsArray.push({
                id:key, //we create a key for the mapping key
                config: this.state.itemForm[key] //adding the config of each element
            })
        }
        console.log()
        let form = (
            <form>
                {formElementsArray.map(formElement=>(
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        // value={formElement.config.value}
                        value={this.props.currentItem[formElement.id]}
                        invalid={!formElement.config.valid}
                        touched={formElement.config.touched}
                        shouldValidate={formElement.config.validation}
                        changed={(event)=>this.inputChangedHandler(event,formElement.id)}
                    />
                ))}
            <Form.Group>
                <Form.File onChange={this.onFileChange} id="exampleFormControlFile1" label="Upload Item Image" accept="image/*"/>
            </Form.Group>

            <Button onClick={this.itemHandler} btntype="Success" 
                disabled={!this.state.formIsValid}>SUBMIT</Button>
            </form>
        );
        // console.log(this.state.currentItem)

        // if( this.props.currentItem){
        //     for (const property in this.props.currentItem) {
        //         // console.log(`${property}: ${object[property]}`);
        //         // console.log(property)
        //         this.userItemHandler(property);
        //       }
        // }



        return (
            <div>
                <Modal 
                    aria-labelledby="contained-modal-title-vcenter"
                    centered show={this.props.showUpdateModal} 
                    onHide={()=>this.props.handleModalUpdate(this.props.currentItem)}
                    >
                    <Modal.Header closeButton>Update Item</Modal.Header>
                    <Modal.Body>
                        <p>{this.props.currentItem.name}</p>
                        {form}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button>
                            Ok
                        </Button>
                        <Button onClick={()=>{this.props.handleModalUpdate(this.props.currentItem)}}>
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
