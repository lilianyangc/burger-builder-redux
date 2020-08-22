import React, {Component} from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout'; 
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Home from './containers/Home/Home';

// import Checkout from './containers/Checkout/Checkout';

import { Route, Switch, Redirect } from 'react-router-dom';
// import Orders from './containers/Orders/Orders';
// import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

import {connect} from 'react-redux'
import * as actions from './store/actions/index'
import asyncComponent from './hoc/asyncComponent/asyncComponent'
import Cart from './containers/Cart/Cart';

const asyncCheckout = asyncComponent(()=>{
  return import('./containers/Checkout/Checkout');
})

const asyncOrders = asyncComponent(()=>{
  return import('./containers/Orders/Orders');
})

const asyncAuth = asyncComponent(()=>{
  return import('./containers/Auth/Auth');
})

class App extends Component {
  //testing to see if unmount for the interceptors are working
  // state = { 
  //   show: true
  //  }

  //  componentDidMount(){
  //   setTimeout(()=>{
  //     this.setState({show:false});
  //   }, 5000);

  //  }
componentDidMount(){
  this.props.onTryAutoSignup()
}

  render() { 
    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth}/>
        <Route path="/bbuilder" exact component={BurgerBuilder}/>
        <Route path="/cart" exact component={Cart}/>
        <Route path="/" exact component={Home}/>
        <Redirect to="/"/>
      </Switch>
    )
    if(this.props.isAuthenticated){
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout}/>
          <Route path="/orders" component={asyncOrders}/>
          <Route path="/auth" component={asyncAuth}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/" exact component={BurgerBuilder}/>
          <Redirect to="/"/>
        </Switch>
      );
    }
    return ( 
      <Layout>
        {/* { this.state.show ? <BurgerBuilder />:null } */}
        {/* <BurgerBuilder />
        <Checkout /> */}
        {routes}
      </Layout>
     );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch =>{
  return{
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(App);