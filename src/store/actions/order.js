import * as actionTypes from './actionTypes';
import axios from '../../axios-orders'

// sync
export const purchaseBurgerSuccess = (id, orderData) =>{
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

//sync
export const purchaseBurgerFail = (error) =>{
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
       error: error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}


//async
export const purchaseBurger = (orderData) =>{
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json', orderData)
        .then(response=>{ 
            // this.setState({ loading: false });
            // this.props.history.push('/');
            dispatch(purchaseBurgerSuccess(response.data.name,orderData))
        })
        .catch(error=> {
            // this.setState({ loading:false })
            // console.log(error)
            dispatch(purchaseBurgerFail(error))
        }); 
    }
}

export const purchaseInit = () =>{
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }

}

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

//async code
export const fetchOrders = () => {
   return dispatch => {
    axios.get('/orders.json').then(res=>{
        dispatch(fetchOrdersStart())
        const fetchedOrders =[];
        for(let key in res.data){
            fetchedOrders.push({...res.data[key], id: key})
        }
        // console.log(res.data);
        // this.setState({loading:false, orders: fetchedOrders});
        dispatch(fetchOrdersSuccess(fetchedOrders))
    }).catch(err =>{
        // this.setState({loading:false})
        dispatch(fetchOrdersFail(err))
    });
   }
}