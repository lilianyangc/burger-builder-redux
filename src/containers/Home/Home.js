import React, {Component} from 'react';
import ItemList from '../../components/ItemList/ItemList';
import Admin from '../Admin/Admin'

class Home extends Component {
    state = {  }
    render() { 
        return ( 
        <>
            <p>Home</p>
            <ItemList></ItemList>
        </>
         );
    }
}
 


export default Home;