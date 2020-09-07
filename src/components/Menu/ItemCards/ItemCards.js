import ItemCard from '../ItemCard/ItemCard'
import classes from './ItemCards.module.css';
import React, { Component } from 'react'
import CartToast from '../CartToast/CartToast';
import Button from 'react-bootstrap/Button';


export default class ItemCards extends Component {
    constructor(props){
        super(props);

        this.state = {
            currentItem:'',
            cart:null,
            cartQty:null,
            // loading: true
            value: '',
            categories: []
            // ,
            // showCartToast: false
        }
        
        this.qtyChangeHandler = this.qtyChangeHandler.bind(this);
    }

    qtyChangeHandler(event) {
        this.setState({value: event.target.value})
    }

    // onShowCartToast=()=>{
    //     this.setState({showCartToast: !this.state.showCartToast })
    // }
    
    componentDidMount(){
        // to remove a localstorage item
        // localStorage.removeItem('bqcartItems');
        // localStorage.removeItem('bqcartItemQty');
        const items = localStorage.getItem('bqcartItems');
        const itemQty = localStorage.getItem('bqcartItemQty');
        if(items != null && itemQty != null){
            const itemsArr = items.split(',');
            const itemQtyArr = itemQty.split(',');
            this.setState({
                cart: itemsArr,
                cartQty: itemQtyArr
                })
        }
    }

    addToCartHandler(itemId){
        var cart=[]
        var cartQty=[]
        let isFound = (element) => element === itemId;
        itemId = itemId.toString();

        if((this.state.cart === null) && (this.state.cartQty === null)){
            cart.push(itemId)
            cartQty.push(1)
            localStorage.setItem('bqcartItems', cart);
            localStorage.setItem('bqcartItemQty', cartQty);
            // this.onShowCartToast();
            this.setState({
                cart: cart,
                cartQty: cartQty
                })
        }else{

             // copy the current state of cart
            cart = [...this.state.cart]
            cartQty = [...this.state.cartQty]
            // push the new item in the cart
            var itemFound = cart.findIndex(isFound)

            // console.log('cart index:',itemFound)
            //if itemfound is true, increase the number 
            if(itemFound !== -1){  
                let newQty = parseInt(cartQty[itemFound]) + 1;
                cartQty[itemFound] = newQty;
                localStorage.setItem('bqcartItemQty', cartQty);
                // this.onShowCartToast();
                this.setState({ ...this.state.cartQty, cartQty: cartQty})
            }

            if(itemFound === -1){  
                cart.push(itemId)
                cartQty.push(1)
                localStorage.setItem('bqcartItems', cart);
                localStorage.setItem('bqcartItemQty', cartQty);
                // this.onShowCartToast();
                this.setState({ ...this.state, cart: cart, cartQty: cartQty})
            }

        }
    }


    render() {
        const items = this.props.items
        const loading = this.props.loading
        console.log(this.state.cartQty);

        // get item category, place it in state.categories
        // for each category in state.categories, create a div
        let categories = [];
        if(items){
            categories = items.map(item => item.category)
                .filter((value, index, self) => self.indexOf(value) === index)
                // console.log(categories)
        }
       
        // @todo: Fix spinner later
        // let items = <Spinner />
        let itemCards;
        let itemCards2;
        let finOutput =[];

        if(finOutput){
            var i;
            var output=[];
            for (i=0; i < categories.length; i++){
                // categorizedDiv =(<h1><br/><br/>{categories[i]}</h1>)
                itemCards= items.filter(item => item.category === categories[i])
                // initialize the output['key']
                output[categories[i]] = []; 
                // from that output.key push the filtered items 
                output[categories[i]].push(itemCards);       
            }
            // console.log(output)
            // let y;
          
            for (var key in output) {
                // console.log(output[key][0])
                // for(y=0; y < output[key].length; y++){
                    itemCards2 = output[key][0].map(item=>(
                    <ItemCard key ={item.id}
                        id={item.id}
                        name={item.name}
                        category={item.category}
                        price={item.price}
                        pcs={item.pcs}
                        tags={item.tags}
                        availability={item.availability} 
                        image_url ={item.image_url}
                        addToCartHandler={()=>this.addToCartHandler(item.id)}
                        qtyChangeHandler={(event)=>this.qtyChangeHandler(event)}
                        // showCartToast={this.state.showCartToast}
                        // onShowCartToast={this.onShowCartToast}
                    />
                ))

                let formatOutput = <div key={key+3} className={classes.CategorizedCards}>
                                        <h1 key={key+1}>
                                            {key}
                                        </h1>
                                        <ul key={key+2}>
                                            {itemCards2}
                                        </ul>
                                    </div>;
                finOutput.push(formatOutput)
                // }
        }
        // console.log(finOutput);
        }

        return (

            <div className={classes.ItemCards}>
                {finOutput}
                {/* <CartToast 
                    showCartToast={this.state.showCartToast}
                    onShowCartToast={this.onShowCartToast}
                    /> */}
            </div>
          
          );
    }
}
