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
export const purchaseBurger = (orderData, token) =>{
    return dispatch => {
        dispatch(purchaseBurgerStart());
        console.log(orderData);
        axios.post('http://localhost:3000/orders/create-order',
        orderData,
            {headers:{
                'authorization': token
            }}
        )
        .then(response=>{ 
            console.log(response);
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


//async
// export const purchaseBurger = (orderData, token) =>{
//     return dispatch => {
//         dispatch(purchaseBurgerStart());
//         axios.post('/orders.json?auth=' + token, orderData)
//         .then(response=>{ 
//             // this.setState({ loading: false });
//             // this.props.history.push('/');
//             dispatch(purchaseBurgerSuccess(response.data.name,orderData))
//         })
//         .catch(error=> {
//             // this.setState({ loading:false })
//             // console.log(error)
//             dispatch(purchaseBurgerFail(error))
//         }); 
//     }
// }


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
export const fetchOrders = (token, userId) => {
   return dispatch => {
    const url = 'http://localhost:3000/user/'+userId+'/orders';
    axios.get(url, 
        {headers:{
        'authorization': token
         }})
        .then(res=>{
      
        dispatch(fetchOrdersStart())
        console.log(res.data);
        const fetchedOrders =[];
        for(let key in res.data){
            fetchedOrders.push({...res.data[key], id: key})
        }
        dispatch(fetchOrdersSuccess(fetchedOrders))
    }).catch(err =>{
        // this.setState({loading:false})
        dispatch(fetchOrdersFail(err))
    });
   }
}

//old fetchOrders async code
// export const fetchOrders = (token, userId) => {
//     return dispatch => {
//      const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo"' + userId+'"'
//      axios.get('/orders.json' + queryParams)
//          .then(res=>{
//          dispatch(fetchOrdersStart())
//          const fetchedOrders =[];
//          for(let key in res.data){
//              fetchedOrders.push({...res.data[key], id: key})
//          }
//          // console.log(res.data);
//          // this.setState({loading:false, orders: fetchedOrders});
//          dispatch(fetchOrdersSuccess(fetchedOrders))
//      }).catch(err =>{
//          // this.setState({loading:false})
//          dispatch(fetchOrdersFail(err))
//      });
//     }
//  }
 
