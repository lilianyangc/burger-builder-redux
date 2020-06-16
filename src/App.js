import React, {Component} from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout'; 
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';

import { Route, Switch } from 'react-router-dom';


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


  render() { 
    return ( 
      <Layout>
        {/* { this.state.show ? <BurgerBuilder />:null } */}
        {/* <BurgerBuilder />
        <Checkout /> */}
        <Switch>
          <Route path="/checkout" exact component={Checkout}/>
          <Route path="/" exact component={BurgerBuilder}/>
        </Switch>
      </Layout>
     );
  }
}
 
export default App;