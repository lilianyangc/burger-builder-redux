import React, {Component} from 'react';
import ItemList from '../../components/ItemList/ItemList';

class Home extends Component {
    state = {  }
    render() { 
        return ( 
        <>
        {/* Create a ItemCard component */}
        {/* Create ItemCards component */}
            <p>Home</p>
            <ItemList></ItemList>
        </>
         );
    }
}
 


export default Home;