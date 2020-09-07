import React, { Component } from 'react'
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import classes from './CartItems.module.css';
import Button from 'react-bootstrap/Button';
import RemoveModal from './CustomModal/CustomModal';

export default class CartItems extends Component {

    state = {
        currentItem:'',
        cart:null,
        cartQty: null,
        bqcartItems: null,
        loading: false,
        showRemoveItemModal: false
    }

componentDidMount(){
    // localStorage.setItem('bqcartItems', [19,20]);
    const items = localStorage.getItem('bqcartItems');
    const itemQty = localStorage.getItem('bqcartItemQty');
    this.sessionCartHandler(items,itemQty);
}

sessionCartHandler(items,itemQty){
   

    if(items != null && itemQty != null){

        var itemsArray = items.split(',');
        var itemQtyArr = itemQty.split(',');
        var bqcartItemsArr  = itemsArray.map(function(item){
            return parseInt(item,10);
        });
        // get items from backend
        axios.post('http://localhost:3000/items/cart', itemsArray)
        .then(response=>{ 
            // console.log('Axios response',response);
            if(response.data != null){
         
                var cartUpdated = response.data.map(item=>{
                let n = bqcartItemsArr.indexOf(item.id);
                item.qty = itemQtyArr[n];
                return item;
            })
                this.setState({ 
                    cart : cartUpdated,
                    cartQty: itemQtyArr,
                    cartCopy: response.data
                });
            }
           
            // this.props.history.push('/');
        })
        .catch(error=> {
            // this.setState({ loading:false })
            console.log(error)});
    }
}

removeItemHandler(userItem){
    let isFound = (element) => element === userItem.id;

    const items = localStorage.getItem('bqcartItems');
    const itemQty = localStorage.getItem('bqcartItemQty');
    
    const itemsArray = items.split(',').map(function(item){
        return parseInt(item,10);
    });
    const itemQtyArr = itemQty.split(',');

    console.log('userItem',userItem)
    var nItemCart = itemsArray.findIndex(isFound)
    console.log('nItemCart',nItemCart)
    console.log(itemsArray.length)

    if((itemsArray.length > 1) && (itemQtyArr.length > 1)){
        itemsArray.splice(nItemCart,1)
        itemQtyArr.splice(nItemCart,1) 

        console.log(itemsArray)
        console.log(itemQtyArr)
    
        localStorage.setItem('bqcartItems', itemsArray);
        localStorage.setItem('bqcartItemQty', itemQtyArr);
        // window.location.reload();

        // this.sessionCartHandler(itemsArray,itemQtyArr);

    }else if((itemsArray.length === 1) && (itemQtyArr.length === 1)){
        localStorage.removeItem('bqcartItems');
        localStorage.removeItem('bqcartItemQty');
        // this.sessionCartHandler(null,null);
        // window.location.reload();

    }

    var newArray = this.state.cart.filter(item => item.id !== userItem.id)
    // console.log('New Array',newArray)
    this.setState({cart: newArray});
    // this.sessionCartHandler();
}

showRemoveItemModal=()=>{
console.log('showRemoveItemModal')
    this.setState({showRemoveItemModal: !this.state.showRemoveItemModal})
}

render() {
    console.log('Cart State: ',this.state.cart)
    // console.log('remove modal: ',this.state.showRemoveItemModal)

    let items;
    if(!this.state.loading && (this.state.cart != null)){
        items = this.state.cart.map(item=>(
            <tr key={item.id}>
                <td><img src={item.image_url} className={classes.Photo} alt={item.name}/></td>
                <td>{item.name}</td>
                <td>{item.availability}</td>
                    <td>{item.qty}</td>
                <td>{item.price}</td>
                <td>{parseInt(item.price) * parseInt(item.qty)}</td>
                <td>
                    <button onClick={this.showRemoveItemModal}>
                        Remove Item
                        <RemoveModal 
                            showRemoveItemModal={this.state.showRemoveItemModal}
                            removeItemHandleClose={this.showRemoveItemModal}
                            removeItemHandler={()=>this.removeItemHandler(item)}
                            />
                    </button>
                </td>
            </tr>
        ))
    }

    // massage the data to contain number of pcs

    return (
        <div className={classes.ItemTable}>
            <h2>Your Cart</h2>
            <Table striped bordered hover>
            <thead>
                <tr>
                <th>Items</th>
                <th></th>
                <th>Availability</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
                <th></th>
                </tr>
            </thead>
            <tbody>
                {items}
                {/* <td>Total</td><td></td><td></td><td></td><td></td><td></td> */}
            </tbody>
            </Table>
            <Button> CHECKOUT </Button>        
        </div>
    )
}
}
