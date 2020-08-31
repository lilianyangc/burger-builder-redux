
//1. Different forms of handling methods

//a. handleSubmit(event)
// onClick={this.handleSubmit}

//b. handleModalImage(imageUrl,currentImageName)
// onClick={()=>this.handleModalImage(item.image_url,item.name)}

//c.  onRemoveItemHandler(itemId) 
// onClick={()=>this.onRemoveItemHandler(item.id)}

// d. handleModalImage()
// onClick={this.handleModalImage}

// e. handleChange(key,event)
//  this.handleChange = this.handleChange.bind(this);
// onChange={(event)=>this.handleChange('price',event)}

// f. handleChange(event)
//  this.handleChange = this.handleChange.bind(this);
// onChange={(event)=>this.handleChange(event)}


// -----------------------------------------------
// 2. FORMATS FOR HANDLING INPUT CHANGE
//  1 state object with a subObject
import { updateObject, checkValidity } from '../../../shared/utility';

constructor(props) {
    super(props);
    
    this.state = 
        {
        currentItem: { name: '', price: ''}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}

handleChange(key,event) {

    // FIRST FORMAT
    // this.setState({currentItem: event.target.value});
    // console.log(this.state.currentItem)

    // SECOND FORMAT
    // const newCurrElement = {
    //     [key] : event.target.value
    // }
    // this.setState({currentItem: newCurrElement})

    // THIRD FORMAT
    // passing the previous state and the key's of the subObject that is going to be updated
    const updatedItemForm = updateObject(this.state.currentItem,{[key]:event.target.value});
    this.setState({currentItem: updatedItemForm})

}

handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
}

// Handling an object within a subObject of an object of a state
// Object => Object => Object
constructor(props) {
    super(props);
    
    this.state={
        // the object of a state | Object
        itemForm:{
            // the subObject | Object => Object
            name: {
                // the object of a subObject | Object => Object => Object
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
            }
        }
    }
}

inputChangedHandler=(event, inputIdentifier)=>{
// first: work on the innermost layer,  Object => Object => Object
    const updatedFormElement = updateObject(this.state.itemForm[inputIdentifier], {
        value: event.target.value,
        valid: checkValidity(event.target.value, this.state.itemForm[inputIdentifier].validation),
        touched: true
    });
// second: middler layer, Object => Object
    const updatedItemForm = updateObject(this.state.itemForm, {
        [inputIdentifier]: updatedFormElement
    });
    
    let formIsValid = true;
    for (let inputIdentifier in updatedItemForm) {
        formIsValid = updatedItemForm[inputIdentifier].valid && formIsValid;
    }

//  finally: outermost layer of the object, updating the state. 
    this.setState({itemForm: updatedItemForm, formIsValid: formIsValid});
 }