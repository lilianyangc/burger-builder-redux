import React, {Component} from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout'; 
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';


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
        <BurgerBuilder />
      </Layout>
     );
  }
}
 
export default App;